# Web Development Project

## AUEB | Web Development | Semester 7 | 2023 - 2024

## Advertisements Web Application

This is a web application built using Node.js and Express to manage and display categorized advertisements. The application allows users to explore various categories and subcategories of ads, view detailed information about individual ads, and log in to save their favorite ads.s. The application leverages the Handlebars.js templating engine for dynamic rendering and fetches data from an external API (https://wiki-ads.onrender.com).

### Technologies Used:
Frontend: HTML, CSS, JavaScript, Handlebars.js
Backend: Node.js, Express.js
API: External API for fetching category, subcategory, and ad data

### Project Structure:
  Server Script: The main server script is built using Express.js. It serves static files, handles different routes, and manages user authentication and ad-related operations.

  Data Storage: User data, including hashed passwords and favorites, is stored in a JSON file (users.json). Advertisements are fetched from external API endpoints.

  Frontend: HTML files are designed with Handlebars templates to dynamically display categories, subcategories, and ad details.

### Project Highlights:
Client-Side Templating: Utilizes Handlebars.js for efficient client-side templating, providing a seamless and dynamic user experience.
External API Integration: Fetches data from an external API to dynamically update the content, ensuring the latest information is displayed.
Modular Structure: Organized backend routes and frontend templates for scalable and maintainable code.

### server.js:
This file establishes the core of the Express.js server, serving static files from the 'views' directory. It defines routes for the home page (/), category page (/category), and subcategory page (/subcategory). Upon accessing the root URL, the server responds by sending the index.html file. Additionally, the server checks for the existence of a flag file ('users.json') and executes a one-time command to create user data if needed. The server is configured to listen on port 3000.

### index.html:
This HTML file defines the structure of the home page. It incorporates a Handlebars template (categories-template) to dynamically render categories and subcategories. The script at the end fetches data from the server, specifically from https://wiki-ads.onrender.com/categories. For each category, it fetches subcategories, creating a dynamic and responsive user interface by rendering the data on the page.

### category.html:
Representing the category page, this HTML file utilizes the Handlebars template (ads-template) to dynamically render advertisements associated with a specific category. The script at the end fetches ad data based on the category ID from the URL query parameters, ensuring a dynamic display of ads tailored to the selected category.

### subcategory.html:
Similar to category.html, this file represents the subcategory page. It incorporates the Handlebars template (ads-template) to dynamically render ads belonging to a specific subcategory. The script fetches ad data based on the subcategory ID from the URL query parameters, providing users with a detailed view of ads within the chosen subcategory.

### favourite-ads.html:
This HTML file represents the user's Favourite Ads page. It integrates the Handlebars template (ads-template) to dynamically render the user's selected advertisements. The script at the end extracts the user ID from the URL query parameters, fetches user data from the server's 'users.json' file, and retrieves the user's favourite ads. These favourite ads, along with their details, are then dynamically displayed on the page. Users can conveniently view and revisit their preferred advertisements, enhancing their personalized experience on the platform.
