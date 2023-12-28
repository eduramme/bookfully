# Bookfully - Booking Management System

## Introduction

It's a simple yet powerful React application for creating and managing bookings, demonstrating proficiency in modern React practices and application architecture.

## Features

- **CRUD Operations**: Users can create, read, update, and delete bookings.
- **Global State Management**: Utilizes a global state store to maintain and access the state of bookings across the application.
- **Validation & User Experience**: Implements logic to prevent double bookings and validate start and end dates.
- **Responsive Design**: Ensures full responsiveness for both desktop and mobile views.
- **UI/UX**: Enhanced UI design for improved functionality, performance, and readability.

## Technology Stack

- **React + Typescript**: Utilizing the latest React features with functional components and hooks.
- **Vite**: A modern, fast build tool for React.
- **Global State Management Tool**: Redux
- **Styling**: Styled Components

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

## Validation & User Experience

- **Date Overlap Prevention**: The system checks for overlapping dates and prevents double bookings.
- **Date Validation**: Ensures that the start date is before the end date and both are valid dates.

## Responsive Design

- The application is fully responsive, providing an optimal user experience across various device sizes.

## Documentation

- **Code Documentation**: Code is thoroughly documented for better understanding and maintenance.

## Testing

- **Unit Tests**: Unit tests cover the core functionalities.
