# SSH-LearningManagmentSystem

## Project Overview
This project, developed as part of the Distributed Systems course (2023/24), aims to create a Learning Management System (LMS). The system facilitates communication between client and server over HTTP, with the server-side built using Node.js and Express for RESTful API creation, and the client-side utilizing React and modern state management solutions. Object-oriented programming (OOP) principles guide development, with features including authentication, authorization, MongoDB communication via Mongoose ORM, middleware usage, and extensive testing.

## Technologies Used

- **Node.js**: Backend runtime environment.
- **Express.js**: Web application framework for Node.js used to build the server-side.
- **MongoDB**: NoSQL database
- **React.js**: Frontend library for building user interfaces.
- **Next.js**: React framework for server-side rendering and routing.
- **TypeScript**: Programming language for type-safe development.
- **Redis**: In-memory data structure store used for caching and session management.
- **Swagger**: API documentation tool for documenting and testing RESTful APIs.
- **Postman**: API testing and documentation tool.

## Features

### Server-Side

- **Framework**: Built using Node.js with Express to support RESTful APIs.
- **Endpoints**:
  - **Analytics**: Retrieve analytics data for users, orders, and courses.
  - **Courses**: Create, edit, delete, and retrieve course information. Users can access course content and interact with questions, answers, reviews, and replies.
  - **Layouts**: Manage layouts for different sections of the application.
  - **Notifications**: Get and update notifications for users.
  - **Users**: Handle user registration, activation, login, logout, profile management, role updates, and deletion.
  - **Orders**: Create and retrieve orders placed by users.
- **ORM**: Utilizes Mongoose for MongoDB communication.
- **Authentication & Authorization**: Implements robust authentication and authorization mechanisms.
- **Swagger Documentation**: API is documented using Swagger UI for easy exploration and testing.
- **Middleware**: Various middleware are used to handle requests, responses, and errors.
- **Models & Migrations**: Our models cover essential aspects such as user management, course data, layout configurations, notifications, orders, FAQs, categories, banners, reviews, links, and comments within the Learning Management System.


## Client-Side
- **Framework**: Developed with Next.js and React.
- **Forms**: Form management with Formik for state and validation.
- **HTTP Communication**: Communicates with the server via HTTP.
- **Testing**: Implements unit tests and API tests for application functionality.

## Installation
   ### Prerequisites
   Node.js  </br>
   npm or yarn  </br>
   MongoDB </br>
   
   ### Steps
Clone the repository:  </br>
> git clone (https://github.com/VeraLlugiqi/SSH-LearningManagmentSystem)  </br>

Navigate to the server directory and install dependencies:  </br>
> cd server  </br>
> npm install  </br>

Set up the database:  </br>
   > Configure the database settings in the .env file.  </br>

Run migrations to set up the database schema:  </br>
   > npx mongoose-migrate  </br>
   
Start the server:  </br>
> npm start  </br>

Navigate to the client directory and install dependencies:  </br>
 > cd ../client  </br>
 > npm install  </br>

Start the client:  </br>
> npm run dev  </br>

Usage  </br>

Access the Application:  </br>
Open your browser and navigate to http://localhost:3000.  </br>

API Documentation:  </br>
The API documentation can be accessed at http://localhost:8000/swagger using Swagger UI.  </br>
 
## Authors  </br>
Anjeza Sfishta  </br>
Erza Merovci  </br>
Rinesa Zuzaku  </br>
Tringa Baftiu  </br>
Vera Llugiqi </br>

