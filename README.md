## AspireNext College Dashboard

A full-stack web application designed to help students discover, filter, and review colleges. This dashboard provides a clean, responsive interface for users to search for institutions based on various criteria, save their favorites, and read community-sourced reviews.

## ✨ Features

Dynamic Search: Instantly search for colleges by name.

Multi-Filter System: Combine filters for Location, Course, and Fee Range to narrow down results.

Sorting: Sort colleges by fee (Low to High or High to Low).

Favorites: Users can add or remove colleges from a persistent list of favorites.

Reviews: A dedicated page where users can submit and view ratings and comments for colleges.

Dark Mode: A sleek, user-friendly dark mode for comfortable nighttime browsing.

Fully Responsive: A clean and modern UI that works seamlessly on desktop and mobile devices.

## Getting Started

### Prerequisites

Make sure you have these installed:

- Node.js (v16+ recommended)  

- npm (or Yarn)  

- A running backend server (API) that this frontend will consume  

### Installation

Clone the repo:

git clone https://github.com/ibrahim9492/AspireNext_Assignment.git
   
cd AspireNext_Assignment

## Install dependencies:

npm install

# or

yarn install

## Running in Development

npm start

# or

yarn start

This runs the app in development mode.

## ↔️ API Endpoints
The backend exposes the following REST API endpoints:

Method	Endpoint	Description

GET	/api/colleges	Fetches all colleges with optional filters.

GET	/api/reviews	Fetches all reviews.

POST	/api/reviews	Adds a new review.

GET	/api/favorites	Fetches all favorite colleges.

POST	/api/favorites	Adds a college to favorites.

DELETE	/api/favorites/:id	Removes a college from favorites by its ID.

## 📄 License

This project is licensed under the MIT License.