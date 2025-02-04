# [💸Currency Calculator💸](https://currency-calculator-jet.vercel.app/)

A full stack currency calculator application built with Node.js, Express, TypeScript and React. This project was developed as part of an interview for a web developer position and features secure CRUD operations, user authentication, and robust input validation.

## About

Currency Calculator is a full stack application that helps manage currency exchanges with a user-friendly interface. The backend, powered by Express on Node.js, offers comprehensive CRUD operations along with user authentication and security measures. It connects to Mongo Atlas for data storage using Mongoose schemas and also manages sessions via Mongo Store. Authentication and cookies are managed with passport. The frontend is developed with React, Material UI and TypeScript using Vite and is hosted on Vercel. It communicates with the backend for all operations, and certain actions are protected based on the user's authentication status.

## Features

- **Full CRUD Operations:** Create, read, update, and delete currency data.
- **User Authentication:** Secure login and session management.
- **Protected Endpoints:** Authorization mechanisms to restrict access based on user roles.
- **Input Validation:** Both client-side and server-side validation to ensure data integrity.
- **Robust Backend:** Developed using Express and Node.js with security best practices.
- **Cloud Storage:** Uses Mongo Atlas with Mongoose for efficient data storage.
- **Elegant Frontend:** Built with React, MUI and TypeScript, providing a sleek and responsive user interface.

## Technologies

- **Backend:** Node.js, TypeScript, Express, MongoDB, Mongoose
- **Frontend:** React, TypeScript, Material-UI, Vite
- **Deployment:** Vercel for the frontend, Render for the backend, Mongo Atlas for MongoDB
