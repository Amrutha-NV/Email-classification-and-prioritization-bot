const { mongoose } = require("mongoose");
const Email = require("./models/email.js");

main().then(() => { console.log("connnection made successsfully"); })
    .catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/EmailDatabase');
}
const personalmails = [{
        "id": "personal_001",
        "from": "sarah.jones@familymail.com",
        "to": "james.smith@gmail.com",
        "subject": "Family BBQ This Sunday",
        "body": "Hi James,\n\nJust a reminder about the family BBQ this Sunday at 3 PM at Aunt Lisa’s place. Everyone is excited to see you! We’ll have plenty of food and games for the kids.\n\nPlease bring your favorite dessert if you can. Let me know if you need a ride.\n\nLove,\nSarah",
        "label": "personal",
        "urgent": false,
        "link": null
    },
    {
        "id": "personal_002",
        "from": "billing@chase.com",
        "to": "james.smith@gmail.com",
        "subject": "Your August 2025 Statement is Ready",
        "body": "Dear James Smith,\n\nYour monthly bank statement for August is now available. Please review the attached file or log in to your Chase online banking account to view your transaction details.\n\nIf you notice any unauthorized transactions, please contact us immediately at (800) 935-9935.\n\nThank you for banking with Chase.\n\nBest regards,\nChase Customer Service Team",
        "label": "personal",
        "urgent": false,
        "link": "https://secure.chase.com/statements"
    },
    {
        "id": "personal_003",
        "from": "reception@greencareclinic.com",
        "to": "james.smith@gmail.com",
        "subject": "Appointment Confirmation - Sept 15, 3 PM",
        "body": "Dear James,\n\nThis is a confirmation of your appointment with Dr. Lee at GreenCare Clinic on September 15 at 3:00 PM. Please arrive 10 minutes early for check-in.\n\nIf you need to reschedule, call us at (555) 321-7890.\n\nThank you,\nGreenCare Clinic Reception",
        "label": "personal",
        "urgent": true,
        "link": null
    },
    {
        "id": "personal_004",
        "from": "bookings@travelahead.com",
        "to": "james.smith@gmail.com",
        "subject": "Flight Booking Confirmation - NYC Trip",
        "body": "Dear James Smith,\n\nYour flight to New York City is confirmed for October 5th, departing at 8:30 AM from JFK Airport. Your e-ticket and itinerary are attached.\n\nCheck in online 24 hours before your flight.\n\nSafe travels!\n\nTravelAhead Customer Support",
        "label": "personal",
        "urgent": false,
        "link": null
    },
    {
        "id": "personal_005",
        "from": "orders@amazono.com",
        "to": "james.smith@gmail.com",
        "subject": "Order Confirmation - #987654321",
        "body": "Hello James,\n\nThank you for your purchase from Amazono. Your order #987654321 has been successfully processed and is expected to ship within 2 business days.\n\nTrack your order anytime here: https://amazono.com/track/987654321\n\nIf you have any questions, please contact customer service.\n\nBest,\nAmazono Support Team",
        "label": "personal",
        "urgent": false,
        "link": "https://amazono.com/track/987654321"
    },
    {
        "id": "personal_006",
        "from": "no-reply@spotify.com",
        "to": "james.smith@gmail.com",
        "subject": "Your Personalized Spotify Wrapped 2025",
        "body": "Hi James,\n\nIt’s that time of year again! Your Spotify Wrapped 2025 is ready, showcasing your top artists, songs, and genres.\n\nOpen the app to explore your unique listening habits and share with friends.\n\nThanks for being a Spotify user!\n\nCheers,\nSpotify Team",
        "label": "personal",
        "urgent": false,
        "link": null
    },
    {
        "id": "personal_007",
        "from": "mom.andrea@familymail.com",
        "to": "james.smith@gmail.com",
        "subject": "Mom’s Birthday Celebration Plans",
        "body": "Hey James,\n\nJust wanted to check if you're free next weekend for mom’s birthday party. We’re planning a small gathering at home on Saturday evening.\n\nIt’d be great if you could bring your famous chocolate cake this year!\n\nLove you,\nAndrea",
        "label": "personal",
        "urgent": false,
        "link": null
    },
    {
        "id": "personal_008",
        "from": "alerts@paypal.com",
        "to": "james.smith@gmail.com",
        "subject": "Your Payment of $120.00 was Completed",
        "body": "Dear James Smith,\n\nYou have successfully sent a payment of $120.00 to John Appliances today.\n\nIf you did not authorize this transaction, please contact PayPal immediately.\n\nThank you for using PayPal.\n\nSecurity Team",
        "label": "personal",
        "urgent": true,
        "link": null
    },
    {
        "id": "personal_009",
        "from": "library@citylibrary.org",
        "to": "james.smith@gmail.com",
        "subject": "Overdue Notice - Book Return Reminder",
        "body": "Dear James,\n\nOur records show that the book \"The Great Gatsby\" is overdue since September 1st. Please return it by September 15 to avoid late fees.\n\nIf you have any questions, contact the library help desk.\n\nThank you,\nCity Library",
        "label": "personal",
        "urgent": false,
        "link": null
    },
    {
        "id": "personal_010",
        "from": "newsletters@nyt.com",
        "to": "james.smith@gmail.com",
        "subject": "Your Daily News Digest for September 10",
        "body": "Hello James,\n\nHere is your daily news digest featuring top stories, editorials, and more.\n\nStay informed and enjoy your reading!\n\nBest,\nNYT Newsletters Team",
        "label": "personal",
        "urgent": false,
        "link": null
    },
    {
        "id": "personal_011",
        "from": "support@zoom.us",
        "to": "james.smith@gmail.com",
        "subject": "Upcoming Scheduled Meeting Reminder",
        "body": "Hi James,\n\nYou have a scheduled Zoom meeting tomorrow at 2:00 PM with Marketing Team.\n\nJoin the meeting here: https://zoom.us/j/123456789\n\nPlease check your audio and video settings beforehand.\n\nThanks,\nZoom Support",
        "label": "personal",
        "urgent": false,
        "link": "https://zoom.us/j/123456789"
    },
    {
        "id": "personal_012",
        "from": "promo@nike.com",
        "to": "james.smith@gmail.com",
        "subject": "Exclusive Offer: 25% Off Fall Collection",
        "body": "Hi James,\n\nGet ready for fall with 25% off on the newest Nike collection. Offer valid through September 20.\n\nShop now at https://nike.com/fall-sale\n\nEnjoy your shopping!\n\nCheers,\nNike Team",
        "label": "personal",
        "urgent": false,
        "link": "https://nike.com/fall-sale"
    },
    {
        "id": "personal_013",
        "from": "tickets@concerts.com",
        "to": "james.smith@gmail.com",
        "subject": "Your Ticket Purchase Confirmation",
        "body": "Dear James,\n\nThanks for purchasing 2 tickets to the Coldplay concert on October 15.\n\nYour e-tickets are attached. Please bring a valid ID to the event.\n\nEnjoy the show!\n\nConcerts Team",
        "label": "personal",
        "urgent": false,
        "link": null
    },
    {
        "id": "personal_014",
        "from": "updates@fitnessapp.com",
        "to": "james.smith@gmail.com",
        "subject": "Your Weekly Fitness Summary",
        "body": "Hi James,\n\nYou've completed 5 workouts this week, burning 2,000 calories! Keep up the great work.\n\nCheck out new workout plans tailored just for you.\n\nStay fit!\n\nFitnessApp Team",
        "label": "personal",
        "urgent": false,
        "link": null
    },
    {
        "id": "personal_015",
        "from": "alerts@securitycenter.com",
        "to": "james.smith@gmail.com",
        "subject": "Login Alert from New Device",
        "body": "Hi James,\n\nWe detected a login to your account from a new device on September 9 at 10:45 PM.\n\nIf this was not you, please reset your password immediately.\n\nStay safe,\nSecurity Center",
        "label": "personal",
        "urgent": true,
        "link": null
    },
    {
        "id": "personal_016",
        "from": "mom.andrea@familymail.com",
        "to": "james.smith@gmail.com",
        "subject": "Mom’s Birthday Plans - October 2",
        "body": "Hi James,\n\nWe’re planning a small birthday celebration for Mom on October 2 at 6 PM at home.\n\nWould love for you to join and bring your famous cheesecake!\n\nLove,\nAndrea",
        "label": "personal",
        "urgent": false,
        "link": null
    },
    {
        "id": "personal_017",
        "from": "news@weatherchannel.com",
        "to": "james.smith@gmail.com",
        "subject": "Weekly Weather Forecast",
        "body": "Hello James,\n\nHere’s your weather forecast for next week. Expect sunny skies with a few showers on Thursday.\n\nPlan accordingly and stay prepared.\n\nRegards,\nWeather Channel",
        "label": "personal",
        "urgent": false,
        "link": null
    },
    {
        "id": "personal_018",
        "from": "support@amazon.com",
        "to": "james.smith@gmail.com",
        "subject": "Your Package Has Shipped",
        "body": "Dear James,\n\nYour order #A123456 has been shipped and is expected to arrive by September 14.\n\nTrack your package here: https://amazon.com/track/A123456\n\nThank you for shopping with us!\n\nAmazon Customer Service",
        "label": "personal",
        "urgent": false,
        "link": "https://amazon.com/track/A123456"
    },
    {
        "id": "personal_019",
        "from": "notifications@linkedin.com",
        "to": "james.smith@gmail.com",
        "subject": "New Connection Request",
        "body": "Hi James,\n\nYou have a new connection request from Sarah Lee. Click here to view and accept or decline.\n\nBest regards,\nLinkedIn Team",
        "label": "personal",
        "urgent": false,
        "link": "https://linkedin.com/invitation"
    },
    {
        "id": "personal_020",
        "from": "alerts@netflix.com",
        "to": "james.smith@gmail.com",
        "subject": "New Episodes of Your Favorite Shows",
        "body": "Hi James,\n\nNew episodes of the series \"The Crown\" are now available for streaming.\n\nStart watching today and enjoy!\n\nNetflix Team",
        "label": "personal",
        "urgent": false,
        "link": null
    },
    {
        "id": "personal_021",
        "from": "events@museum.com",
        "to": "james.smith@gmail.com",
        "subject": "Invitation: Art Exhibit Opening Night",
        "body": "Dear James,\n\nYou’re invited to the opening night of the Modern Art Exhibit on September 20 at 7 PM.\n\nEnjoy exclusive previews, live music, and refreshments.\n\nRSVP by September 15.\n\nBest regards,\nCity Museum",
        "label": "personal",
        "urgent": false,
        "link": null
    },
    {
        "id": "personal_022",
        "from": "reminders@carservice.com",
        "to": "james.smith@gmail.com",
        "subject": "Car Service Appointment Reminder",
        "body": "Hi James,\n\nThis is a reminder that your car service appointment is scheduled for September 18 at 10 AM.\n\nIf you need to reschedule, please contact us 24 hours in advance.\n\nThanks,\nAutoCare Service Team",
        "label": "personal",
        "urgent": false,
        "link": null
    },
    {
        "id": "personal_023",
        "from": "newsletter@techupdates.com",
        "to": "james.smith@gmail.com",
        "subject": "Monthly Technology Newsletter - September 2025",
        "body": "Hello James,\n\nCheck out the latest advancements in AI, gadgets to watch, and upcoming tech events in this month’s newsletter.\n\nStay ahead with TechUpdates!\n\nCheers,\nTechUpdates Team",
        "label": "personal",
        "urgent": false,
        "link": null
    },
    {
        "id": "personal_024",
        "from": "support@apple.com",
        "to": "james.smith@gmail.com",
        "subject": "Your Device Warranty Info",
        "body": "Dear James,\n\nThe warranty on your iPhone will expire on October 10, 2025. Consider extending your coverage with AppleCare.\n\nContact us for more information.\n\nBest,\nApple Support",
        "label": "personal",
        "urgent": false,
        "link": null
    },
    {
        "id": "personal_025",
        "from": "offers@starbucks.com",
        "to": "james.smith@gmail.com",
        "subject": "Exclusive Coffee Rewards Inside",
        "body": "Hi James,\n\nEnjoy double rewards points this week on all coffee purchases.\n\nVisit your nearest Starbucks and redeem your offer.\n\nCheers,\nStarbucks Rewards Team",
        "label": "personal",
        "urgent": false,
        "link": null
    },
    {
        "id": "personal_026",
        "from": "friend.linda@gmail.com",
        "to": "james.smith@gmail.com",
        "subject": "Weekend Getaway Plans",
        "body": "Hey James,\n\nAre you free this weekend for a quick getaway? Thought it’d be fun to hit the beach or go hiking.\n\nLet me know!\n\nLinda",
        "label": "personal",
        "urgent": false,
        "link": null
    },
    {
        "id": "personal_027",
        "from": "alerts@google.com",
        "to": "james.smith@gmail.com",
        "subject": "Password Change Confirmation",
        "body": "Hi James,\n\nWe wanted to let you know your Google account password was successfully changed on September 9.\n\nIf this wasn’t you, please secure your account immediately.\n\nGoogle Security Team",
        "label": "personal",
        "urgent": true,
        "link": null
    },
    {
        "id": "personal_028",
        "from": "tickets@theater.com",
        "to": "james.smith@gmail.com",
        "subject": "Your Theater Ticket Confirmation",
        "body": "Dear James,\n\nThank you for purchasing tickets for the Broadway show on October 10. Your electronic tickets are attached.\n\nEnjoy the performance!\n\nTheater Box Office",
        "label": "personal",
        "urgent": false,
        "link": null
    },
    {
        "id": "personal_029",
        "from": "fitness@apptracker.com",
        "to": "james.smith@gmail.com",
        "subject": "Daily Step Goal Achieved!",
        "body": "Hi James,\n\nCongrats! You’ve reached your daily step goal of 10,000 steps today. Keep up the good work to maintain your health and wellness.\n\nCheers,\nAppTracker Team",
        "label": "personal",
        "urgent": false,
        "link": null
    },
    {
        "id": "personal_030",
        "from": "newsletter@foodie.com",
        "to": "james.smith@gmail.com",
        "subject": "Top 5 Recipes to Try This Fall",
        "body": "Hello James,\n\nThis fall, try our top 5 delicious recipes featuring seasonal ingredients like pumpkin and sage.\n\nFind the full list on our blog!\n\nHappy cooking!\n\nFoodie Newsletter Team",
        "label": "personal",
        "urgent": false,
        "link": null
    },
    {
        "id": "personal_031",
        "from": "dad.johnson@familymail.com",
        "to": "james.smith@gmail.com",
        "subject": "Golf Outing This Weekend",
        "body": "Hey James,\n\nThinking of hitting the golf course this Saturday morning. Would love for you to join if you’re free. Let me know!\n\nCheers,\nDad",
        "label": "personal",
        "urgent": false,
        "link": null
    },
    {
        "id": "personal_032",
        "from": "billing@electricco.com",
        "to": "james.smith@gmail.com",
        "subject": "Your July-August Electricity Bill",
        "body": "Dear Customer,\n\nYour electricity bill for July-August is now available. Total amount due is $125.75, payable by September 30.\n\nPay online or contact us for assistance.\n\nThank you for being with ElectricCo.\n\nSupport Team",
        "label": "personal",
        "urgent": false,
        "link": "https://electricco.com/payments"
    },
    {
        "id": "personal_033",
        "from": "appointments@familydentist.com",
        "to": "james.smith@gmail.com",
        "subject": "Dental Cleaning Appointment Reminder",
        "body": "Hi James,\n\nThis is a reminder of your dental cleaning appointment on September 22 at 2 PM.\n\nPlease arrive 15 minutes early and bring your insurance card.\n\nBest,\nFamily Dentist Reception",
        "label": "personal",
        "urgent": false,
        "link": null
    },
    {
        "id": "personal_034",
        "from": "travel@hotels.com",
        "to": "james.smith@gmail.com",
        "subject": "Hotel Booking Confirmation - Miami Stay",
        "body": "Dear James,\n\nYour hotel booking at Oceanview Resort, Miami, is confirmed for December 1-5. Your confirmation number is H123456.\n\nEnjoy your stay!\n\nHotel Reservations Team",
        "label": "personal",
        "urgent": false,
        "link": null
    },
    {
        "id": "personal_035",
        "from": "orders@barnesandnoble.com",
        "to": "james.smith@gmail.com",
        "subject": "Order Shipped: New Novels",
        "body": "Hello James,\n\nYour order for the novels \"The Silent Patient\" and \"Where the Crawdads Sing\" has shipped and should arrive within 5 business days.\n\nTrack your order here: https://barnesandnoble.com/track/789012\n\nThanks for shopping with us!\n\nBarnes & Noble Customer Service",
        "label": "personal",
        "urgent": false,
        "link": "https://barnesandnoble.com/track/789012"
    },
    {
        "id": "personal_036",
        "from": "offers@ubereats.com",
        "to": "james.smith@gmail.com",
        "subject": "Get $10 Off Your Next Order!",
        "body": "Hey James,\n\nEnjoy $10 off your next UberEats order. Use code FEAST10 at checkout. Valid until September 30.\n\nBon appétit!\n\nUberEats Team",
        "label": "personal",
        "urgent": false,
        "link": null
    },
    {
        "id": "personal_037",
        "from": "notifications@linkedin.com",
        "to": "james.smith@gmail.com",
        "subject": "You Have 3 New Connection Requests",
        "body": "Hi James,\n\nYou have 3 new connection requests waiting to be accepted on LinkedIn.\n\nVisit your profile to view and respond.\n\nBest,\nLinkedIn Team",
        "label": "personal",
        "urgent": false,
        "link": "https://linkedin.com/invitations"
    },
    {
        "id": "personal_038",
        "from": "calendar@outlook.com",
        "to": "james.smith@gmail.com",
        "subject": "Event Reminder: Yoga Class Tomorrow",
        "body": "Dear James,\n\nThis is a reminder that your Yoga class is scheduled for tomorrow at 6:30 PM at Downtown Studio.\n\nPlease bring your mat and water.\n\nSee you there!\n\nOutlook Calendar",
        "label": "personal",
        "urgent": false,
        "link": null
    },
    {
        "id": "personal_039",
        "from": "mom.maria@familymail.com",
        "to": "james.smith@gmail.com",
        "subject": "Photos from Last Weekend",
        "body": "Hi James,\n\nI just uploaded the photos from our hike last weekend to the shared album. Hope you like them!\n\nHere’s the link: https://familyphotos.com/album123\n\nLove,\nMaria",
        "label": "personal",
        "urgent": false,
        "link": "https://familyphotos.com/album123"
    },
    {
        "id": "personal_040",
        "from": "rewards@starbucks.com",
        "to": "james.smith@gmail.com",
        "subject": "Your Starbucks Rewards Balance",
        "body": "Hi James,\n\nYou have 350 points available in your Starbucks Rewards account.\n\nRedeem points for free drinks and food at your favorite store.\n\nEnjoy!\n\nStarbucks Rewards Team",
        "label": "personal",
        "urgent": false,
        "link": null
    },
    {
        "id": "personal_041",
        "from": "updates@spotify.com",
        "to": "james.smith@gmail.com",
        "subject": "New Playlist Recommendations Just for You",
        "body": "Hey James,\n\nBased on your recent listens, we’ve curated some new playlists you might love.\n\nDiscover them now in the Spotify app and keep the beats flowing!\n\nCheers,\nSpotify Team",
        "label": "personal",
        "urgent": false,
        "link": null
    },
    {
        "id": "personal_042",
        "from": "shop@etsy.com",
        "to": "james.smith@gmail.com",
        "subject": "Your Order Has Been Delivered",
        "body": "Dear James,\n\nYour handcrafted watch order has been delivered to your address. We hope you love it!\n\nThank you for supporting small businesses on Etsy.\n\nEtsy Customer Support",
        "label": "personal",
        "urgent": false,
        "link": null
    },
    {
        "id": "personal_043",
        "from": "friend.anita@example.com",
        "to": "james.smith@gmail.com",
        "subject": "Weekend Hangout Plans",
        "body": "Hey James,\n\nAre you free this weekend? Thinking about catching that new movie and grabbing some dinner.\n\nLet me know!\n\n-Anita",
        "label": "personal",
        "urgent": false,
        "link": null
    },
    {
        "id": "personal_044",
        "from": "alerts@facebook.com",
        "to": "james.smith@gmail.com",
        "subject": "New Message from Mark",
        "body": "Hi James,\n\nMark sent you a new message on Facebook. Log in to your account to read and reply.\n\nBest,\nFacebook Team",
        "label": "personal",
        "urgent": false,
        "link": "https://facebook.com/messages"
    },
    {
        "id": "personal_045",
        "from": "travel@expedia.com",
        "to": "james.smith@gmail.com",
        "subject": "Your Hotel Booking is Confirmed",
        "body": "Dear James,\n\nYour hotel booking at Mountainview Resort from December 10 to 15 is confirmed.\n\nIf you need to amend your stay, please contact us.\n\nSafe travels!\n\nExpedia Team",
        "label": "personal",
        "urgent": false,
        "link": null
    },
    {
        "id": "personal_046",
        "from": "news@bbc.com",
        "to": "james.smith@gmail.com",
        "subject": "Top Headlines for Today",
        "body": "Hello James,\n\nStay updated with today’s top headlines and breaking news.\n\nClick here to read more.\n\nBest,\nBBC News",
        "label": "personal",
        "urgent": false,
        "link": "https://bbc.com/news"
    },
    {
        "id": "personal_047",
        "from": "fitness@app.com",
        "to": "james.smith@gmail.com",
        "subject": "You Achieved Your Weekly Goal!",
        "body": "Hi James,\n\nCongrats on achieving your fitness goal this week! You logged 4 workouts and walked over 10 miles.\n\nKeep it up!\n\nApp Fitness Team",
        "label": "personal",
        "urgent": false,
        "link": null
    },
    {
        "id": "personal_048",
        "from": "tickets@stadium.com",
        "to": "james.smith@gmail.com",
        "subject": "Concert Tickets Confirmed",
        "body": "Dear James,\n\nYour tickets to see The Rolling Stones on October 22 at Grand Stadium are confirmed.\n\nPlease bring a valid ID and e-ticket to the event.\n\nEnjoy the concert!\n\nStadium Box Office",
        "label": "personal",
        "urgent": false,
        "link": null
    },
    {
        "id": "personal_049",
        "from": "mom.lisa@familymail.com",
        "to": "james.smith@gmail.com",
        "subject": "Mom’s Garden Photos",
        "body": "Hi James,\n\nJust sent you the photos of the garden she planted last summer. It’s blooming beautifully!\n\nCheck your shared album.\n\nLove,\nMom",
        "label": "personal",
        "urgent": false,
        "link": null
    },
    {
        "id": "personal_050",
        "from": "newsletters@foodblog.com",
        "to": "james.smith@gmail.com",
        "subject": "5 Easy Weeknight Dinner Recipes",
        "body": "Hello James,\n\nLooking for quick and delicious dinner ideas? Check out our top 5 easy weeknight recipes perfect for busy schedules.\n\nHappy cooking!\n\nFoodBlog Newsletter Team",
        "label": "personal",
        "urgent": false,
        "link": null
    }
]

const main = async() => {
    await Email.deleteMany({}).then(() => { console.log("Databse is empty") }).catch((err) => { console.error(err) });
    await Email.insertMany(personalmails).then(() => { console.log("work mails added to database successfully") }).catch((err) => { console.error(err) });
}

main();