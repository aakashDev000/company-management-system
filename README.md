# Company Management System

A company-employee information system built to manage and streamline company and employee data with a focus on modular programming, clean code practices, and efficient data management.

## Table of Contents

- [Company Management System](#company-management-system)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Technologies Used](#technologies-used)
  - [Features](#features)
  - [Installation and Setup](#installation-and-setup)
    - [Backend Setup](#backend-setup)
    - [Frontend Setup](#frontend-setup)
  - [Usage](#usage)
  - [Deployment](#deployment)

## Introduction

The Company Management System is an admin-only authenticated application designed to manage company and employee information efficiently. It allows the creation, updating, and management of company and employee data, with features to search employees and list their reporting hierarchy.

## Technologies Used

- **Frontend:** React, Redux, Tailwind CSS
- **Backend:** Node.js, Express, MongoDB
- **Database:** MongoDB (NoSQL)
- **Other Tools:** HTML, CSS

## Features

- **Admin Authentication:** Only users with ADMIN credentials can access and perform actions in the application.
- **Company Management:** Create, update, and manage company information, with each company uniquely identified by a company code.
- **Employee Management:** Manage employee data, with unique employee IDs within each company. Employees are associated with a company and have a reporting manager.
- **Search Functionality:** Search for employees within a company by name, employee ID, or phone number.
- **Hierarchy Display:** List all subordinates of an employee and identify their reporting manager.

## Installation and Setup

### Backend Setup

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/aakashDev000/company-management-system.git
   cd company-management-system
   ```

2. **Navigate to the Backend Directory:**

   ```bash
   cd back-end
   ```

3. **Install Dependencies:**

   ```bash
   npm install
   ```

4. **Start the Backend Server:**

   ```bash
   npm run dev
   ```

   **Note:**

   - A `.env` file is provided within the `back-end` directory, containing a connection string to a testing MongoDB cluster. Replace the connection string if you wish to use your own database. Otherwise, feel free to use the provided testing database.

### Frontend Setup

1. **Open a New Terminal Window:**
2. **Navigate to the Frontend Directory:**

   ```bash
   cd front-end
   ```

3. **Install Dependencies:**

   ```bash
   npm install
   ```

4. **Start the Frontend Application:**

   ```bash
   npm run start
   ```

   **Note:**

   - The API URL is pre-configured in the `.env` file located in the `front-end` directory.

5. **Access the Application Locally:**

   Once the frontend is running, open your browser and navigate to:

   ```
   http://localhost:3000/
   ```

   Copy and paste this URL into your browser to access the application locally.

## Usage

After completing the setup, the application can be accessed via the frontend. Use the admin credentials to log in and manage the company and employee data.

## Deployment

The project is deployed and can be accessed at the following link:

[Company Management System - Deployed App](https://company-management-system-1.onrender.com)
