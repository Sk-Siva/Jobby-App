# **Jobby App**

## **About**
Jobby App is a job search application that allows users to browse jobs based on different filters such as employment type, salary range, and search queries. It provides authentication and ensures only logged-in users can access job listings and details.

## **Features**

### **Login Route**
- Displays an error message for invalid credentials.
- Navigates to the Home route upon successful login.
- Redirects unauthenticated users to the Login route when accessing protected routes.
- Prevents authenticated users from accessing the Login route again.

### **Home Route**
- Authenticated users can access the home page.
- Clicking the "Find Jobs" button navigates to the Jobs route.

### **Jobs Route**
- Fetches and displays user profile details.
- Fetches and displays job listings based on filters.
- Implements a retry mechanism on failed API calls.
- Allows searching jobs by keywords.
- Filters jobs based on employment type and salary range.
- Displays "No Jobs Found" if no results match the filters.
- Clicking on a job navigates to the Job Item Details route.

### **Job Item Details Route**
- Fetches and displays job details for a selected job.
- Shows a list of similar job suggestions.
- Implements a retry mechanism on failed API calls.
- Opens the company website in a new tab when the "Visit" button is clicked.

### **Not Found Route**
- Displays a 404 page for unknown routes.

### **Header**
- Clicking the website logo navigates to the Home route.
- Clicking the "Home" link navigates to the Home route.
- Clicking the "Jobs" link navigates to the Jobs route.
- Clicking the "Logout" button navigates to the Login route.

## **Tools Used**
- React.js
- React Router
- CSS for styling
- REST API for fetching jobs and user details
- JWT for authentication
