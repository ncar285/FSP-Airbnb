# Fairbnb

Fairbnb is a full-stack web application designed to emulate the Airbnb experience. Users can seamlessly discover and book accommodations. The application is engineered with a responsive React/Redux frontend, complemented by a Rails backend for seamless data operations. It integrates Google Maps API for location-based features and is anchored on a PostgreSQL database.


# [LIVE](https://fairbnb-36c07c3f3067.herokuapp.com/)

## Technology Stack & Rationale

- **Ruby on Rails:** Used as the backend framework, Rails provides a convention-over-configuration paradigm that speeds up development. Given its relational nature, it's ideal for structured, vertically scalable data—a necessity for platforms like Airbnb with growing user bases.

- **PostgreSQL:** A powerful, open-source relational database management system (RDBMS). It ensures data integrity and supports complex operations, making it apt for storing user data, booking details, and property listings.

- **Active Record:** Rails' built-in ORM (Object-Relational Mapping) tool. It abstracts database operations, making it easier to interact with data in an object-oriented manner. 

- **React.js:** Selected for its ability to craft dynamic and modular user interfaces. React's component-based architecture promotes reusability and efficient state management, enhancing user experience.

- **Redux:** An indispensable state management library when paired with React. It offers a centralized store for global state, ensuring consistency and predictability, especially vital for large-scale applications like Fairbnb.

## Features

### Booking/Reservation

Users can make bookings using virtual tokens and manage those reservations without hassle.

---

### Reviews

After a stay, users can leave reviews that will be displayed on the property's listing page.

---

## Code Snippets

### Issue: Date Uniformity Between Frotend and Backend

#### Problem:
When sending a date (in the format of a string) to the backend, there's potential for timezone-related inconsistencies. This stems from the fact that when the date is saved in the backend as a **\`yyyy-mm-dd`** formatted string, timezone data is lost. Consequently, when the date is later retrieved, React may adjust it based on the local browser's timezone, potentially leading to discrepancies.

#### Solution:
1. #### Saving to the Database:
Before committing any date to the database, I first process it through a function to standardize the date to UTC. This approach ensures consistency across timezones.

```js
export const updateBooking = bookingData => async (dispatch) => {
    const booking = await patchBooking(UTCDateBooking(bookingData));
    return booking
};
export const convertLocalDateToUTC = (inputDate) => {
    const parts = inputDate.split("/");
    const day = parseInt(parts[1], 10);
    const month = parseInt(parts[0], 10);
    const year = parseInt(parts[2], 10);
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const localDate = DateTime.fromObject({ day, month, year }).setZone(timeZone);
    const utcDate = localDate.toUTC();
    return utcDate.toFormat('dd/MM/yyyy');
}
export const UTCDateBooking = (booking) => {
    return {...booking, 
        startDate: convertLocalDateToUTC(booking.startDate), 
        endDate: convertLocalDateToUTC(booking.endDate) 
    }
}
```

2. #### Retrieving from Database:
When dates are fetched from the database, they are converted from UTC to the local timezone of the user's browser. This ensures that the user perceives the date accurately, relative to their local context.

```js
export const convertUTCDateToLocal = (bookingDate) => {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const utcDate = DateTime.fromISO(bookingDate, { zone: 'UTC' });
    const localDate = utcDate.setZone(timeZone);
    return localDate.toFormat('MM/dd/yyyy');
}
export const localDatesBooking = (booking) => {
    return {...booking, 
        startDate: convertUTCDateToLocal(booking.startDate), 
        endDate: convertUTCDateToLocal(booking.endDate) 
    }
}
// REDUCER
const initialState = {};
const bookingsReducer = (state = initialState, action) => {
    let newState = {...state}
    switch (action.type) {
        case RECEIVE_BOOKING:
            return { ...state, [action.payload.id]: localDatesBooking(action.payload) };
//...
```


