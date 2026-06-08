You are a Senior Full Stack Developer.

I am building a clone of the SRJ Global Softech website for learning and portfolio purposes.

IMPORTANT CONTEXT:

* The frontend already exists in my project folder.
* The frontend is built using HTML, CSS, and JavaScript (NOT React).
* You must first analyze the existing frontend codebase.
* You are allowed to modify frontend files whenever necessary to integrate backend functionality.
* This is a portfolio/demo project for recruiters.
* Do NOT build an enterprise-grade production system.
* Focus on demonstrating full-stack development skills and working features.

TECH STACK:

Frontend:

* HTML
* CSS
* JavaScript

Backend:

* Node.js
* Express.js
* MongoDB
* Mongoose

OBJECTIVE:

Create a functional clone that demonstrates:

1. Contact Form Submission
2. Career Page
3. Job Listings
4. Job Application Form
5. Admin Login
6. Admin Dashboard
7. Blog Management
8. Services Management
9. Project Portfolio Management
10. Team Members Section

PHASE 1: FRONTEND ANALYSIS

First scan the entire frontend folder and identify:

* All pages
* Forms
* Buttons
* Navigation links
* Existing JavaScript functionality
* Required backend APIs
* Missing functionality

Generate an analysis report before writing code.

PHASE 2: DATABASE DESIGN

Create only essential collections:

Users
Jobs
Applications
Blogs
Services
Projects
TeamMembers
Contacts

Keep schemas simple.

PHASE 3: BACKEND IMPLEMENTATION

Create:

backend/
│
├── config/
├── controllers/
├── models/
├── routes/
├── middleware/
├── uploads/
├── app.js
├── server.js
├── package.json
└── .env

PHASE 4: FEATURES

CONTACT PAGE

Store:

* Name
* Email
* Phone
* Message

Save to MongoDB.

================================

CAREER PAGE

Admin can create jobs.

Fields:

* Title
* Experience
* Location
* Description

================================

JOB APPLICATION

Fields:

* Name
* Email
* Phone
* Resume PDF

Store resume locally or in uploads folder.

================================

ADMIN LOGIN

Simple JWT Authentication.

Admin credentials stored in database.

================================

ADMIN DASHBOARD

Display:

* Total Contacts
* Total Jobs
* Total Applications
* Total Blogs

Simple cards and tables are enough.

================================

BLOG MANAGEMENT

Admin CRUD:

* Title
* Image
* Description

================================

SERVICES MANAGEMENT

Admin CRUD:

* Service Name
* Description
* Image

================================

PROJECT PORTFOLIO

Admin CRUD:

* Project Name
* Description
* Image

================================

TEAM SECTION

Admin CRUD:

* Name
* Designation
* Photo

================================

PHASE 5: FRONTEND MODIFICATIONS

You are allowed to:

* Update HTML files
* Update CSS files
* Update JavaScript files
* Add Fetch API calls
* Connect forms to backend APIs
* Create Admin Dashboard pages
* Create Login page
* Create Management pages

Modify frontend wherever necessary.

PHASE 6: API DESIGN

Generate:

* GET APIs
* POST APIs
* PUT APIs
* DELETE APIs

Matching frontend requirements.

PHASE 7: CODE GENERATION

Generate code file-by-file.

For each file:

1. Show file path.
2. Explain purpose.
3. Provide complete code.

Start by analyzing the frontend folder and identifying what backend APIs are required.
