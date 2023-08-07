# Quest-14-techBlog
 ![Github license](https://img.shields.io/badge/license--blue.svg)
  ## Description
CMS-style (Content Management System) tech blog site that allows developers to publish their blog posts and interact with other developers' posts through comments. The site follows the Model-View-Controller (MVC) architectural pattern, which separates the application's logic into three components: models (representing the database), views (representing the user interface), and controllers (handling user requests and responses).
## Deployed Application URL

  ## Table of Contents
  * [Features](#features)
  * [Languages & Dependencies](#languagesanddependencies)
  * [How to Use This Application](#HowtoUseThisApplication)

  ## Features
### Models:
 - The project uses Sequelize, an Object-Relational Mapping (ORM) library, to interact with the MySQL database.
 - The database has three main tables: Users, Posts, and Comments, which represent developers, blog posts, and comments, respectively.
- The models define the relationships between Users, Posts, and Comments, enabling associations between them.

### Views:
- Handlebars.js is used as the templating language for the views. It helps render dynamic HTML content based on the data received from the server.
- The main views include the homepage, dashboard, login page, signup page, and pages to create, edit, and view blog posts.

### Controllers:
- Express.js is used to create the API for handling HTTP requests and responses.
- There are several controllers to handle different functionalities, such as user authentication, rendering views, and managing blog posts and comments.
- Middleware like 'withAuth' is used to authenticate users and grant access to certain routes only to logged-in users.

### Authentication:
- The project implements user authentication using the express-session package, which stores session data on the client-side as a cookie.
- Users can sign up with a username and password, and their credentials are hashed using the bcrypt package before storing in the database.
- After successful login, users can access the dashboard to view, create, edit, and delete their blog posts.

### Blog Posts and Comments:
- Authenticated users can create new blog posts and view their existing posts on the dashboard.
- Users can also view all published blog posts on the homepage, along with the post title, content, and creation date.
- Each blog post can be clicked to view its full details, including comments made by other users.
- Users can leave comments on blog posts when logged in, and the comments are displayed with the commenter's username and creation date.

### Deployment:
- The application is designed to be deployed to Heroku, a cloud platform that supports Node.js applications.
- The database connection is configured to use the Sequelize instance with the MySQL database, enabling easy deployment and management.
 
  ## Languages & Dependencies
- JavaScript (ES6+): The primary language used for the application's logic and functionality.
- CSS: Used for styling the user interface of the application.
- Express.js: A web application framework for Node.js, used for handling HTTP requests and responses.
- Sequelize: An Object-Relational Mapping (ORM) library for Node.js, used to interact with the MySQL database.
- Handlebars.js: A templating engine for Node.js, used to generate dynamic HTML content for the views.

  ## How to Use This Application:
Use the Heroku link provided. 

## Questions 
- Github: Greivin13
- Email: greivin.babito@gmail.com
  
  