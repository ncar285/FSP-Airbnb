
// const ReactDatesCalendar = () => {

//     return (
//         <div className='calendar-container'>
//         <DateRangePicker
//             startDate={booking.startDate} // momentPropTypes.momentObj or null,
//             startDateId="start_date" // PropTypes.string.isRequired,
//             endDate={booking.endDate} // momentPropTypes.momentObj or null,
//             endDateId="end_date" // PropTypes.string.isRequired,
//             onDatesChange={({ startDate, endDate }) => {
//                 let newBookingState = {...booking}
//                 newBookingState.startDate = startDate;
//                 newBookingState.endDate = endDate;
//                 setBooking(newBookingState)
//             }} // PropTypes.func.isRequired,
//             focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
//             onFocusChange={focusedInput => setFocusedInput(focusedInput)} // PropTypes.func.isRequired,
//             numberOfMonths={2}
//             // isDayBlocked = {momentDate => momentDate.format('d') === 0 }
//             />
//     </div>
//     )
    
// }

// export default ReactDatesCalendar