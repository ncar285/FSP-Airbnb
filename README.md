# Fairbnb

Fairbnb is a full-stack web application designed to emulate the Airbnb experience. Users can seamlessly discover and book accommodations. The application is engineered with a responsive React/Redux frontend, complemented by a Ruby on Rails backend for seamless data operations. It integrates Google Maps API for location-based features and is anchored on a PostgreSQL database.

I prioritized user integrity through encapsulation:

- Users can only review listings they've stayed at.
- Bookings cannot be modified or deleted post-experience.
- Booking a listing adheres strictly to homeowner-defined parameters, such as the maximum number of guests.

Fairbnb boasts a diverse array of features:

- Browse listings directly on an integrated map.
- Key word search for listings
- Engage with immersive photo slideshows for each listing.
- Use the build in calendar to select or modify booking dates
- Expand and minimise listing descriptions and user reviews.
- Success and error messages across all features.

Encapsulation is used by peventing users from being able to review a listing they have not stayed at or update or deleting bookings after they have occured. A user also is permitted only to book a listing within the contraints outlined byt the home owner such as maximum number of guests.

# <a href="https://fairbnb-36c07c3f3067.herokuapp.com/" target="_blank">LIVE</a>

## Technology Stack & Rationale

### Backend

- **Ruby on Rails:** Chosen for its convention-over-configuration paradigm, Rails accelerates development. It thrives when managing structured and vertically scalable data, making it particularly suitable for platforms like Fairbnb that anticipate expanding user bases.

### Database

- **PostgreSQL:** This robust, open-source RDBMS guarantees data integrity and can handle intricate operations. It's a prime choice for maintaining user data, reservation details, and property listings.

- **Active Record:** An integral ORM tool within Rails. Active Record simplifies database operations, allowing for seamless interactions with data in an object-oriented fashion.

### Frontend

- **React.js:** Adopted for its prowess in building dynamic and modular user interfaces. React's component-centric design encourages code reusability and efficient state management, translating to a superior user experience.

- **Redux:** When integrated with React, Redux becomes an invaluable state management tool. Its centralized store ensures consistent and predictable global state management, an essential feature for ambitious projects like Fairbnb.

- **NPM:** A dependable system for handling the application's dependencies.

### APIs & Libraries

- **Date Range Picker:** Integrated for the calendar functionality in booking creation and updates. Several elements and styles were refined to align with Fairbnb's aesthetic.

- **Google Maps API** Implemented to visually showcase listing locations on an interactive map. We've customized the infoWindow and added enhanced logic to clickable labels, offering a more intuitive user experience.

- **AWS S3:** To ensure speedy retrieval and rendering of listing photos, we leveraged AWS S3 buckets. By employing a thoughtful naming convention, we streamlined the seeding process, automating it with loops instead of specifying each URL manually. This strategy prevents storing images directly on the application, bypassing potential scalability issues.

## Key Features

### User Authentication

#### 1. Secure Account Management:
- Users can sign up for personalized accounts, complete with secure login and logout functionalities.
- Backend security is bolstered with CSRF tokens for request validation.

#### 2. Intelligent Email Routing:
- Upon entering an email, a custom route checks its presence in the database.
    - Existing emails lead users to the login process.
    - New emails guide users through the sign-up procedure.
 
#### 3. Password Policies & Feedback:
- During sign-up, if a password is:
    - Below 6 characters,
    - Lacking numerical values, or
    - Fulfills both aforementioned criteria,
Users receive a clear feedback outlining the missing requirements.

#### 4.  Incorrect Credential Handling:
- If login credentials don't match records, users are promptly informed.

#### 5. Demo User Access:
- Users can swiftly explore the platform using a demo login, bypassing the need for personal credentials.

#### 6. Feature Access Control:
- While all features are viewable to every visitor, certain functionalities require user authentication.
- For instance, viewing one's profile, existing reviews, or reservations necessitates being logged in.

#### 7. Prompted Authentication for Bookings:
- Any attempt to book a listing without authentication will activate the registration modal, prompting the user to log in.

<img src="./readmeGifs/UserAuth.gif" alt="User Authentication GIF" style="width: 100%;">

### Listing Show
- On a listing's show page, logged in users can create a reservation for that listing.
- The calendar for the reservations utilize d the React Date Range Picker library.
- Initially using React Dates caused problems with incompatibility with React 18 which required the change to React Date range.
- Also restyling the date picker proved chalenging as the css was imported, and hover and other such momentary styles were hard to find in the browser.


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


