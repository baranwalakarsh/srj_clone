Act as a Senior MERN Stack Backend Architect.

I have already developed the frontend of a corporate IT company website similar to SRJ Global Technologies.

Build a complete production-ready backend using:

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcrypt
- Nodemailer
- Multer
- Cloudinary
- Express Validator
- Helmet
- CORS
- Morgan
- dotenv

Architecture Requirements:
- Follow MVC architecture
- Use clean folder structure
- Implement reusable middleware
- Use centralized error handling
- Use asyncHandler
- Create API documentation comments

Folder Structure:

backend/
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── services/
│   ├── utils/
│   ├── validators/
│   ├── uploads/
│   ├── app.js
│   └── server.js
│
├── .env
├── package.json

===========================
FEATURES TO IMPLEMENT
===========================

1. ADMIN AUTHENTICATION

Admin Login
Admin Logout
Refresh Token
Forgot Password
Reset Password
Change Password

JWT + Refresh Token Security

Admin Roles:
- Super Admin
- Admin
- HR

================================

2. CONTACT US MANAGEMENT

Contact Form Fields:

- Full Name
- Email
- Phone
- Company
- Service Interested
- Message

Features:

- Save inquiry in MongoDB
- Send auto-reply email
- Send email to admin
- Mark inquiry status:
  - New
  - Contacted
  - Converted
  - Closed

================================

3. CAREER PORTAL

Career Model

Fields:

- Job Title
- Department
- Experience
- Location
- Salary Range
- Description
- Skills Required
- Status

APIs:

Create Job
Update Job
Delete Job
Get All Jobs
Get Single Job

================================

4. JOB APPLICATION SYSTEM

Candidate Fields:

- Name
- Email
- Phone
- Resume
- Cover Letter
- Applied Job

Features:

- Upload PDF Resume
- Store Resume in Cloudinary
- Send Application Email
- Admin Dashboard View

================================

5. SERVICES MANAGEMENT

Admin can manage:

- Web Development
- Mobile App Development
- Software Development
- ERP Development
- CRM Development
- HRMS Development
- UI/UX Design
- Digital Marketing
- Cyber Security
- Cloud Solutions

Fields:

- Service Name
- Slug
- Description
- Image
- SEO Metadata

CRUD APIs

================================

6. BLOG MANAGEMENT SYSTEM

Blog Fields:

- Title
- Slug
- Featured Image
- Content
- Author
- Tags
- Category
- SEO Title
- SEO Description

CRUD APIs

Search Blog API

Pagination

================================

7. TESTIMONIALS MANAGEMENT

Fields:

- Client Name
- Company Name
- Designation
- Rating
- Review
- Photo

CRUD APIs

================================

8. PROJECT PORTFOLIO MANAGEMENT

Fields:

- Project Name
- Client Name
- Technology Used
- Description
- Images
- Category
- Project URL

CRUD APIs

================================

9. TEAM MANAGEMENT

Fields:

- Name
- Designation
- Department
- Profile Image
- Social Links

CRUD APIs

================================

10. DASHBOARD ANALYTICS

Admin Dashboard APIs:

- Total Inquiries
- Total Jobs
- Total Applications
- Total Blogs
- Total Projects
- Monthly Leads
- Recent Applications

================================

11. FILE UPLOAD SYSTEM

Use:

- Multer
- Cloudinary

Support:

- Images
- PDF Resumes

================================

12. SEARCH & FILTER

Global Search APIs

Search:

- Jobs
- Blogs
- Services
- Projects

================================

13. SECURITY

Helmet
Rate Limiting
XSS Protection
Mongo Sanitization
JWT Security
Password Hashing

================================

14. DATABASE MODELS

Create Mongoose Models for:

Admin
ContactInquiry
Job
JobApplication
Service
Blog
Category
Project
TeamMember
Testimonial

================================

15. RESPONSE FORMAT

Success:

{
  success: true,
  message: "",
  data: {}
}

Error:

{
  success: false,
  message: "",
  errors: []
}

================================

16. SWAGGER DOCUMENTATION

Generate complete Swagger API docs.

================================

17. DEPLOYMENT READY

Prepare for:

- Render
- Railway
- VPS
- AWS EC2

Generate:

- package.json
- environment variables
- MongoDB connection
- complete controllers
- complete routes
- middleware
- models
- validations
- API documentation

Write the code file-by-file with production-grade standards.