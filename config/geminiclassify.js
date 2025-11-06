// utils/geminiClassifier.js
// ------------------------------------------------------
// Enhanced version for fine-tuned classification:
// Categories: work, personal, promotions
// Urgency detection: highly contextual
// ------------------------------------------------------

const { GoogleGenAI } = require('@google/genai');
const ai = new GoogleGenAI({});
const CLASSIFICATION_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

/**
 * classifyEmail(text, subject)
 * - Returns { category: string, isUrgent: boolean }
 * - Uses Gemini if available, else uses detailed keyword-based fallback.
 */
async function classifyEmail(text = '', subject = '') {
  const combined = `${subject}\n\n${text}`.trim();

  // ---------- FALLBACK HEURISTIC ----------
  const heuristic = () => {
    const lc = combined.toLowerCase();

    //  Comprehensive keyword lists

    // 🔹 Work-related keywords (professional, projects, office, etc.)
    const workKeywords = [
      'project', 'client', 'deadline', 'meeting', 'schedule', 'office',
      'manager', 'team', 'colleague', 'task', 'report', 'presentation',
      'review', 'feedback', 'agenda', 'proposal', 'invoice', 'receipt',
      'salary', 'job', 'position', 'offer letter', 'onboarding', 'contract',
      'workshop', 'training', 'minutes of meeting', 'update', 'assignment',
      'submission', 'document', 'approval', 'company', 'performance',
      'evaluation', 'supervisor', 'lead', 'shift', 'office hours',
      'department', 'corporate', 'professional', 'employment'
    ];

    // Promotional / marketing keywords (ads, sales, offers, retail)
    const promoKeywords = [
      'offer', 'discount', 'deal', 'sale', 'clearance', 'buy now', 'save',
      'limited time', 'exclusive', 'coupon', 'voucher', 'gift', 'cashback',
      'reward', 'bonus', 'promotion', 'free', 'giveaway', 'bundle', 'membership',
      'subscribe', 'unsubscribe', 'launch', 'new arrivals', 'price drop',
      'lowest price', 'special offer', 'get yours', 'hurry', 'flash sale',
      'bogo', 'limited stock', 'today only', 'register now', 'free trial',
      'get started', 'unlock', 'premium', 'deal ends', 'act fast', 'shop now'
    ];

    // Personal / relationship keywords
    const personalKeywords = [
      'friend', 'family', 'mom', 'dad', 'brother', 'sister', 'cousin',
      'aunt', 'uncle', 'love', 'dear', 'hi', 'hello', 'how are you',
      'birthday', 'party', 'invitation', 'congratulations', 'vacation',
      'weekend', 'holiday', 'dinner', 'movie', 'hangout', 'fun', 'trip',
      'travel', 'hotel booking', 'reservation', 'concert', 'celebration',
      'thank you', 'thanks', 'miss you', 'talk soon', 'best wishes'
    ];

    // Context-aware urgency keywords
    const urgentKeywords = [
      // Direct urgency terms
      'urgent', 'asap', 'immediately', 'right away', 'action required',
      'attention needed', 'important', 'critical', 'priority', 'high priority',
      'time sensitive', 'reply soon', 'reply today', 'respond now', 'emergency',
      'deadline', 'final notice', 'respond asap', 'immediate response',
      'please act', 'need your reply', 'waiting for confirmation',
      // Subtle urgency contexts
      'by end of day', 'today', 'tonight', 'tomorrow morning', 'as soon as possible',
      'server down', 'system failure', 'payment due', 'invoice overdue',
      'security alert', 'account suspended', 'last chance', 'limited time left'
    ];

    // Detect urgency first (work/personal context only)
    const isUrgent = urgentKeywords.some(k => lc.includes(k));

    // Default category
    let category = 'personal';

    // Determine category priority
    if (workKeywords.some(k => lc.includes(k))) category = 'work';
    else if (promoKeywords.some(k => lc.includes(k))) category = 'promotions';
    else if (personalKeywords.some(k => lc.includes(k))) category = 'personal';

    return { category, isUrgent };
  };
  // ----------------------------------------

  // If Gemini API key missing, use fallback
  if (!process.env.GEMINI_API_KEY) {
    return heuristic();
  }

  // ---------- GEMINI PROMPT ----------
  const prompt = `
You are an expert email classifier.

Analyze the following email (subject + body) and output a **single-line JSON** with two fields:
{
  "category": "<work|personal|promotions>",
  "urgent": <true|false>
}

**CATEGORY RULES**
- WORK → Professional emails (projects, deadlines, meetings, office, HR, manager, invoices, company updates)
- PERSONAL → Friends, family, greetings, casual talks, travel plans, or personal messages.
- PROMOTIONS → Advertisements, brand updates, retail offers, sales, deals, coupons, discounts, newsletters.

**URGENCY RULES**
- Urgent is TRUE only when:
  - There’s a time-sensitive action ("asap", "today", "immediately", "server down", "deadline", "action required").
  - The email requires an immediate response or highlights a system/business emergency.
- Urgent is FALSE for marketing or general updates (even if they say "limited offer").

Do not classify SPAM. Assume all messages are genuine.
Do not output any explanation, markdown, or formatting — only JSON.

Subject:
${subject}

Body:
${text}
`.trim();
  // -----------------------------------

  try {
    // Call Gemini model for structured output
    const resp = await ai.models.generateContent({
      model: CLASSIFICATION_MODEL,
      contents: [{ text: prompt }],
      config: {
        responseMimeType: 'application/json',
        temperature: 0.1,
        responseSchema: {
          type: 'object',
          properties: {
            category: { type: 'string', enum: ['work', 'personal', 'promotions'] },
            urgent: { type: 'boolean' }
          },
          required: ['category', 'urgent']
        }
      }
    });

    const raw = resp.text?.trim();
    if (!raw) return heuristic();

    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    const jsonText = jsonMatch ? jsonMatch[0] : raw;

    let parsed;
    try {
      parsed = JSON.parse(jsonText);
    } catch {
      // fallback keyword matching if Gemini's JSON parsing fails
      const lc = raw.toLowerCase();
      const isUrgent = /urgent|asap|immediate|today|action required|reply now/.test(lc);
      const category = /promotion|offer|discount|sale|deal/.test(lc)
        ? 'promotions'
        : /meeting|project|client|work|invoice|office/.test(lc)
        ? 'work'
        : 'personal';
      return { category, isUrgent };
    }

    const category = (parsed.category || 'personal').toLowerCase();
    const isUrgent = !!parsed.urgent || !!parsed.isUrgent;

    return { category, isUrgent };

  } catch (err) {
    console.error('Gemini classify error:', err?.message || err);
    return heuristic();
  }
}

module.exports = { classifyEmail };























////////////////////////////////////////////////////////////////


// // utils/geminiClassifier.js

// // The structure of the client instantiation remains unchanged for compatibility
// const { GoogleGenAI } = require('@google/genai');
// const ai = new GoogleGenAI({});
// const CLASSIFICATION_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

// /**
//  * classifyEmail(text, subject)
//  * - Returns { category: string, isUrgent: boolean }
//  * - Tries to call Gemini if GEMINI_API_KEY present, otherwise falls back to a lightweight heuristic.
//  */
// async function classifyEmail(text = '', subject = '') {
//     const combined = `${subject}\n\n${text}`.trim();
    
//     // --- FALLBACK HEURISTIC (Remains unchanged for safety) ---
//     const heuristic = () => {
//         const lc = combined.toLowerCase();
//         // Updated keyword lists to align with the core categories (work, personal, spam, promotions)
//         const urgentKeywords = ['urgent', 'asap', 'immediately', 'important', 'action required'];
//         const spamPromoKeywords = ['unsubscribe', 'buy now', 'free offer', 'win money', 'click here', 'sale', 'discount'];
        
//         const isUrgent = urgentKeywords.some(k => lc.includes(k));
//         let category = 'personal'; // Default to 'personal' if no clear match

//         if (lc.includes('invoice') || lc.includes('receipt') || lc.includes('meeting')) category = 'work';
//         if (spamPromoKeywords.some(k => lc.includes(k))) category = 'promotions';
//         if (lc.includes('viagra') || lc.includes('scam')) category = 'spam';
        
//         // Ensure spam is never marked urgent by the heuristic
//         if (category === 'spam') return { category, isUrgent: false };
        
//         return { category, isUrgent };
//     };
//     // --------------------------------------------------------

//     if (!process.env.GEMINI_API_KEY) {
//         return heuristic();
//     }

//     // --- GEMINI CLASSIFICATION PROMPT (REINFORCED) ---
//     const prompt = `
// You are an expert email classifier. Your analysis must be based on the subject and body context using Natural Language Processing.
// You must return a **single, flat JSON object**.

// **Target Categories (Strictly Enforced):**
// - WORK (Professional tasks, projects, client communication)
// - PERSONAL (Known individuals, family, or personal account services)
// - SPAM (Unsolicited, harmful, or generic junk)
// - PROMOTIONS (Marketing, sales, newsletters, retail offers)

// **Urgency Rules:**
// 1. **Urgency Scope:** The \`urgent\` status applies **ONLY to WORK and PERSONAL** emails.
// 2. **SPAM & PROMOTIONS:** Always set \`urgent\` to **false**.
// 3. **Set to True:** Set \`urgent\` to **true** if the email demands immediate action, highlights a critical bug, or specifies an imminent deadline (e.g., "ASAP," "Server down," "Reply today").

// Do NOT output any text, explanation, or markdown formatting (e.g., \`\`\`), only the single-line JSON.

// Subject:
// ${subject}

// Body:
// ${text}
// `.trim();
//     // ----------------------------------------------------

//     try {
//         //  Update API call to use the modern pattern 
//         // This is necessary because the prompt is long and structured.
//         const resp = await ai.models.generateContent({
//             model: CLASSIFICATION_MODEL,
//             contents: [{ text: prompt }], // Pass the prompt as contents array
            
//             config: {
//                 //  Force JSON output to adhere to the target structure
//                 responseMimeType: "application/json", 
//                 temperature: 0.1, // Lower temperature increases adherence to rules
//                 // Define the structure needed for consistent parsing
//                 responseSchema: {
//                     type: "object",
//                     properties: {
//                         category: { 
//                             type: "string", 
//                             enum: ["spam", "work", "personal", "promotions"] 
//                         },
//                         urgent: { 
//                             type: "boolean" 
//                         }
//                     },
//                     required: ["category", "urgent"]
//                 }
//             }
//         });

//         // best-effort extraction of text from the response object
//         const raw = resp.text.trim();

//         if (!raw) return heuristic();

//         //  PARSING: Rely on the enforced JSON output
//         const jsonMatch = raw.match(/\{[\s\S]*\}/);
//         const jsonText = jsonMatch ? jsonMatch[0] : raw;

//         try {
//             const parsed = JSON.parse(jsonText);
            
//             // Normalize category and ensure SPAM is never urgent (safety override)
//             let category = (parsed.category || parsed.label || 'personal').toString().toLowerCase();
//             let isUrgent = !!parsed.urgent || !!parsed.isUrgent;
            
//             if (category === 'spam' || category === 'promotions') {
//                  isUrgent = false; // Enforce Urgency Rule 2 (SPAM/PROMO must be false)
//             }
            
//             return { category, urgent };
//         } catch (e) {
//             // fallback: try simple keyword mapping from the raw text
//             const lower = raw.toLowerCase();
//             const isUrgent = /urgent|asap|immediately|important|action needed/.test(lower);
//             const category = /spam|unsubscribe|buy now/.test(lower) ? 'spam' : 'personal';
//             return { category, urgent };
//         }
//     } catch (err) {
//         console.error('Gemini classify error:', err && err.message ? err.message : err);
//         return heuristic();
//     }
// }

// module.exports = { classifyEmail };
