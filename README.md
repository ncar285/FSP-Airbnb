# Fairbnb

Fairbnb is a full-stack web application designed to emulate the Airbnb experience. Users can seamlessly discover and book accommodations. The application is engineered with a responsive React/Redux frontend, complemented by a Rails backend for seamless data operations. It integrates Google Maps API for location-based features and is anchored on a PostgreSQL database.


# [LIVE]([https://reps-n-recipes-d98cf03910d0.herokuapp.com/](https://fairbnb-36c07c3f3067.herokuapp.com/)

## Technology Stack & Rationale

- **Ruby on Rails:** Used as the backend framework, Rails provides a convention-over-configuration paradigm that speeds up development. Given its relational nature, it's ideal for structured, vertically scalable data—a necessity for platforms like Airbnb with growing user bases.

- **PostgreSQL:** A powerful, open-source relational database management system (RDBMS). It ensures data integrity and supports complex operations, making it apt for storing user data, booking details, and property listings.

- **Active Record:** Rails' built-in ORM (Object-Relational Mapping) tool. It abstracts database operations, making it easier to interact with data in an object-oriented manner. 

- **React.js:** Selected for its ability to craft dynamic and modular user interfaces. React's component-based architecture promotes reusability and efficient state management, enhancing user experience.

- **Redux:** An indispensable state management library when paired with React. It offers a centralized store for global state, ensuring consistency and predictability, especially vital for large-scale applications like Fairbnb.

## Features

### Booking/Reservation

Users can make bookings using virtual tokens and manage those reservations without hassle.

#### Challenges and Solutions
- **Calendar Incompatibility**: Initially chose the React-dates package for the booking calendar, but found it incompatible with React 18. Had to pivot and use an alternative calendar library to achieve similar functionality.
- **Confirmation Email**: Integrated an automated email system to send users a confirmation email with the booking details.

---

### Reviews

After a stay, users can leave reviews that will be displayed on the property's listing page.

#### Challenges and Solutions
- **User Review Management**: Faced the challenge of featuring a user's own review separately on a listing's show page. Solved it by manipulating the review array and inserting the user's review at the top.

---

## Future Directions

- **Payment Integration**: Planning to add a real payment gateway for transactions.
- **Search Functionality**: Working on implementing an advanced search feature to filter listings based on user preferences.

