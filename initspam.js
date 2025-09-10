const { mongoose } = require("mongoose");
const Email = require("./models/emails.js");

main().then(() => { console.log("connnection made successsfully"); })
    .catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/EmailDatabase');
}
const spammails = [{
        "id": "spam_001",
        "from": "no-reply@mcafeesecurity.com",
        "to": "victim.user@example.com",
        "subject": "Your McAfee Subscription Has Been Renewed",
        "body": "Dear User,\n\nWe noticed that your McAfee subscription was automatically renewed and charged $99.99. If you did not authorize this payment, please contact support or visit the link below to cancel your subscription.\n\nCancellation Link: http://secure-mcafee-cancel.com\n\nThank you for using McAfee.\n\nSecurity Team",
        "label": "spam",
        "urgent": false,
        "link": "http://secure-mcafee-cancel.com"
    },
    {
        "id": "spam_002",
        "from": "tax-relief@irs-support.com",
        "to": "citizen@example.com",
        "subject": "IRS Tax Refund Notification: Action Required",
        "body": "Dear Taxpayer,\n\nYou may be eligible for a refund of $1,250. Please verify your information by clicking the link below.\n\nVerify Now: http://irs-refund-claim.com\n\nInternal Revenue Service",
        "label": "spam",
        "urgent": false,
        "link": "http://irs-refund-claim.com"
    },
    {
        "id": "spam_003",
        "from": "hr-update@yourcompany-email.com",
        "to": "employee.name@company.com",
        "subject": "Update Your Employee Information",
        "body": "Dear Employee,\n\nPlease update your personal information by clicking the link below to continue accessing corporate resources.\n\nUpdate Info: http://company-hr-verify.com\n\nHR Department",
        "label": "spam",
        "urgent": false,
        "link": "http://company-hr-verify.com"
    },
    {
        "id": "spam_004",
        "from": "alerts@paypalsecure.com",
        "to": "user.account@example.com",
        "subject": "Suspicious Activity Detected on Your PayPal Account",
        "body": "Dear Customer,\n\nWe detected suspicious activity on your PayPal account. Please confirm your identity at the link below to secure your account.\n\nConfirm Now: http://paypal-security-alert.com\n\nPayPal Security Team",
        "label": "spam",
        "urgent": false,
        "link": "http://paypal-security-alert.com"
    },
    {
        "id": "spam_005",
        "from": "security@amazon-account.com",
        "to": "buyer123@example.com",
        "subject": "Amazon Account Locked - Verify Your Identity",
        "body": "Hello,\n\nDue to unusual activity, your Amazon account has been temporarily locked. Please verify your identity to regain access.\n\nVerify Account: http://amazon-verify-account.com\n\nAmazon Customer Service",
        "label": "spam",
        "urgent": false,
        "link": "http://amazon-verify-account.com"
    },
    {
        "id": "spam_006",
        "from": "support@zoom-meeting.com",
        "to": "employee@company.com",
        "subject": "Meeting Link Expired - Renew Now",
        "body": "Hello,\n\nYour Zoom meeting link has expired. Click here to renew your access.\n\nRenew Link: http://zoom-renewal-link.com\n\nZoom Support Team",
        "label": "spam",
        "urgent": false,
        "link": "http://zoom-renewal-link.com"
    },
    {
        "id": "spam_007",
        "from": "cloudstorage@dropbox-help.com",
        "to": "user.dropbox@example.com",
        "subject": "Storage Quota Exceeded - Upgrade Now",
        "body": "Dear User,\n\nYour Dropbox storage quota has been exceeded. Upgrade today to avoid disruption.\n\nUpgrade Link: http://dropbox-storage-upgrade.com\n\nThank you for choosing Dropbox.",
        "label": "spam",
        "urgent": false,
        "link": "http://dropbox-storage-upgrade.com"
    },
    {
        "id": "spam_008",
        "from": "alerts@microsoft365.com",
        "to": "employee.mail@example.com",
        "subject": "Your Microsoft Password Expires Soon",
        "body": "Dear User,\n\nYour Microsoft 365 password expires in 24 hours. Update it here to maintain access.\n\nUpdate Password: http://microsoft-password-reset.com\n\nMicrosoft Support",
        "label": "spam",
        "urgent": false,
        "link": "http://microsoft-password-reset.com"
    },
    {
        "id": "spam_009",
        "from": "finance@westernunion.com",
        "to": "recipient123@example.com",
        "subject": "Wire Transfer Notification",
        "body": "Hello,\n\nYour request to send $5,000 has been received. Please confirm this transaction.\n\nConfirm Transfer: http://westernunion-confirm.com\n\nWestern Union Finance Dept.",
        "label": "spam",
        "urgent": false,
        "link": "http://westernunion-confirm.com"
    },
    {
        "id": "spam_010",
        "from": "invoice@netflixbilling.com",
        "to": "subscriber@example.com",
        "subject": "Netflix Subscription Payment Failed",
        "body": "Dear Subscriber,\n\nYour last payment attempt failed. Please update payment details to continue enjoying Netflix.\n\nUpdate Payment Info: http://netflix-payment-update.com\n\nNetflix Billing Team",
        "label": "spam",
        "urgent": false,
        "link": "http://netflix-payment-update.com"
    },
    {
        "id": "spam_011",
        "from": "admin@linkedin-security.com",
        "to": "user.linkedin@example.com",
        "subject": "Confirm Your LinkedIn Account",
        "body": "Dear User,\n\nSuspicious login attempt detected. Verify your identity.\n\nVerify Now: http://linkedin-security-confirm.com\n\nLinkedIn Security Team",
        "label": "spam",
        "urgent": false,
        "link": "http://linkedin-security-confirm.com"
    },
    {
        "id": "spam_012",
        "from": "support@facebook-updates.com",
        "to": "user.facebook@example.com",
        "subject": "Facebook Account Suspension Warning",
        "body": "Hello,\n\nYour Facebook account will be suspended unless you confirm your identity within 24 hours.\n\nClick here to verify: http://facebook-verify-account.com\n\nFacebook Support",
        "label": "spam",
        "urgent": false,
        "link": "http://facebook-verify-account.com"
    },
    {
        "id": "spam_013",
        "from": "security@apple-support.com",
        "to": "user.apple@example.com",
        "subject": "Apple ID Locked - Reset Password",
        "body": "Dear User,\n\nYour Apple ID locked due to multiple login attempts. Reset password here.\n\nReset Now: http://appleid-reset.com\n\nApple Support",
        "label": "spam",
        "urgent": false,
        "link": "http://appleid-reset.com"
    },
    {
        "id": "spam_014",
        "from": "offers@paypal-fraudalert.com",
        "to": "paypal.user@example.com",
        "subject": "Suspicious Activity Alert on Your PayPal Account",
        "body": "Dear Customer,\n\nSuspicious activity detected. Review your transactions.\n\nVisit: http://paypal-review.com\n\nPayPal Security Team",
        "label": "spam",
        "urgent": false,
        "link": "http://paypal-review.com"
    },
    {
        "id": "spam_015",
        "from": "notification@ebay-secure.com",
        "to": "buyer123@example.com",
        "subject": "Account Notice: Ebay Login Attempt",
        "body": "Dear User,\n\nUnrecognized login detected. Confirm your identity now.\n\nVerify: http://ebay-login-alert.com\n\nEbay Security",
        "label": "spam",
        "urgent": false,
        "link": "http://ebay-login-alert.com"
    },
    {
        "id": "spam_016",
        "from": "alerts@google.com",
        "to": "user.email@example.com",
        "subject": "Account Suspended Due to Suspicious Activity",
        "body": "Dear User,\n\nYour Google account was suspended due to unusual activity. Visit the link to reactivate.\n\nReactivation Link: http://google-account-secure.com\n\nGoogle Support",
        "label": "spam",
        "urgent": false,
        "link": "http://google-account-secure.com"
    },
    {
        "id": "spam_017",
        "from": "security@microsoft.com",
        "to": "user@outlook.com",
        "subject": "Microsoft Account Compromised",
        "body": "Dear User,\n\nYour Microsoft account shows suspicious login. Secure your account here.\n\nSecure Now: http://microsoft-security-alert.com\n\nMicrosoft Support",
        "label": "spam",
        "urgent": false,
        "link": "http://microsoft-security-alert.com"
    },
    {
        "id": "spam_018",
        "from": "support@instagram.com",
        "to": "user.instagram@example.com",
        "subject": "Instagram Account Verification Required",
        "body": "Dear User,\n\nPlease verify your Instagram account to avoid suspension.\n\nVerify Now: http://instagram-verify.com\n\nInstagram Support",
        "label": "spam",
        "urgent": false,
        "link": "http://instagram-verify.com"
    },
    {
        "id": "spam_019",
        "from": "service@paypal.com",
        "to": "user.paypal@example.com",
        "subject": "Confirm Your Recent PayPal Transaction",
        "body": "Dear User,\n\nConfirm your recent transaction to secure your account.\n\nConfirm Here: http://paypal-transaction-confirm.com\n\nPayPal",
        "label": "spam",
        "urgent": false,
        "link": "http://paypal-transaction-confirm.com"
    },
    {
        "id": "spam_020",
        "from": "contact@appleid.com",
        "to": "user.apple@example.com",
        "subject": "Apple ID Verification Required",
        "body": "Dear User,\n\nVerify your Apple ID immediately to avoid account restrictions.\n\nVerify Now: http://appleid-verify.com\n\nApple Support",
        "label": "spam",
        "urgent": false,
        "link": "http://appleid-verify.com"
    },
    {
        "id": "spam_021",
        "from": "alerts@paypal.com",
        "to": "user.paypal@example.com",
        "subject": "Unusual Activity Detected on Your PayPal",
        "body": "Dear User,\n\nUnusual login detected on your PayPal account. Please review activity.\n\nDetails: http://paypal-alert.com\n\nPayPal Security",
        "label": "spam",
        "urgent": false,
        "link": "http://paypal-alert.com"
    },
    {
        "id": "spam_022",
        "from": "support@facebook.com",
        "to": "user.facebook@example.com",
        "subject": "Reset Your Facebook Password",
        "body": "We received a password reset request for your account.\n\nReset here: http://facebook-reset.com\n\nIf not initiated by you, ignore this message.",
        "label": "spam",
        "urgent": false,
        "link": "http://facebook-reset.com"
    },
    {
        "id": "spam_023",
        "from": "support@whatsapp.com",
        "to": "user.whatsapp@example.com",
        "subject": "Verify Your WhatsApp Account",
        "body": "Verify your WhatsApp account to prevent suspension.\n\nVerify at: http://whatsapp-verify.com\n\nWhatsApp Support",
        "label": "spam",
        "urgent": false,
        "link": "http://whatsapp-verify.com"
    },
    {
        "id": "spam_024",
        "from": "account@netflix.com",
        "to": "user.netflix@example.com",
        "subject": "Subscription Payment Issue",
        "body": "Your Netflix subscription payment failed.\n\nUpdate payment info here: http://netflix-payment.com\n\nNetflix Customer Service",
        "label": "spam",
        "urgent": false,
        "link": "http://netflix-payment.com"
    },
    {
        "id": "spam_025",
        "from": "security@twitter.com",
        "to": "user.twitter@example.com",
        "subject": "Twitter Security Alert",
        "body": "Unusual login detected on your account. Please verify your identity.\n\nVerify now: http://twitter-security.com\n\nTwitter Support",
        "label": "spam",
        "urgent": false,
        "link": "http://twitter-security.com"
    },
    {
        "id": "spam_026",
        "from": "no-reply@linkedin.com",
        "to": "user.linkedin@example.com",
        "subject": "Your LinkedIn Account Needs Your Attention",
        "body": "Your LinkedIn account will be limited unless verified.\n\nVerify here: http://linkedin-verify.com\n\nLinkedIn Security",
        "label": "spam",
        "urgent": false,
        "link": "http://linkedin-verify.com"
    },
    {
        "id": "spam_027",
        "from": "claim@irs.gov",
        "to": "user.taxpayer@example.com",
        "subject": "IRS Tax Refund Available",
        "body": "You have a pending IRS refund.\n\nClaim now: http://irs-refund.com\n\nIRS Official",
        "label": "spam",
        "urgent": false,
        "link": "http://irs-refund.com"
    },
    {
        "id": "spam_028",
        "from": "no-reply@paypal.com",
        "to": "user.paypal@example.com",
        "subject": "Update your PayPal billing information",
        "body": "Your PayPal billing info needs an update.\n\nUpdate here: http://paypal-update.com\n\nPayPal Support",
        "label": "spam",
        "urgent": false,
        "link": "http://paypal-update.com"
    },
    {
        "id": "spam_029",
        "from": "support@icloud.com",
        "to": "user.icloud@example.com",
        "subject": "Important: Verify your iCloud account",
        "body": "Verify your iCloud account now to avoid suspension.\n\nVerify at: http://icloud-verify.com\n\nApple Support",
        "label": "spam",
        "urgent": false,
        "link": "http://icloud-verify.com"
    },
    {
        "id": "spam_030",
        "from": "helpdesk@yourbank.com",
        "to": "client.bank@example.com",
        "subject": "Verify suspicious transaction",
        "body": "A suspicious transaction was detected on your account.\n\nPlease verify it here: http://yourbank-secure.com\n\nYour Bank",
        "label": "spam",
        "urgent": false,
        "link": "http://yourbank-secure.com"
    },
    {
        "id": "spam_031",
        "from": "admin@paypal.com",
        "to": "user.paypal@example.com",
        "subject": "Account Activity Notification",
        "body": "Recent account activity detected.\n\nReview at: http://paypal-activity.com\n\nPayPal",
        "label": "spam",
        "urgent": false,
        "link": "http://paypal-activity.com"
    },
    {
        "id": "spam_032",
        "from": "verification@facebook.com",
        "to": "user.facebook@example.com",
        "subject": "Confirm your Facebook account details",
        "body": "Confirm your account details to restore access.\n\nVerify here: http://facebook-confirm.com\n\nFacebook Security",
        "label": "spam",
        "urgent": false,
        "link": "http://facebook-confirm.com"
    },
    {
        "id": "spam_033",
        "from": "service@amazon.com",
        "to": "user.amazon@example.com",
        "subject": "Amazon Payment Failed",
        "body": "Your payment failed. Update your billing info here: http://amazon-payment.com\n\nAmazon Support",
        "label": "spam",
        "urgent": false,
        "link": "http://amazon-payment.com"
    },
    {
        "id": "spam_034",
        "from": "security@google.com",
        "to": "user.google@example.com",
        "subject": "Google Account Security Alert",
        "body": "Suspicious login attempt detected.\n\nSecure your account now: http://google-security.com\n\nGoogle Security Team",
        "label": "spam",
        "urgent": false,
        "link": "http://google-security.com"
    },
    {
        "id": "spam_035",
        "from": "support@twitter.com",
        "to": "user.twitter@example.com",
        "subject": "Action needed: Verify your Twitter account",
        "body": "Your Twitter account requires verification.\n\nVerify now: http://twitter-verify.com\n\nTwitter Support",
        "label": "spam",
        "urgent": false,
        "link": "http://twitter-verify.com"
    },
    {
        "id": "spam_036",
        "from": "alerts@netflix.com",
        "to": "user.netflix@example.com",
        "subject": "Unusual activity found in your Netflix account",
        "body": "We detected unusual activity. Please review your account.\n\nReview: http://netflix-alert.com\n\nNetflix Team",
        "label": "spam",
        "urgent": false,
        "link": "http://netflix-alert.com"
    },
    {
        "id": "spam_037",
        "from": "account@linkedin.com",
        "to": "user.linkedin@example.com",
        "subject": "LinkedIn Account Verification Required",
        "body": "Please verify your account to avoid restrictions.\n\nVerify here: http://linkedin-verify.com\n\nLinkedIn Team",
        "label": "spam",
        "urgent": false,
        "link": "http://linkedin-verify.com"
    },
    {
        "id": "spam_038",
        "from": "support@icloud.com",
        "to": "user.icloud@example.com",
        "subject": "Verify your Apple ID information",
        "body": "To keep your Apple ID active, verify your info here.\n\nVerify: http://apple-verify.com\n\nApple Support",
        "label": "spam",
        "urgent": false,
        "link": "http://apple-verify.com"
    },
    {
        "id": "spam_039",
        "from": "billing@paypal.com",
        "to": "user.paypal@example.com",
        "subject": "Update your billing info",
        "body": "Your billing information is outdated.\n\nUpdate now: http://paypal-billing.com\n\nPayPal",
        "label": "spam",
        "urgent": false,
        "link": "http://paypal-billing.com"
    },
    {
        "id": "spam_040",
        "from": "alert@bankofamerica.com",
        "to": "user.bank@example.com",
        "subject": "Suspicious transaction detected",
        "body": "We've detected a suspicious transaction on your account.\n\nPlease confirm here: http://boa-security.com\n\nBank of America",
        "label": "spam",
        "urgent": false,
        "link": "http://boa-security.com"
    },
    {
        "id": "spam_041",
        "from": "notifications@instagram.com",
        "to": "user.instagram@example.com",
        "subject": "New Login Alert",
        "body": "We noticed a login from a new device.\n\nIf this wasn't you, secure your account here: http://instagram-security.com\n\nInstagram Team",
        "label": "spam",
        "urgent": false,
        "link": "http://instagram-security.com"
    },
    {
        "id": "spam_042",
        "from": "support@slack.com",
        "to": "user.slack@example.com",
        "subject": "Account verification needed",
        "body": "Verify your Slack account to avoid suspension.\n\nVerify: http://slack-verify.com\n\nSlack Support",
        "label": "spam",
        "urgent": false,
        "link": "http://slack-verify.com"
    },
    {
        "id": "spam_043",
        "from": "service@dropbox.com",
        "to": "user.dropbox@example.com",
        "subject": "Dropbox Account Suspension Notice",
        "body": "Your Dropbox account will be suspended unless verified.\n\nVerify now: http://dropbox-verification.com\n\nDropbox Support",
        "label": "spam",
        "urgent": false,
        "link": "http://dropbox-verification.com"
    },
    {
        "id": "spam_044",
        "from": "alerts@paypal.com",
        "to": "user.paypal@example.com",
        "subject": "Unusual activity on your account",
        "body": "We noticed unusual activity on your PayPal account.\n\nReview activity: http://paypal-activity-check.com\n\nPayPal Security",
        "label": "spam",
        "urgent": false,
        "link": "http://paypal-activity-check.com"
    },
    {
        "id": "spam_045",
        "from": "notification@ebay.com",
        "to": "user.ebay@example.com",
        "subject": "Ebay Account Suspicious Login",
        "body": "Suspicious login detected.\n\nSecure your account: http://ebay-security.com\n\nEbay Team",
        "label": "spam",
        "urgent": false,
        "link": "http://ebay-security.com"
    },
    {
        "id": "spam_046",
        "from": "support@github.com",
        "to": "user.github@example.com",
        "subject": "Confirm your GitHub account",
        "body": "Please verify your GitHub account to maintain access.\n\nVerify here: http://github-verify.com\n\nGitHub Support",
        "label": "spam",
        "urgent": false,
        "link": "http://github-verify.com"
    },
    {
        "id": "spam_047",
        "from": "account@airbnb.com",
        "to": "user.airbnb@example.com",
        "subject": "Update your payment information",
        "body": "Your Airbnb payment info needs to be updated.\n\nUpdate now: http://airbnb-payment.com\n\nAirbnb Support",
        "label": "spam",
        "urgent": false,
        "link": "http://airbnb-payment.com"
    },
    {
        "id": "spam_048",
        "from": "notifications@uber.com",
        "to": "user.uber@example.com",
        "subject": "Verify your Uber account",
        "body": "Your Uber account needs verification.\n\nVerify here: http://uber-verify.com\n\nUber Support",
        "label": "spam",
        "urgent": false,
        "link": "http://uber-verify.com"
    },
    {
        "id": "spam_049",
        "from": "service@netflix.com",
        "to": "user.netflix@example.com",
        "subject": "Payment issue detected",
        "body": "There was an issue with your payment method.\n\nUpdate now: http://netflix-payment.com\n\nNetflix Support",
        "label": "spam",
        "urgent": false,
        "link": "http://netflix-payment.com"
    },
    {
        "id": "spam_050",
        "from": "alerts@spotify.com",
        "to": "user.spotify@example.com",
        "subject": "Account login from new device",
        "body": "We detected a login to your Spotify from a new device.\n\nSecure your account here: http://spotify-security.com\n\nSpotify Team",
        "label": "spam",
        "urgent": false,
        "link": "http://spotify-security.com"
    }
]


const addToDatabase = async() => {
    await Email.insertMany(spammails).then(() => { console.log(" mails added to database successfully") }).catch((err) => { console.error(err) });
}

addToDatabase();