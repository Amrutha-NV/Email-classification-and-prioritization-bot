const { mongoose } = require("mongoose");
const Email = require("./models/emails.js");

main().then(() => { console.log("connnection made successsfully"); })
    .catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/EmailDatabase');
}

const promotionmails = [{
        "id": "promo_001",
        "from": "offers@nike.com",
        "to": "jane.doe@example.com",
        "subject": "Exclusive 25% Off on Your Favorite Sneakers!",
        "body": "Hi Jane,\n\nStep up your game with 25% off on all sneakers this week only! Use code SNEAK25 at checkout. Don't miss out on limited styles and sizes.\n\nShop now: https://nike.com/sale\n\nBest,\nNike Team",
        "label": "promotions",
        "urgent": false,
        "link": "https://nike.com/sale"
    },
    {
        "id": "promo_002",
        "from": "deals@amazon.com",
        "to": "jane.doe@example.com",
        "subject": "Today Only: Flash Deals Up to 50% Off",
        "body": "Dear Jane,\n\nHurry! Our flash sale is live for the next 24 hours with up to 50% off electronics, home goods, and more. Don't wait, grab the best deals before they're gone.\n\nStart shopping: https://amazon.com/flashdeals\n\nCheers,\nAmazon Deals Team",
        "label": "promotions",
        "urgent": true,
        "link": "https://amazon.com/flashdeals"
    },
    {
        "id": "promo_003",
        "from": "sale@macys.com",
        "to": "jane.doe@example.com",
        "subject": "Fall Fashion Sale - Up to 60% Off!",
        "body": "Hey Jane,\n\nRefresh your wardrobe with Macy's fall fashion sale! Save up to 60% on selected apparel, shoes, and accessories. Limited time offer.\n\nShop the sale: https://macys.com/fall-sale\n\nHappy shopping!\nMacy's Team",
        "label": "promotions",
        "urgent": false,
        "link": "https://macys.com/fall-sale"
    },
    {
        "id": "promo_004",
        "from": "news@starbucks.com",
        "to": "jane.doe@example.com",
        "subject": "Limited Time Offer: Buy One Get One Free",
        "body": "Hi Jane,\n\nCelebrate with us! For a limited time, get a free beverage with any purchase of a grande or larger size in-store or via our app.\n\nTreat yourself at your nearest Starbucks today.\n\nCheers,\nStarbucks Rewards Team",
        "label": "promotions",
        "urgent": true,
        "link": null
    },
    {
        "id": "promo_005",
        "from": "promo@sephora.com",
        "to": "jane.doe@example.com",
        "subject": "Beauty Sale - Up to 40% Off Plus Free Samples",
        "body": "Dear Jane,\n\nGet glowing with Sephora's beauty sale! Enjoy up to 40% off on skincare, makeup, and haircare products. Plus, receive free samples with every order above $50.\n\nShop now: https://sephora.com/sale\n\nBest,\nSephora Team",
        "label": "promotions",
        "urgent": false,
        "link": "https://sephora.com/sale"
    },
    {
        "id": "promo_006",
        "from": "offers@bestbuy.com",
        "to": "jane.doe@example.com",
        "subject": "Your Weekend Tech Deals Are Here",
        "body": "Hello Jane,\n\nUpgrade your gadgets this weekend with Best Buy's exclusive deals on laptops, TVs, and smart home devices. Discounts up to 35% off!\n\nCheck out the deals: https://bestbuy.com/deals\n\nDon’t miss out!\nBest Buy Team",
        "label": "promotions",
        "urgent": false,
        "link": "https://bestbuy.com/deals"
    },
    {
        "id": "promo_007",
        "from": "newsletter@bookdepot.com",
        "to": "jane.doe@example.com",
        "subject": "Special Offer: Buy 2, Get 1 Free on All Books",
        "body": "Dear Jane,\n\nDive into your next adventure with Book Depot's Buy 2, Get 1 Free offer on all books across all genres.\n\nVisit: https://bookdepot.com/special-offer\n\nHappy reading!\nBook Depot",
        "label": "promotions",
        "urgent": false,
        "link": "https://bookdepot.com/special-offer"
    },
    {
        "id": "promo_008",
        "from": "promo@gap.com",
        "to": "jane.doe@example.com",
        "subject": "Fall Sale: 30% Off Sitewide + Free Shipping",
        "body": "Hi Jane,\n\nGet ready for fall with GAP’s sitewide sale! Enjoy 30% off all items plus free shipping on orders over $50.\n\nShop now: https://gap.com/fallsale\n\nCheers,\nGAP Team",
        "label": "promotions",
        "urgent": false,
        "link": "https://gap.com/fallsale"
    },
    {
        "id": "promo_009",
        "from": "offers@target.com",
        "to": "jane.doe@example.com",
        "subject": "Back to School Savings - Up to 50% Off",
        "body": "Dear Jane,\n\nStock up for school with Target’s Back to School sale! Save up to 50% on backpacks, notebooks, and more.\n\nShop early: https://target.com/backtoschool\n\nHappy shopping!\nTarget Team",
        "label": "promotions",
        "urgent": false,
        "link": "https://target.com/backtoschool"
    },
    {
        "id": "promo_010",
        "from": "deals@walmart.com",
        "to": "jane.doe@example.com",
        "subject": "Limited Time: Great Deals on Electronics",
        "body": "Hi Jane,\n\nDiscover amazing prices on televisions, smartphones, and more at Walmart. Limited time only.\n\nBrowse the deals: https://walmart.com/electronics\n\nHappy saving!\nWalmart Deals Team",
        "label": "promotions",
        "urgent": false,
        "link": "https://walmart.com/electronics"
    },
    {
        "id": "promo_011",
        "from": "specials@hm.com",
        "to": "jane.doe@example.com",
        "subject": "Your Exclusive Invitation to H&M VIP Sale",
        "body": "Dear Jane,\n\nYou're invited to preview the H&M VIP sale starting this Friday. Enjoy first access to up to 40% off new arrivals.\n\nUse code VIP40 at checkout.\n\nShop here: https://hm.com/vip-sale\n\nSee you there!\nH&M Team",
        "label": "promotions",
        "urgent": false,
        "link": "https://hm.com/vip-sale"
    },
    {
        "id": "promo_012",
        "from": "promo@ultrabeauty.com",
        "to": "jane.doe@example.com",
        "subject": "Glow Up! 20% Off on All Skincare Products",
        "body": "Hi Jane,\n\nGet glowing with UltraBeauty’s exclusive 20% off sale on skincare products this weekend only.\n\nGrab your favorites: https://ultrabeauty.com/skincare\n\nTreat yourself!\nUltraBeauty Team",
        "label": "promotions",
        "urgent": false,
        "link": "https://ultrabeauty.com/skincare"
    },
    {
        "id": "promo_013",
        "from": "flashsales@ebay.com",
        "to": "jane.doe@example.com",
        "subject": "Flash Sale: Deals Ending Soon",
        "body": "Dear Jane,\n\nDon’t miss out on eBay’s flash sale ending tonight! Save on electronics, fashion, and home goods.\n\nShop now: https://ebay.com/flash-sale\n\nHappy bargain hunting!\nEbay Team",
        "label": "promotions",
        "urgent": true,
        "link": "https://ebay.com/flash-sale"
    },
    {
        "id": "promo_014",
        "from": "offers@ikea.com",
        "to": "jane.doe@example.com",
        "subject": "Refresh Your Home - 15% Off Furniture",
        "body": "Hi Jane,\n\nTransform your spaces with 15% off all furniture at IKEA.\n\nOffer valid through October 5.\n\nExplore deals: https://ikea.com/furniture-sale\n\nEnjoy the makeover!\nIKEA Team",
        "label": "promotions",
        "urgent": false,
        "link": "https://ikea.com/furniture-sale"
    },
    {
        "id": "promo_015",
        "from": "news@adidas.com",
        "to": "jane.doe@example.com",
        "subject": "Unlock 30% Off Your Next Adidas Purchase",
        "body": "Dear Jane,\n\nWe appreciate your loyal support! Use code LOYAL30 to save 30% on your next purchase.\n\nShop now: https://adidas.com/discount\n\nStay active!\nAdidas Team",
        "label": "promotions",
        "urgent": false,
        "link": "https://adidas.com/discount"
    },
    {
        "id": "promo_016",
        "from": "promo@stopandshop.com",
        "to": "jane.doe@example.com",
        "subject": "Weekly Grocery Specials Inside",
        "body": "Hi Jane,\n\nDiscover weekly deals on fresh produce, dairy, and pantry essentials at Stop & Shop.\n\nCheck the specials here: https://stopandshop.com/deals\n\nHappy shopping!\nStop & Shop Team",
        "label": "promotions",
        "urgent": false,
        "link": "https://stopandshop.com/deals"
    },
    {
        "id": "promo_017",
        "from": "invites@moviehub.com",
        "to": "jane.doe@example.com",
        "subject": "Free Popcorn with Movie Tickets This Weekend",
        "body": "Dear Jane,\n\nEnjoy a free popcorn with every movie ticket purchased this weekend at MovieHub theaters.\n\nBook your seats: https://moviehub.com/tickets\n\nEnjoy the show!\nMovieHub Team",
        "label": "promotions",
        "urgent": true,
        "link": "https://moviehub.com/tickets"
    },
    {
        "id": "promo_018",
        "from": "offers@gap.com",
        "to": "jane.doe@example.com",
        "subject": "Back to School: 20% Off for Students",
        "body": "Hi Jane,\n\nStudents save 20% on all apparel and accessories with valid ID at Gap stores and online.\n\nShop now: https://gap.com/back-to-school\n\nOffer ends September 30.\n\nBest,\nGap Team",
        "label": "promotions",
        "urgent": false,
        "link": "https://gap.com/back-to-school"
    },
    {
        "id": "promo_019",
        "from": "offers@walgreens.com",
        "to": "jane.doe@example.com",
        "subject": "Flu Shots Now Available - Book Appointment Today",
        "body": "Dear Jane,\n\nProtect yourself this season. Flu shots are now available at Walgreens.\n\nBook your appointment online: https://walgreens.com/appointments\n\nStay healthy!\nWalgreens Pharmacy",
        "label": "promotions",
        "urgent": false,
        "link": "https://walgreens.com/appointments"
    },
    {
        "id": "promo_020",
        "from": "sales@gap.com",
        "to": "jane.doe@example.com",
        "subject": "Weekend Flash Sale - Extra 10% Off Clearance",
        "body": "Hi Jane,\n\nExtra 10% off all clearance items this weekend only! Don’t miss out.\n\nShop clearance: https://gap.com/clearance\n\nCheers,\nGap Sales Team",
        "label": "promotions",
        "urgent": true,
        "link": "https://gap.com/clearance"
    },
    {
        "id": "promo_021",
        "from": "news@ebay.com",
        "to": "jane.doe@example.com",
        "subject": "Special Offer: Save $20 on Electronics",
        "body": "Dear Jane,\n\nGet $20 off orders over $100 on select electronics.\n\nSee offers: https://ebay.com/electronics\n\nHappy shopping!\nEbay Team",
        "label": "promotions",
        "urgent": false,
        "link": "https://ebay.com/electronics"
    },
    {
        "id": "promo_022",
        "from": "promo@apple.com",
        "to": "jane.doe@example.com",
        "subject": "Trade-in and Save on New iPhone",
        "body": "Hello Jane,\n\nTrade in your old device and save on a new iPhone.\n\nLearn more: https://apple.com/trade-in\n\nBest,\nApple Team",
        "label": "promotions",
        "urgent": false,
        "link": "https://apple.com/trade-in"
    },
    {
        "id": "promo_023",
        "from": "offers@hulu.com",
        "to": "jane.doe@example.com",
        "subject": "Get Your First Month of Hulu at $1",
        "body": "Hi Jane,\n\nSign up today and enjoy your first month of Hulu streaming for just $1.\n\nDon’t miss your favorite shows!\n\nHulu Team",
        "label": "promotions",
        "urgent": true,
        "link": "https://hulu.com/signup"
    },
    {
        "id": "promo_024",
        "from": "deals@homedepot.com",
        "to": "jane.doe@example.com",
        "subject": "Home Improvement Savings Inside",
        "body": "Dear Jane,\n\nSave big on tools, appliances, and more with Home Depot’s latest deals.\n\nFind deals here: https://homedepot.com/deals\n\nHappy renovating!\nHome Depot Team",
        "label": "promotions",
        "urgent": false,
        "link": "https://homedepot.com/deals"
    },
    {
        "id": "promo_025",
        "from": "specials@costco.com",
        "to": "jane.doe@example.com",
        "subject": "Member-Exclusive Deals This Week",
        "body": "Hi Jane,\n\nEnjoy members-only pricing on electronics and groceries this week at Costco.\n\nShop now: https://costco.com/membersale\n\nThanks for being with Costco!\n\nCostco Team",
        "label": "promotions",
        "urgent": false,
        "link": "https://costco.com/membersale"
    },
    {
        "id": "promo_026",
        "from": "promo@asos.com",
        "to": "jane.doe@example.com",
        "subject": "Up to 50% Off Fashion Favorites",
        "body": "Dear Jane,\n\nRefresh your wardrobe with ASOS’s top styles at up to 50% off.\n\nShop the sale: https://asos.com/sale\n\nStyle up!\nASOS Team",
        "label": "promotions",
        "urgent": false,
        "link": "https://asos.com/sale"
    },
    {
        "id": "promo_027",
        "from": "offers@dominos.com",
        "to": "jane.doe@example.com",
        "subject": "Large Pizza for $7.99 - Tonight Only!",
        "body": "Hey Jane,\n\nGet a large pizza for just $7.99 tonight only! Use code PIZZA799 when ordering online.\n\nOrder now: https://dominos.com/order\n\nEnjoy!\nDomino’s Pizza",
        "label": "promotions",
        "urgent": true,
        "link": "https://dominos.com/order"
    },
    {
        "id": "promo_028",
        "from": "news@overstock.com",
        "to": "jane.doe@example.com",
        "subject": "Huge Home Decor Discounts!",
        "body": "Hello Jane,\n\nSpruce up your home with Overstock’s latest discounts on decor items.\n\nUp to 70% off today only.\n\nShop here: https://overstock.com/home-decor\n\nBest,\nOverstock Team",
        "label": "promotions",
        "urgent": true,
        "link": "https://overstock.com/home-decor"
    },
    {
        "id": "promo_029",
        "from": "promo@chewy.com",
        "to": "jane.doe@example.com",
        "subject": "Save 15% on Pet Food & Supplies",
        "body": "Dear Jane,\n\nKeep your furry friends happy with 15% off pet food and supplies at Chewy.\n\nUse code PETLOVE15\n\nShop now: https://chewy.com/deals\n\nChewy Team",
        "label": "promotions",
        "urgent": false,
        "link": "https://chewy.com/deals"
    },
    {
        "id": "promo_030",
        "from": "offers@ultrafit.com",
        "to": "jane.doe@example.com",
        "subject": "Join Ultrafit - Get 1 Month Free Trial",
        "body": "Hi Jane,\n\nStart your fitness journey with Ultrafit and enjoy a 1-month free trial on all memberships.\n\nSign up today: https://ultrafit.com/join\n\nStay strong!\nUltrafit Team",
        "label": "promotions",
        "urgent": false,
        "link": "https://ultrafit.com/join"
    }
]
const addToDatabas = async() => {

    await Email.insertMany(promotionmails).then(() => { console.log("mails added to database successfully") }).catch((err) => { console.error(err) });
}

addToDatabas();