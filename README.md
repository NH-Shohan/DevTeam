!https://prod-files-secure.s3.us-west-2.amazonaws.com/9f0d85ad-f6c6-4131-8546-64f1018d330a/64068291-5949-4cfe-aa22-9b8354e11566/image1.png

American International University- Bangladesh

CSC 4261: Advanced Programming in Web Technology

CO1 Evaluation

Project Report

FALL 23-24

Project Title: DevTeam

Project Domain: A recruitment management system

Group Number: 3

Section: B

| Student Name           | Student Id |
| ---------------------- | ---------- |
| Md. Jidanul Hakim Jitu | 20-44365-3 |
| Nahim Hossain Shohan   | 20-44291-3 |
| Mst. Rokeya Khatun     | 20-44212-3 |
| Nusrat Jahan Zerin     | 20-44300-3 |

Introduction:

_A comprehensive Recruiting Management system powered by Nest Js and Next JS. Seamlessly connecting Developers, Recruiters, Companies, and Admins, DevTeam streamlines the hiring process. Elevate your recruitment experience with user-friendly panels, efficient job applications, and seamless communication. This project aims to enhance collaboration and efficiency in the dynamic world of talent acquisition._

Problem Analysis

**Problem Statement:**

Traditional recruiting processes often lack a centralized and efficient platform, leading to challenges in job application management, communication, and collaboration between developers, recruiters, companies, and admins. Manual handling of data, fragmented systems, and limited automation hinder the effectiveness of talent acquisition.

**Significance of Solving the Problem:**

- Streamlined Recruitment: DevTeam aims to streamline the recruitment process by providing a centralized platform for all stakeholders, reducing redundancy, and improving workflow efficiency.
- Enhanced Collaboration: Bridging the communication gap between developers, recruiters, companies, and admins fosters better collaboration, leading to improved hiring outcomes.
- Efficient Job Application Management: Simplifying the job application process for developers and providing effective tools for recruiters and companies enhance overall efficiency in talent acquisition.
- Automated Processes: Automation of routine tasks, such as interview scheduling and application tracking, minimizes manual efforts, allowing recruiters and companies to focus on strategic decision-making.
- Data Security and Integrity: DevTeam ensures secure data storage and management, mitigating risks associated with manual file handling and unauthorized access.

**Existing Solutions:**

- LinkedIn: LinkedIn is a widely used professional networking platform that facilitates job postings, candidate searches, and networking. However, it lacks a comprehensive system for managing the end-to-end recruitment process.
- Applicant Tracking Systems (ATS): Systems like Greenhouse and Lever focus on applicant tracking but may lack integration with a collaborative platform for developers, recruiters, and companies.
- Job Portals (e.g., Indeed, Glassdoor): While these portals connect job seekers with employers, they often lack the depth of features needed for seamless collaboration and communication among all stakeholders.
- Customized HR Software: Some companies use custom HR software solutions, but these may lack the specificity required for the dynamic and collaborative nature of developer recruitment.

Feature Analysis:

1. **User Category:**

There are n-types of Users here. They are:

(4 users)

- Programmer
- Recruiter
- Company
- Admin

1. **Feature List:**

In this project the **Admin** has the following features:

(**20 feature per user)**

1. View/ able to see all admins.
2. Add another Admin.
3. Update Admin (Property Only) (Own)
4. Update Admin (full profile) (own)
5. Upload Admin Profile Photo
6. View Uploaded Profile Photo
7. View All Recruiters
8. Approve a Recruiter
9. Reject a Recruiter
10. Update a Recruiter
11. View All Company
12. Approve a Company
13. Reject a Company
14. Update Company
15. View All Programmer
16. Remove a Programmer
17. Company Growth Data
18. Programmer Growth Data
19. Recruiter Growth Data
20. Add Moderator

In this project the **Recruiter** has the following features:

1. Register as a Recruiter
2. Recruiter Profile (own)
3. Update Recruiter Profile
4. Upload Recruiter Photo
5. Interview List
6. Set Interview
7. Update Interview
8. Delete Interview
9. View Interview Team
10. Update Candidate Status
11. Remove a Candidate
12. Show Candidates
13. Approve Candidate
14. Reject Candidate
15. Company Requests for assignment
16. Approve Company Request
17. Reject Company Request
18. Full Recruiter Team
19. View Messages from Candidates
20. View Messages from Companies

In this project the **Programmer** has the following features:

(**28 feature)**

1. Create Team
2. Get All Teams
3. Get Team Details
4. Update Team
5. Update Name
6. Delete Team
7. Create Programmer Profile
8. Data to Input
9. Get Programmer Profile
10. Update Programmer Profile
11. Partially Update GitHub Username
12. Delete Programmer Profile
13. Add Project
14. Get All Projects
15. Get Project Details
16. Update Project
17. Partially Update Project Link
18. Delete Project
19. Add Work Experience
20. Get All Work Experiences
21. Get Work Experience Details
22. Update Work Experience
23. Delete Work Experience
24. Get All Certifications
25. Update Certification
26. Delete Certification
27. Search Teams
28. Search Programmers

In this project the **Company** has the following features:

1. Get Company Profile
2. Get Company Profile by ID
3. Update Company Profile by ID
4. Update Company Name by ID
5. Delete Company Profile by ID
6. Create Company Profile
7. Update Company Contacts
8. Patch Company Email
9. Delete Company Contacts
10. List Job Listings
11. Create Job Listing
12. Get Job Listing by ID
13. Update Job Listing by ID
14. Delete Job Listing by ID
15. List Job Applications
16. Get Job Application by ID
17. Update Job Application Status
18. Create Job Application
19. Update Applicant Email
20. Delate Job Application By ID

**Design:**

**Use-Case Diagram:**

!https://prod-files-secure.s3.us-west-2.amazonaws.com/9f0d85ad-f6c6-4131-8546-64f1018d330a/57af5563-d447-464c-87a0-16f793d17feb/image2.jpeg

**ER Diagram:**

!https://prod-files-secure.s3.us-west-2.amazonaws.com/9f0d85ad-f6c6-4131-8546-64f1018d330a/a6324108-5dd6-4d1c-9740-afa0d11cf2dc/image3.png

**Tools Used:**

To develop this project, we have used the following:

- Nest JS
- Next JS
- TypeScript
- PostgreSQL
- PgAdmin
- TypeORM
- Postman
- Class Validator
- Multer
- Class Transformer

System Images against the Specification:

Give few screen shots of some User Interfaces/MOCKUPs using UI creator tool such as Figma, Draw.IO, etc and write a very small description for each of the User Interfaces. (minimum 8 different mock ups)

!https://prod-files-secure.s3.us-west-2.amazonaws.com/9f0d85ad-f6c6-4131-8546-64f1018d330a/83a6c8d4-a281-438e-b7a2-d1492ef77dd4/image4.png

Home page of the system

!https://prod-files-secure.s3.us-west-2.amazonaws.com/9f0d85ad-f6c6-4131-8546-64f1018d330a/ed916943-5a72-4bf6-9a87-daa1675d85f4/image5.png

About Us Page

!https://prod-files-secure.s3.us-west-2.amazonaws.com/9f0d85ad-f6c6-4131-8546-64f1018d330a/b0baed9b-daaf-42f9-afee-6d1772b97674/image6.png

Login Mockup for all user

!https://prod-files-secure.s3.us-west-2.amazonaws.com/9f0d85ad-f6c6-4131-8546-64f1018d330a/4c22906a-5a1d-4e30-b309-83cc4ea8826c/image7.png

Register for all user without admin

!https://prod-files-secure.s3.us-west-2.amazonaws.com/9f0d85ad-f6c6-4131-8546-64f1018d330a/52b6f73e-9d89-4cd5-8762-844dbc8e10bb/image8.png

Recruiter Home Page: Here Recruiter can see all messages, requests and interview lists and set interview for different categories of user.

!https://prod-files-secure.s3.us-west-2.amazonaws.com/9f0d85ad-f6c6-4131-8546-64f1018d330a/e0714ed7-124b-496b-8409-6d09da6c554e/image9.png

Admin Home page: There admin can see and modify all the details for all the users.

!https://prod-files-secure.s3.us-west-2.amazonaws.com/9f0d85ad-f6c6-4131-8546-64f1018d330a/a5eb15b9-7d01-42fc-b643-cdbb3e69defe/image10.png

Programmer Home Page: Here Programmer can see and interview list, applies jobs their profiles etc.

!https://prod-files-secure.s3.us-west-2.amazonaws.com/9f0d85ad-f6c6-4131-8546-64f1018d330a/b9b10001-bf3f-4ec5-8100-4b9f6a35bf99/image11.png

Company Home Page: Company Can Make a Job as well as assign recruiters, see their made jobs, Message to Recruiters etc.

**Impact of this Project:**

DevTeam revolutionizes talent acquisition, fostering efficiency and collaboration. In our dynamic society, it enhances job application processes, streamlines communication, and optimizes recruitment workflows. This project empowers individuals by providing a centralized platform, connecting developers, recruiters, companies, and admins. DevTeam's impact extends beyond professional spheres, contributing to a more interconnected and streamlined job market, ultimately benefiting individuals and organizations alike in their quest for talent and growth.

Limitations and Possible Future Improvements:

**Limitations:**

DevTeam's current version may face challenges in scalability for extensive user bases. Limited integration capabilities with external systems could impact data exchange. Additionally, real-time collaboration features may require further refinement.

**Possible Future Improvements:**

Future iterations could focus on scalability enhancements, advanced integration with external tools, and the incorporation of AI-driven analytics for smarter decision-making. Real-time collaboration features could be expanded for seamless communication, ensuring DevTeam remains at the forefront of evolving recruitment needs.

_[Note: Make sure that your report is maximum 10 pages (including cover page). Print (Colored) the report and submit it with spiral bind.]_

| CO1 Evaluation: Project Report Evaluation |     |     |     |
| ----------------------------------------- | --- | --- | --- |

| Problem
Analysis
(5) | Use Case
Diagram
(5) | ER
Diagram
(5) | Total
(15) |
| | | | |
| | | | |
