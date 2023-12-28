# 🏠 Bookfully - Booking Management System

## Introduction

It's a simple yet powerful React application for creating and managing bookings.

## Features

- **CRUD Operations**: Users can create, read, update, and delete bookings.
- **Global State Management**: Utilizes a global state store to maintain and access the state of bookings across the application.
- **Validation & User Experience**: Implements logic to prevent double bookings and validate start and end dates.
- **Responsive Design**: Ensures full responsiveness for both desktop and mobile views.
- **UI/UX**: Enhanced UI design for improved functionality, performance, and readability.

## Installation

1. **Clone the repository:** <br>
`git clone git@github.com:eduramme/bookfully.git`
2. **Navigate to the project directory:**<br>
`cd bookfully`
3. **Install dependencies:**<br>
`npm install`
4. **Start the development server:**<br>
`npm run dev`

## Usage

- **Creating a Booking**: Click on a property, fill in the details on the form, and submit.
- **Viewing Bookings**: All bookings are listed on the bookings page with options to view details.
- **Updating a Booking**: Click on a booking to edit its details and submit the changes.
- **Deleting a Booking**: Click the delete button on any booking you wish to remove.

## 📅 Date Management and Validation

Within the application, bookings are defined as overnight stays. Guests are expected to check in and check out at midday. Consequently, the system's date overlap prevention feature ensures that two bookings cannot occur simultaneously for the same night. However, it is designed to allow one booking to check out as another checks in on the same day for the same property. This ensures efficient use of the property while maintaining a smooth experience for guests. Additionally, all date validations are property-specific to ensure accuracy and consistency in booking schedules.

- **Date Overlap Prevention**: The system checks for overlapping dates and prevents double bookings.
- **Date Validation**: Ensures that the start date is before the end date and both are valid dates.

### Responsive Design

- The application is fully responsive, providing an optimal user experience across various device sizes.

### Documentation

- **Code Documentation**: Code is thoroughly documented for better understanding and maintenance.

### Testing

- **Unit Tests**: Unit tests cover the core functionalities.
  
## 🏗️ Application Structure and Technologies

### Overview
The application is developed using a modern tech stack comprising Vite, React, TypeScript, Redux, Vitest, and Styled Components. It's designed to be straightforward and user-friendly, focusing on functionality without an overly complex folder structure.

### Technology Stack
- **Vite**: Provides a fast and efficient build tool.
- **React**: Facilitates building user interfaces with components.
- **TypeScript**: Adds static typing to enhance code quality and understandability.
- **Redux**: Manages global state across the application, ensuring a consistent and predictable state.
- **Vitest**: Offers a testing framework for running unit and integration tests.
- **Styled Components**: Allows for component-level styling, enhancing the modular design.

### Folder Structure
- **assets**: Contains static files like images. Currently, it includes only the application logo.
- **components**: Houses reusable UI components, like the form component, which are used throughout the application to maintain consistency and reduce redundancy.
- **features**: Contains the `bookingsSlice` file, which is responsible for handling booking-related actions and state management within the global Redux store.
- **hooks**: Includes custom hooks like `useBookingProcess`, which encapsulates Redux actions for managing bookings and is utilized across the application for clean and efficient code reuse.
- **pages**: Comprises various pages such as property listings, individual property details, bookings, and specific booking details. Each page is responsible for rendering particular aspects of the application.
- **routes**: Contains the routing logic to navigate between different pages and components within the application.
- **styles**: Holds global styling configurations, including the theme and color schemes used across the application to maintain a consistent look and feel.
- **types**: Defines TypeScript types and interfaces, ensuring type safety and clarity across the application.
- **utils**: Provides utility functions that perform common tasks, making the codebase more efficient and organized.

### Simplicity and Efficiency
The application is intentionally designed with a simple and effective structure. Instead of adopting a complex design pattern like atomic design, it focuses on a more straightforward approach that suits its scale and complexity.
