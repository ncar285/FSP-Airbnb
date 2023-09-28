# Fairbnb

## Overview

Fairbnb is a web application inspired by Airbnb, designed to provide a seamless user experience for finding and booking distinctive short-term accommodations. Navigate through a curated list of unique homes, make bookings with virtual tokens, and leave reviews for your past stays.

**Live Site**: [Fairbnb](https://fairbnb-36c07c3f3067.herokuapp.com/)

---

## Technologies Used

- **Backend**: Built with Ruby on Rails to manage data transactions and business logic.
- **Frontend**: Designed using React for a responsive and dynamic user interface.
- **Package Manager**: npm was used for efficient package management.

---

## Key Features

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

