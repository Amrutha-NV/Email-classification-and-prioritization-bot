const mongoose = require('mongoose');
const Email = require("./models/emails.js");


main().then(() => { console.log("connnection made successsfully"); })
    .catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/EmailDatabase');
}

const sampleWorkmails = [{
        "id": "int_001",
        "from": "hr@techspark.com",
        "to": "student1@email.com",
        "subject": "Upcoming Internship Orientation",
        "body": "Dear Student,\n\nWe are pleased to inform you that your internship orientation is scheduled for September 15th at 10:00 AM in our main office conference hall. During this session, we will introduce you to the team, review program expectations, and provide important information regarding your project allocations.\n\nPlease ensure you carry a valid ID card and your acceptance letter for verification. Light refreshments will be served.\n\nWe look forward to welcoming you onboard.\n\nBest regards,\nHR Team\nTechSpark",
        "label": "work",
        "urgent": false,
        "link": null
    },
    {
        "id": "int_002",
        "from": "mentorship@greenenergy.org",
        "to": "student2@email.com",
        "subject": "Internship Project Allocation: Renewable Energy Data",
        "body": "Dear Intern,\n\nCongratulations on being selected for the Renewable Energy Data Analysis project. This project will involve collecting data, performing statistical analysis, and presenting insights on energy efficiency.\n\nWe will schedule a detailed scope discussion tomorrow at 3:00 PM. Please be prepared with your laptop and any prior research on renewable energy metrics.\n\nKind regards,\nMentorship Coordinator\nGreenEnergy",
        "label": "work",
        "urgent": true,
        "link": null
    },
    {
        "id": "int_003",
        "from": "internship@fintechlabs.io",
        "to": "student3@email.com",
        "subject": "Onboarding Instructions and Stipend Details",
        "body": "Dear Intern,\n\nWelcome to FinTech Labs! We are glad to have you join our team starting next week. As part of your internship, you will receive a monthly stipend of $300, credited directly to your bank account at the end of each month.\n\nPlease log into the onboarding portal to upload necessary documents including ID proof, educational certificates, and bank details by Friday.\n\nPortal Link: https://onboarding.fintechlabs.io\n\nWe look forward to working with you.\n\nBest,\nHR Team\nFinTech Labs",
        "label": "work",
        "urgent": false,
        "link": "https://onboarding.fintechlabs.io"
    },
    {
        "id": "int_004",
        "from": "recruitment@healtheasy.com",
        "to": "student4@email.com",
        "subject": "Internship Assignment Submission",
        "body": "Dear Intern,\n\nPlease submit your weekly task report by Friday 6 PM to stay on track with the internship evaluation. Timely submissions ensure smooth tracking of your progress and feedback.\n\nIf you encounter any difficulties, do not hesitate to reach out to your mentor.\n\nWishing you success in your internship.\n\nRegards,\nRecruitment Team\nHealthEasy",
        "label": "work",
        "urgent": true,
        "link": null
    },
    {
        "id": "int_005",
        "from": "talent@codesprint.in",
        "to": "student5@email.com",
        "subject": "Confirmation of Summer Internship",
        "body": "Dear Student,\n\nWe’re excited to confirm your internship commencement on June 1. Please review the attached welcome packet and training materials.\n\nShould you have any questions before your start date, feel free to contact us.\n\nWelcome aboard!\n\nBest regards,\nTalent Acquisition\nCodeSprint",
        "label": "work",
        "urgent": false,
        "link": null
    },
    {
        "id": "int_006",
        "from": "mentor@ai-startup.com",
        "to": "student6@email.com",
        "subject": "Weekly Check-In",
        "body": "Dear Intern,\n\nReminder: Weekly sync-up call with your mentor is scheduled for tomorrow at 11 AM. Please be ready with progress updates and any questions.\n\nThese check-ins are vital for your growth and to ensure project alignment.\n\nLooking forward to speaking with you.\n\nBest,\nAI Startup Mentoring Team",
        "label": "work",
        "urgent": true,
        "link": null
    },
    {
        "id": "int_007",
        "from": "interns@marketinsights.com",
        "to": "student7@email.com",
        "subject": "Internship Offer Letter",
        "body": "Dear Candidate,\n\nPlease find attached your internship offer letter for Market Insights. Kindly acknowledge receipt by replying to this email.\n\nWe are eager to have you join our team.\n\nWarm regards,\nInternship Coordination Team\nMarket Insights",
        "label": "work",
        "urgent": false,
        "link": "https://docs.marketinsights.com/offer-letter"
    },
    {
        "id": "int_008",
        "from": "campus@designhub.io",
        "to": "student8@email.com",
        "subject": "Design Internship: Task Guidelines",
        "body": "Dear Intern,\n\nThe first set of design tasks will be shared by EOD. Ensure you set up your Figma account before the submission deadline.\n\nPlease reach out if you need access or any tool assistance.\n\nRegards,\nDesign Hub Internship Team",
        "label": "work",
        "urgent": true,
        "link": null
    },
    {
        "id": "int_009",
        "from": "hr@blockchainlabs.org",
        "to": "student9@email.com",
        "subject": "Internship Policy Handbook",
        "body": "Dear Intern,\n\nPlease review the attached internship policy handbook carefully before your first working day to be familiar with guidelines.\n\nContact HR for any clarifications.\n\nBest regards,\nHR Department\nBlockchain Labs",
        "label": "work",
        "urgent": false,
        "link": null
    },
    {
        "id": "int_010",
        "from": "interns@agritech.com",
        "to": "student10@email.com",
        "subject": "Evaluation of Internship Performance",
        "body": "Dear Intern,\n\nYour mid-term evaluation will be held next week. Please schedule a slot with the HR team by replying to this email.\n\nPreparation and documentation of your work will be valuable for this review.\n\nBest wishes,\nAgritech Internship Coordination",
        "label": "work",
        "urgent": true,
        "link": "https://scheduler.agritech.com"
    },
    {
        "id": "int_011",
        "from": "hr@innovatech.com",
        "to": "student11@email.com",
        "subject": "Internship Onboarding Schedule",
        "body": "Dear Student,\n\nYour onboarding for the Innovatech summer internship is scheduled for August 20th at 9:00 AM. The session will cover company policies, introduction to teams, and safety protocols.\n\nPlease ensure you complete the pre-onboarding forms sent earlier.\n\nLooking forward to seeing you.\n\nRegards,\nHR Team\nInnovatech",
        "label": "work",
        "urgent": false,
        "link": null
    },
    {
        "id": "int_012",
        "from": "mentor@cleantech.org",
        "to": "student12@email.com",
        "subject": "Project Kickoff Meeting",
        "body": "Dear Intern,\n\nThe kickoff meeting for your project on sustainable energy is scheduled for September 1st at 2:00 PM online via Microsoft Teams.\n\nPlease confirm your availability and prepare any questions regarding project objectives.\n\nKind regards,\nMentorship Team\nCleanTech",
        "label": "work",
        "urgent": true,
        "link": null
    },
    {
        "id": "int_013",
        "from": "recruitment@medtech.io",
        "to": "student13@email.com",
        "subject": "Stipend Payment Schedule",
        "body": "Dear Intern,\n\nThis is to inform you that your monthly stipend will be credited by the 5th of each month.\n\nEnsure your bank account details are updated in the portal to avoid payment delays.\n\nBest regards,\nFinance Team\nMedTech",
        "label": "work",
        "urgent": false,
        "link": null
    },
    {
        "id": "int_014",
        "from": "hr@cybercorp.com",
        "to": "student14@email.com",
        "subject": "Training Session Invitation",
        "body": "Dear Trainee,\n\nYou are invited to participate in the cybersecurity training session scheduled for September 10th at 3:00 PM.\n\nThis hands-on session will cover essential security protocols and threat management.\n\nPlease confirm your attendance.\n\nRegards,\nHR Team\nCyberCorp",
        "label": "work",
        "urgent": true,
        "link": null
    },
    {
        "id": "int_015",
        "from": "internship@fintechlabs.io",
        "to": "student15@email.com",
        "subject": "Weekly Progress Report Reminder",
        "body": "Dear Intern,\n\nPlease submit your weekly progress report by Friday 5:00 PM. Reports help us track your contributions and provide timely feedback.\n\nReach out if you need assistance.\n\nBest,\nMentor Team\nFinTech Labs",
        "label": "work",
        "urgent": true,
        "link": null
    },
    {
        "id": "int_016",
        "from": "communications@socialmedia.co",
        "to": "student16@email.com",
        "subject": "Social Media Internship Guidelines",
        "body": "Dear Intern,\n\nPlease review the attached Social Media Internship Guidelines document. It outlines expectations regarding content creation, posting schedules, and engagement policies.\n\nContact your mentor for any clarifications.\n\nBest regards,\nCommunications Team\nSocialMedia Co.",
        "label": "work",
        "urgent": false,
        "link": null
    },
    {
        "id": "int_017",
        "from": "hr@edutech.io",
        "to": "student17@email.com",
        "subject": "Internship Completion Certificate Process",
        "body": "Dear Intern,\n\nTo receive your internship completion certificate, please ensure all assignments and evaluations are submitted by the last day.\n\nCertificates will be emailed within 2 weeks of internship completion.\n\nThank you for your dedication.\n\nWarm regards,\nHR Team\nEduTech",
        "label": "work",
        "urgent": false,
        "link": null
    },
    {
        "id": "int_018",
        "from": "mentor@roboticslab.com",
        "to": "student18@email.com",
        "subject": "Mid-Internship Feedback Session",
        "body": "Dear Intern,\n\nYour mid-internship feedback session is scheduled for September 18th at 4:00 PM. Please prepare a brief presentation on your progress.\n\nYour input is valuable for your continued growth.\n\nRegards,\nMentorship Team\nRobotics Lab",
        "label": "work",
        "urgent": true,
        "link": null
    },
    {
        "id": "int_019",
        "from": "hr@musicfest.com",
        "to": "student19@email.com",
        "subject": "Event Internship Details",
        "body": "Dear Intern,\n\nThank you for joining the MusicFest Internship Program. Please report to the main event grounds by September 5th at 8:00 AM.\n\nDress code and other instructions are attached.\n\nWe look forward to your valuable contribution.\n\nBest,\nHR Team\nMusicFest",
        "label": "work",
        "urgent": false,
        "link": null
    },
    {
        "id": "int_020",
        "from": "hr@healthcare.org",
        "to": "student20@email.com",
        "subject": "Health and Safety Compliance Reminder",
        "body": "Dear Intern,\n\nRemember to complete the health and safety training module before your first day.\n\nCertificates will be required for onsite access.\n\nStay safe,\nHealth & Safety Team\nHealthcare Org",
        "label": "work",
        "urgent": true,
        "link": null
    },
    {
        "id": "int_021",
        "from": "hr@techspark.com",
        "to": "student21@email.com",
        "subject": "Internship End Date and Next Steps",
        "body": "Dear Student,\n\nYour internship with TechSpark will conclude on September 30th. Please submit your final report and attend the exit interview scheduled for October 2nd.\n\nThank you for your contributions.\n\nRegards,\nHR Team\nTechSpark",
        "label": "work",
        "urgent": false,
        "link": null
    },
    {
        "id": "int_022",
        "from": "mentorship@greenenergy.org",
        "to": "student22@email.com",
        "subject": "Project Update Required",
        "body": "Dear Intern,\n\nPlease provide an update on your Renewable Energy Data project by September 17th.\n\nReport any challenges to your mentor for support.\n\nKind regards,\nMentorship Coordinator\nGreenEnergy",
        "label": "work",
        "urgent": true,
        "link": null
    },
    {
        "id": "int_023",
        "from": "internship@fintechlabs.io",
        "to": "student23@email.com",
        "subject": "Internship Policy Update",
        "body": "Dear Intern,\n\nPlease review the updated internship policies posted on the portal. These changes take effect immediately.\n\nContact HR if you have questions.\n\nBest regards,\nHR Team\nFinTech Labs",
        "label": "work",
        "urgent": false,
        "link": null
    },
    {
        "id": "int_024",
        "from": "recruitment@healtheasy.com",
        "to": "student24@email.com",
        "subject": "Internship Attendance Reminder",
        "body": "Dear Intern,\n\nConsistent attendance is critical for successful internship completion. Please ensure punctuality and notify us in advance for any absences.\n\nThank you for your cooperation.\n\nRegards,\nRecruitment Team\nHealthEasy",
        "label": "work",
        "urgent": true,
        "link": null
    },
    {
        "id": "int_025",
        "from": "talent@codesprint.in",
        "to": "student25@email.com",
        "subject": "Networking Event Invitation",
        "body": "Dear Intern,\n\nYou are invited to our upcoming virtual networking event on September 25th at 6:00 PM. This is a great opportunity to connect with industry professionals and peers.\n\nRSVP by September 20th.\n\nBest regards,\nTalent Team\nCodeSprint",
        "label": "work",
        "urgent": false,
        "link": null
    },
    {
        "id": "int_026",
        "from": "mentor@ai-startup.com",
        "to": "student26@email.com",
        "subject": "New Project Assignment",
        "body": "Dear Intern,\n\nYou have been assigned a new project on AI-based image recognition. A kickoff meeting is scheduled for September 22nd at 10:00 AM.\n\nPlease prepare by reviewing related material.\n\nBest,\nMentor Team\nAI Startup",
        "label": "work",
        "urgent": true,
        "link": null
    },
    {
        "id": "int_027",
        "from": "interns@marketinsights.com",
        "to": "student27@email.com",
        "subject": "Mid-Term Feedback Form",
        "body": "Dear Intern,\n\nPlease fill out the mid-term feedback form sent to your email. Your responses help us improve the internship program.\n\nDeadline to submit: September 18th.\n\nThank you.\n\nWarm regards,\nInternship Coordination\nMarket Insights",
        "label": "work",
        "urgent": false,
        "link": null
    },
    {
        "id": "int_028",
        "from": "campus@designhub.io",
        "to": "student28@email.com",
        "subject": "Design Project Presentation Date",
        "body": "Dear Intern,\n\nYour design project presentation is scheduled for September 30th at 11:00 AM.\n\nPrepare your slides and practice your pitch.\n\nBest,\nDesign Hub Team",
        "label": "work",
        "urgent": true,
        "link": null
    },
    {
        "id": "int_029",
        "from": "hr@blockchainlabs.org",
        "to": "student29@email.com",
        "subject": "End of Internship Survey",
        "body": "Dear Intern,\n\nAs your internship nears completion, please complete the internship experience survey.\n\nYour feedback is valuable for future programming.\n\nThank you.\n\nRegards,\nHR Department\nBlockchain Labs",
        "label": "work",
        "urgent": false,
        "link": null
    },
    {
        "id": "int_030",
        "from": "interns@agritech.com",
        "to": "student30@email.com",
        "subject": "Final Internship Report Submission",
        "body": "Dear Intern,\n\nPlease submit your final internship report by October 5th.\n\nLate submissions may affect your certification.\n\nBest wishes,\nAgritech Internship Team",
        "label": "work",
        "urgent": true,
        "link": null
    },
    {
        "id": "dl_001",
        "from": "prof.jones@university.edu",
        "to": "student31@email.com",
        "subject": "Reminder: Final Project Submission Deadline",
        "body": "Dear Student,\n\nThis is a reminder that your final project for the course is due on September 20th by 11:59 PM. Please ensure your submission includes all required deliverables: code files, documentation, and presentation slides.\n\nLate submissions will only be accepted with prior approval and may incur penalties.\n\nBest regards,\nProf. Jones",
        "label": "work",
        "urgent": true,
        "link": null
    },
    {
        "id": "dl_002",
        "from": "ta.physics@university.edu",
        "to": "student32@email.com",
        "subject": "Upcoming Lab Report Deadline",
        "body": "Dear Student,\n\nThe Physics Lab Report on the recent experiment is due by September 18th at 11:59 PM. Please upload your report as a PDF to the course portal.\n\nIf you require any additional data or assistance, feel free to contact me.\n\nRegards,\nPhysics TA",
        "label": "work",
        "urgent": false,
        "link": null
    },
    {
        "id": "dl_003",
        "from": "coursecoordinator@onlineplatform.org",
        "to": "student33@email.com",
        "subject": "Assignment 4 Submission Link and Deadline",
        "body": "Dear Student,\n\nYour Assignment 4 on data structures must be submitted by September 21st, 11:59 PM, using the submission portal link below.\n\nSubmission Link: https://courses.onlineplatform.org/submit/assignment4\n\nPlease review the assignment rubric for grading criteria.\n\nBest,\nCourse Coordinator",
        "label": "work",
        "urgent": true,
        "link": "https://courses.onlineplatform.org/submit/assignment4"
    },
    {
        "id": "dl_004",
        "from": "prof.kim@university.edu",
        "to": "student34@email.com",
        "subject": "Thesis Proposal Submission Reminder",
        "body": "Dear Student,\n\nPlease remember to submit your thesis proposal by September 25th. Proposals must include an abstract, objectives, and proposed methodology.\n\nFor any questions, contact me during office hours.\n\nSincerely,\nProf. Kim",
        "label": "work",
        "urgent": true,
        "link": null
    },
    {
        "id": "dl_005",
        "from": "ta.math101@university.edu",
        "to": "student35@email.com",
        "subject": "Homework 3 Deadline Extended",
        "body": "Dear Students,\n\nDue to unforeseen circumstances, the deadline for Homework 3 is extended to September 22nd, 11:59 PM.\n\nPlease submit on time to avoid penalties.\n\nRegards,\nTA Math 101",
        "label": "work",
        "urgent": false,
        "link": null
    },
    {
        "id": "dl_006",
        "from": "csdept@university.edu",
        "to": "student36@email.com",
        "subject": "Project Milestone 1 Submission",
        "body": "Dear Student,\n\nThe first milestone for your software engineering project is due next Friday, September 19th.\n\nPlease ensure you submit your code repository URL and progress report by then.\n\nBest,\nCS Department",
        "label": "work",
        "urgent": true,
        "link": null
    },
    {
        "id": "dl_007",
        "from": "prof.brown@university.edu",
        "to": "student37@email.com",
        "subject": "Midterm Paper Submission Deadline",
        "body": "Dear Student,\n\nYour midterm paper on Environmental Science must be submitted by September 21st, 11:59 PM.\n\nLate papers will not be accepted without prior permission.\n\nSincerely,\nProf. Brown",
        "label": "work",
        "urgent": true,
        "link": null
    },
    {
        "id": "dl_008",
        "from": "labsupport@university.edu",
        "to": "student38@email.com",
        "subject": "Lab Assignment Submission Reminder",
        "body": "Dear Student,\n\nPlease submit your chemistry lab assignment by September 20th, 5:00 PM.\n\nEnsure your report follows the template provided.\n\nThank you,\nLab Support Team",
        "label": "work",
        "urgent": false,
        "link": null
    },
    {
        "id": "dl_009",
        "from": "ta.econ@university.edu",
        "to": "student39@email.com",
        "subject": "Economic Research Paper Due Date",
        "body": "Dear Students,\n\nThe due date for the economic research paper is September 23rd.\n\nPlease submit your papers through the online portal.\n\nRegards,\nTA Economics",
        "label": "work",
        "urgent": true,
        "link": null
    },
    {
        "id": "dl_010",
        "from": "prof.williams@university.edu",
        "to": "student40@email.com",
        "subject": "Project Presentation Date Reminder",
        "body": "Dear Student,\n\nYour project presentation is scheduled for September 30th.\n\nPlease make sure your slides and reports are ready ahead of time.\n\nBest,\nProf. Williams",
        "label": "work",
        "urgent": false,
        "link": null
    },
    {
        "id": "dl_011",
        "from": "courseassistant@university.edu",
        "to": "student41@email.com",
        "subject": "Assignment 5 Submission Guidelines",
        "body": "Dear Student,\n\nAssignment 5 on database systems is due by October 1st.\n\nSubmit your work in the designated course portal.\n\nPlease adhere to the coding standards provided.\n\nBest regards,\nCourse Assistant",
        "label": "work",
        "urgent": true,
        "link": null
    },
    {
        "id": "dl_012",
        "from": "prof.miller@university.edu",
        "to": "student42@email.com",
        "subject": "Reminder: Research Proposal Due Date",
        "body": "Dear Student,\n\nYour research proposal draft is due by September 28th.\n\nPlease send it to me for initial feedback.\n\nSincerely,\nProf. Miller",
        "label": "work",
        "urgent": true,
        "link": null
    },
    {
        "id": "dl_013",
        "from": "ta.cs@university.edu",
        "to": "student43@email.com",
        "subject": "Programming Assignment Deadline",
        "body": "Dear Student,\n\nThe programming assignment on algorithms is due September 25th, 11:59 PM.\n\nUpload your code to the GitHub repository linked on the course page.\n\nRegards,\nTA CS Dept",
        "label": "work",
        "urgent": true,
        "link": null
    },
    {
        "id": "dl_014",
        "from": "prof.anderson@university.edu",
        "to": "student44@email.com",
        "subject": "Final Thesis Submission Deadline",
        "body": "Dear Student,\n\nPlease submit your final thesis document by October 10th.\n\nAdhere to formatting guidelines provided in the student handbook.\n\nBest wishes,\nProf. Anderson",
        "label": "work",
        "urgent": true,
        "link": null
    },
    {
        "id": "dl_015",
        "from": "coursecoordinator@university.edu",
        "to": "student45@email.com",
        "subject": "Extension of Project Submission Deadline",
        "body": "Dear Student,\n\nDue to recent disruptions, the project submission deadline has been extended to October 5th.\n\nPlease utilize this extra time to improve your submission.\n\nRegards,\nCourse Coordinator",
        "label": "work",
        "urgent": false,
        "link": null
    },
    {
        "id": "dl_016",
        "from": "prof.roberts@university.edu",
        "to": "student46@email.com",
        "subject": "Mid-semester Exam Paper Submission",
        "body": "Dear Student,\n\nYour mid-semester exam paper must be submitted by September 27th.\n\nLate submissions will require special approval.\n\nRegards,\nProf. Roberts",
        "label": "work",
        "urgent": true,
        "link": null
    },
    {
        "id": "dl_017",
        "from": "ta.chem@university.edu",
        "to": "student47@email.com",
        "subject": "Chemical Analysis Report Deadline",
        "body": "Dear Student,\n\nThe deadline to submit your chemical analysis report is October 2nd, 4:00 PM.\n\nPlease ensure your data tables and charts are included.\n\nThank you,\nTA Chemistry",
        "label": "work",
        "urgent": true,
        "link": null
    },
    {
        "id": "dl_018",
        "from": "prof.green@university.edu",
        "to": "student48@email.com",
        "subject": "Research Paper Presentation Date",
        "body": "Dear Student,\n\nYour research paper presentation is scheduled for October 8th.\n\nPrepare a 15-minute presentation summarizing your key findings.\n\nBest regards,\nProf. Green",
        "label": "work",
        "urgent": false,
        "link": null
    },
    {
        "id": "dl_019",
        "from": "courseassistant@university.edu",
        "to": "student49@email.com",
        "subject": "Assignment on Data Mining Due Soon",
        "body": "Dear Student,\n\nReminder to submit your data mining assignment by October 3rd.\n\nPlease follow the submission guidelines closely.\n\nBest,\nCourse Assistant",
        "label": "work",
        "urgent": false,
        "link": null
    },
    {
        "id": "dl_020",
        "from": "ta.history@university.edu",
        "to": "student50@email.com",
        "subject": "History Essay Submission Deadline",
        "body": "Dear Student,\n\nYour history essay is due October 7th.\n\nEnsure your citations follow the recommended style.\n\nRegards,\nTA History",
        "label": "work",
        "urgent": true,
        "link": null
    },
    {
        "id": "dl_021",
        "from": "prof.morris@university.edu",
        "to": "student51@email.com",
        "subject": "Final Exam Paper Submission Reminder",
        "body": "Dear Student,\n\nThe final exam paper must be submitted by October 12th.\n\nLate submissions are subject to penalties.\n\nSincerely,\nProf. Morris",
        "label": "work",
        "urgent": true,
        "link": null
    },
    {
        "id": "dl_022",
        "from": "coursecoordinator@university.edu",
        "to": "student52@email.com",
        "subject": "Project Draft Deadline",
        "body": "Dear Student,\n\nPlease submit your project draft by October 1st for review.\n\nContact me if you need help.\n\nThank you,\nCourse Coordinator",
        "label": "work",
        "urgent": false,
        "link": null
    },
    {
        "id": "dl_023",
        "from": "ta.physics@university.edu",
        "to": "student53@email.com",
        "subject": "Physics Problem Set Due",
        "body": "Dear Student,\n\nYour problem set for Physics 202 is due September 29th.\n\nPlease submit via the course website.\n\nBest,\nTA Physics",
        "label": "work",
        "urgent": false,
        "link": null
    },
    {
        "id": "dl_024",
        "from": "prof.jones@university.edu",
        "to": "student54@email.com",
        "subject": "Reminder: Research Paper Abstract Due",
        "body": "Dear Student,\n\nThe abstract for your research paper must be submitted by September 30th.\n\nPlease adhere to the guidelines.\n\nSincerely,\nProf. Jones",
        "label": "work",
        "urgent": true,
        "link": null
    },
    {
        "id": "dl_025",
        "from": "ta.water@university.edu",
        "to": "student55@email.com",
        "subject": "Water Quality Report Submission",
        "body": "Dear Student,\n\nPlease submit your water quality report by October 4th.\n\nContact me for any clarifications.\n\nRegards,\nTA Water Resources",
        "label": "work",
        "urgent": false,
        "link": null
    },
    {
        "id": "dl_026",
        "from": "prof.lewis@university.edu",
        "to": "student56@email.com",
        "subject": "Paper on Advanced Chemistry Due",
        "body": "Dear Student,\n\nYour paper on Advanced Chemistry is due October 6th.\n\nEnsure proper formatting and citations.\n\nBest regards,\nProf. Lewis",
        "label": "work",
        "urgent": true,
        "link": null
    },
    {
        "id": "dl_027",
        "from": "courseassistant@university.edu",
        "to": "student57@email.com",
        "subject": "Final Project Submission Instructions",
        "body": "Dear Student,\n\nPlease follow the submission instructions attached for your final project due October 10th.\n\nReach out if you encounter issues.\n\nBest,\nCourse Assistant",
        "label": "work",
        "urgent": true,
        "link": null
    },
    {
        "id": "dl_028",
        "from": "prof.wilson@university.edu",
        "to": "student58@email.com",
        "subject": "Essay Submission Reminder",
        "body": "Dear Student,\n\nYour essay on Literature must be submitted by October 3rd.\n\nLate submissions will incur penalties.\n\nSincerely,\nProf. Wilson",
        "label": "work",
        "urgent": true,
        "link": null
    },
    {
        "id": "dl_029",
        "from": "ta.bio@university.edu",
        "to": "student59@email.com",
        "subject": "Biology Lab Report Due Date",
        "body": "Dear Student,\n\nPlease submit your Biology lab report by October 7th.\n\nMake sure to include data analysis sections.\n\nRegards,\nTA Biology",
        "label": "work",
        "urgent": false,
        "link": null
    },
    {
        "id": "dl_030",
        "from": "prof.martin@university.edu",
        "to": "student60@email.com",
        "subject": "Capstone Project Final Submission",
        "body": "Dear Student,\n\nYour capstone project is due October 15th. Please submit all components including your code repository and final report.\n\nBest wishes,\nProf. Martin",
        "label": "work",
        "urgent": true,
        "link": null
    },
    {
        "id": "meet_001",
        "from": "hr@digitalmarketing.co",
        "to": "student61@email.com",
        "subject": "Interview Scheduled: Digital Marketing Internship",
        "body": "Dear Applicant,\n\nYour interview for the Digital Marketing Intern role has been scheduled for September 11th at 10:00 AM via Google Meet. The discussion will last approximately 30 minutes and will cover your previous projects, internship expectations, and marketing case scenarios.\n\nPlease confirm your availability by replying to this email. We recommend testing the meeting link and having a stable internet connection ahead of time.\n\nWe look forward to speaking with you.\n\nKind regards,\nRecruitment Team\nDigitalMarketing Co.",
        "label": "work",
        "urgent": true,
        "link": "https://meet.google.com/interview123"
    },
    {
        "id": "meet_002",
        "from": "calendar@zoom.us",
        "to": "student62@email.com",
        "subject": "Team Sync-up Call Reminder",
        "body": "Dear Team Member,\n\nThis is a reminder that the weekly team sync-up call is scheduled for today at 3:30 PM. We will review project progress, blockers, and assign new tasks.\n\nMeeting Link: https://zoom.us/meeting123\n\nPlease join 5 minutes earlier to test connectivity.\n\nBest,\nProject Manager",
        "label": "work",
        "urgent": false,
        "link": "https://zoom.us/meeting123"
    },
    {
        "id": "meet_003",
        "from": "faculty@university.edu",
        "to": "student63@email.com",
        "subject": "Project Review Meeting Scheduled",
        "body": "Dear Student,\n\nYour project review meeting with the faculty panel is scheduled for tomorrow at 2:00 PM in Room 203. Please come prepared with your updated project presentation slides and supporting documentation.\n\nEnsure you also bring a printed copy for submission.\n\nBest regards,\nFaculty Coordinator",
        "label": "work",
        "urgent": true,
        "link": null
    },
    {
        "id": "meet_004",
        "from": "hr@itcompany.com",
        "to": "student64@email.com",
        "subject": "Technical Interview Confirmation",
        "body": "Dear Candidate,\n\nYour technical interview for the Software Developer Internship position is confirmed on September 14th at 11:00 AM via Microsoft Teams.\n\nPlease ensure your environment is set up for a screen sharing session.\n\nLooking forward to your participation.\n\nKind regards,\nHR Team\nIT Company",
        "label": "work",
        "urgent": true,
        "link": "https://teams.microsoft.com/l/meetup-join/meetingid"
    },
    {
        "id": "meet_005",
        "from": "recruitment@fintech.com",
        "to": "student65@email.com",
        "subject": "Interview Schedule Reminder",
        "body": "Dear Applicant,\n\nThis is a reminder for your interview scheduled on September 17th at 9:00 AM for the FinTech Analyst role.\n\nPlease join the Zoom meeting 10 minutes early.\n\nZoom Link: https://zoom.us/fintech/interview\n\nBest regards,\nRecruitment Team\nFinTech",
        "label": "work",
        "urgent": true,
        "link": "https://zoom.us/fintech/interview"
    },
    {
        "id": "meet_006",
        "from": "faculty@university.edu",
        "to": "student66@email.com",
        "subject": "Research Group Meeting Reminder",
        "body": "Dear Research Team,\n\nOur weekly research group meeting is scheduled for September 18th at 4:00 PM in Room 112.\n\nPlease bring your current progress documents.\n\nBest,\nFaculty Advisor",
        "label": "work",
        "urgent": false,
        "link": null
    },
    {
        "id": "meet_007",
        "from": "hr@startup.com",
        "to": "student67@email.com",
        "subject": "Final Interview Invitation",
        "body": "Dear Candidate,\n\nYou are invited to the final round of interviews for the Startup Engineering Internship on September 19th at 2:00 PM via Google Meet.\n\nPlease prepare to discuss your previous projects and coding challenges.\n\nLink: https://meet.google.com/startup-interview\n\nRegards,\nHR Team\nStartup",
        "label": "work",
        "urgent": true,
        "link": "https://meet.google.com/startup-interview"
    },
    {
        "id": "meet_008",
        "from": "calendar@corporate.com",
        "to": "student68@email.com",
        "subject": "Client Meeting Scheduled",
        "body": "Dear Team,\n\nA client meeting is scheduled for September 20th at 10:30 AM. We will discuss the project deliverables and timelines.\n\nMeeting link: https://corporate.com/meetings/client\n\nPlease prepare reports ahead of time.\n\nThanks,\nProject Manager",
        "label": "work",
        "urgent": false,
        "link": "https://corporate.com/meetings/client"
    },
    {
        "id": "meet_009",
        "from": "hr@designfirm.com",
        "to": "student69@email.com",
        "subject": "Portfolio Review Meeting",
        "body": "Dear Intern,\n\nYour portfolio review is scheduled for September 21st at 3:00 PM.\n\nEnsure your design portfolio is updated and ready for discussion.\n\nBest regards,\nHR Team\nDesign Firm",
        "label": "work",
        "urgent": true,
        "link": null
    },
    {
        "id": "meet_010",
        "from": "faculty@university.edu",
        "to": "student70@email.com",
        "subject": "Advisory Session Reminder",
        "body": "Dear Student,\n\nThis is a reminder for your advisory session on September 22nd at 1:00 PM in the faculty office.\n\nPlease bring your draft report and questions.\n\nBest,\nFaculty Advisor",
        "label": "work",
        "urgent": false,
        "link": null
    },
    {
        "id": "meet_011",
        "from": "hr@marketinginc.com",
        "to": "student71@email.com",
        "subject": "Interview Follow-up Meeting Scheduled",
        "body": "Dear Candidate,\n\nFollowing your recent interview, a follow-up meeting is scheduled on September 24th at 11:00 AM to discuss next steps.\n\nPlease confirm your availability.\n\nBest regards,\nHR Team\nMarketing Inc.",
        "label": "work",
        "urgent": true,
        "link": null
    },
    {
        "id": "meet_012",
        "from": "calendar@tech.com",
        "to": "student72@email.com",
        "subject": "Team Meeting Reminder",
        "body": "Dear Team,\n\nOur regular weekly team meeting will take place on September 25th at 9:30 AM.\n\nAgenda will be shared prior.\n\nBest,\nTeam Lead",
        "label": "work",
        "urgent": false,
        "link": null
    },
    {
        "id": "meet_013",
        "from": "hr@logistics.com",
        "to": "student73@email.com",
        "subject": "Interview Scheduling Confirmation",
        "body": "Dear Applicant,\n\nYour interview for Logistics Coordinator internship is confirmed for September 27th at 10:00 AM.\n\nPlease prepare your resume and references.\n\nRegards,\nHR Team\nLogistics Co.",
        "label": "work",
        "urgent": true,
        "link": null
    },
    {
        "id": "meet_014",
        "from": "faculty@university.edu",
        "to": "student74@email.com",
        "subject": "Research Presentation Reminder",
        "body": "Dear Student,\n\nYou are scheduled to present your research on September 28th at 11:00 AM.\n\nPlease be prepared with your slides.\n\nBest,\nFaculty Coordinator",
        "label": "work",
        "urgent": false,
        "link": null
    },
    {
        "id": "meet_015",
        "from": "hr@financegroup.com",
        "to": "student75@email.com",
        "subject": "Finance Internship Interview Reminder",
        "body": "Dear Applicant,\n\nThis is a reminder for your interview scheduled on September 29th at 2:00 PM.\n\nPlease join using the link below.\n\nLink: https://financegroup.com/interviews\n\nBest regards,\nHR Team\nFinance Group",
        "label": "work",
        "urgent": true,
        "link": "https://financegroup.com/interviews"
    },
    {
        "id": "meet_016",
        "from": "calendar@healthcare.com",
        "to": "student76@email.com",
        "subject": "Weekly Meeting Notice",
        "body": "Dear Team,\n\nOur weekly meeting is scheduled for September 30th at 3:00 PM.\n\nPlease be prepared with your updates.\n\nThanks,\nProject Manager",
        "label": "work",
        "urgent": false,
        "link": null
    },
    {
        "id": "meet_017",
        "from": "hr@techlabs.com",
        "to": "student77@email.com",
        "subject": "Follow-up Interview Invitation",
        "body": "Dear Candidate,\n\nYou have been shortlisted for a follow-up interview on October 1st at 11:00 AM.\n\nPlease confirm your availability.\n\nRegards,\nHR Team\nTechLabs",
        "label": "work",
        "urgent": true,
        "link": null
    },
    {
        "id": "meet_018",
        "from": "faculty@university.edu",
        "to": "student78@email.com",
        "subject": "Capstone Project Advisory Meeting",
        "body": "Dear Student,\n\nYour capstone advisory meeting is scheduled for October 2nd at 10:00 AM.\n\nPlease bring your project documentation.\n\nBest regards,\nFaculty Advisor",
        "label": "work",
        "urgent": false,
        "link": null
    },
    {
        "id": "meet_019",
        "from": "hr@mediahouse.com",
        "to": "student79@email.com",
        "subject": "Media Internship Interview Scheduled",
        "body": "Dear Applicant,\n\nYour interview for the Media Internship position is scheduled on October 3rd at 4:00 PM via Zoom.\n\nPlease prepare a portfolio and be ready for discussion.\n\nBest,\nHR Team\nMedia House",
        "label": "work",
        "urgent": true,
        "link": "https://zoom.us/mediahouse-interview"
    },
    {
        "id": "meet_020",
        "from": "calendar@university.edu",
        "to": "student80@email.com",
        "subject": "Departmental Meeting Reminder",
        "body": "Dear Department Members,\n\nOur next departmental meeting is on October 5th at 2:00 PM in Room 101.\n\nPlease prepare agenda items ahead.\n\nRegards,\nDepartment Chair",
        "label": "work",
        "urgent": false,
        "link": null
    },
    {
        "id": "meet_021",
        "from": "hr@consultancy.com",
        "to": "student81@email.com",
        "subject": "Consultancy Project Kickoff Meeting",
        "body": "Dear Team,\n\nThe kickoff meeting for the consultancy project is scheduled for October 6th, 10:00 AM.\n\nPlease attend punctually.\n\nBest,\nProject Lead",
        "label": "work",
        "urgent": false,
        "link": null
    },
    {
        "id": "meet_022",
        "from": "faculty@college.edu",
        "to": "student82@email.com",
        "subject": "Guest Lecture Reminder",
        "body": "Dear Students,\n\nA guest lecture on emerging technologies will be held on October 7th at 11:00 AM.\n\nAttendance is mandatory.\n\nBest regards,\nFaculty Coordinator",
        "label": "work",
        "urgent": false,
        "link": null
    },
    {
        "id": "meet_023",
        "from": "hr@startup.com",
        "to": "student83@email.com",
        "subject": "Internship Feedback Session",
        "body": "Dear Intern,\n\nYour feedback session is scheduled for October 8th at 2:00 PM.\n\nPlease prepare to discuss your experience and challenges.\n\nRegards,\nHR Team\nStartup",
        "label": "work",
        "urgent": true,
        "link": null
    },
    {
        "id": "meet_024",
        "from": "calendar@university.edu",
        "to": "student84@email.com",
        "subject": "Project Coordination Meeting",
        "body": "Dear Team,\n\nPlease attend the project coordination meeting on October 9th at 3:00 PM.\n\nAgenda will be circulated prior.\n\nBest,\nProject Manager",
        "label": "work",
        "urgent": false,
        "link": null
    },
    {
        "id": "meet_025",
        "from": "hr@finance.com",
        "to": "student85@email.com",
        "subject": "Upcoming Interview Reminder",
        "body": "Dear Applicant,\n\nThis is a reminder for your interview on October 10th at 10:00 AM.\n\nPlease be prepared with your portfolio and resume.\n\nBest regards,\nHR Team\nFinance Co.",
        "label": "work",
        "urgent": true,
        "link": null
    },
    {
        "id": "meet_026",
        "from": "faculty@university.edu",
        "to": "student86@email.com",
        "subject": "Research Proposal Defense Schedule",
        "body": "Dear Student,\n\nYour research proposal defense is scheduled for October 11th at 1:00 PM.\n\nPlease bring required documents.\n\nBest regards,\nFaculty Chair",
        "label": "work",
        "urgent": false,
        "link": null
    },
    {
        "id": "meet_027",
        "from": "hr@logistics.com",
        "to": "student87@email.com",
        "subject": "Interview Schedule Confirmation",
        "body": "Dear Candidate,\n\nYour interview for the logistics internship is set for October 12th at 9:00 AM.\n\nPlease confirm attendance.\n\nRegards,\nHR Team\nLogistics Co.",
        "label": "work",
        "urgent": true,
        "link": null
    },
    {
        "id": "meet_028",
        "from": "calendar@tech.com",
        "to": "student88@email.com",
        "subject": "Weekly Sync Meeting Reminder",
        "body": "Dear Team,\n\nPlease be reminded of our weekly sync meeting on October 13th at 9:30 AM.\n\nBest,\nTeam Lead",
        "label": "work",
        "urgent": false,
        "link": null
    },
    {
        "id": "meet_029",
        "from": "hr@marketinginc.com",
        "to": "student89@email.com",
        "subject": "Interview Follow-Up Meeting Scheduled",
        "body": "Dear Candidate,\n\nA follow-up meeting to discuss your interview is scheduled for October 14th at 11:00 AM.\n\nPlease confirm availability.\n\nBest,\nHR Team\nMarketing Inc.",
        "label": "work",
        "urgent": true,
        "link": null
    },
    {
        "id": "meet_030",
        "from": "faculty@university.edu",
        "to": "student90@email.com",
        "subject": "Capstone Project Review Meeting",
        "body": "Dear Student,\n\nYour capstone project review meeting is scheduled for October 15th at 2:00 PM.\n\nPlease bring all necessary documents and presentation materials.\n\nBest regards,\nFaculty Coordinator",
        "label": "work",
        "urgent": false,
        "link": null
    }
]

const addToDatabase = async() => {
    await Email.deleteMany({}).then(() => { console.log("Databse is empty") }).catch((err) => { console.error(err) });
    await Email.insertMany(sampleWorkmails).then(() => { console.log("work mails added to database successfully") }).catch((err) => { console.error(err) });
}

addToDatabase();