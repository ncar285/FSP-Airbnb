import format from 'date-fns/format'
import { DateRange } from 'react-date-range'
import { addDays } from 'date-fns'
import { useEffect, useRef, useState } from 'react'
import { AiOutlinePlus } from "react-icons/ai"
import { BiMinus } from "react-icons/bi"
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import './DateRangeReserve.css'

const DateRangeReserve = ({ booking, setBooking, listing, duration, open, setOpen, range, setRange}) => {

    // const [open, setOpen] = useState(false)
    const refOne = useRef(null)

    useEffect(()=>{
        document.addEventListener("keydown", hideOnEscape, true)
        document.addEventListener("click", hideOnClickOutside, true)
    },[])

    useEffect(()=>{
        const start = format(range[0].startDate, 'MM/dd/yyy')
        const end = format(range[0].endDate, 'MM/dd/yyy')
        setBooking({ ...booking, startDate: start, endDate: end})
    }, [range[0]])

    const hideOnEscape = (e) => {
        if (e.key === "Escape"){
            setOpen(false)
        }
    }


    useEffect(()=>{
        if (duration !== 0) {
            const timer = setTimeout(() => {
                setOpen(false);
            }, 300);
            return () => clearTimeout(timer); // Cleanup
        }
    },[duration])



    console.log(duration)

    const hideOnClickOutside = (e) => {
        if (refOne.current && !refOne.current.contains(e.target)){
            setOpen(false)
        }
    }

    const updateStartDate = () => {
        const date = format(range[0].startDate, 'MM/dd/yyy')
        setBooking({ ...booking, startDate: date})
    }
    const updateEndDate = () => {
        const date = format(range[0].endDate, 'MM/dd/yyy')
        setBooking({ ...booking, endDate: date})
    }

    const incrementGuests = () => {
        if (booking && booking.guests){
            return booking.guests === listing.guests ? null : setBooking({ ...booking, guests: booking.guests + 1 })
        }
    }

    const decrementGuests = () => {
        if (booking && booking.guests){
            return (booking.guests === 1) ? null : setBooking({ ...booking, guests: booking.guests - 1 })
        }
    }

    return (
        <div className='calendarWrap'>

            <div className='static-container'>

            

            <div ref={refOne}
                className={`select-dates-focus ${open ? 'focus' : ''}`}>


                    <div
                        className={`select-date-header ${open ? 'focus' : ''}`}>
             
                        <div className='calendar-modal-title'>
                            <div className='select-dates'>{ duration ? `${duration} night${duration===1 ? '' : 's'}` : "Select dates"}</div>
                            <div>{ duration ? `${booking.startDate} - ${booking.endDate}` 
                            : "Add your travel dates for exact pricing"}</div>
                        </div>



                        <div className='checkin-checkout'>
                            <div className='checkin-input'
                                onClick = { () => setOpen(true)}>

                                <div>CHECK-IN</div>
                                <input type="text" 
                                    value={ ` ${format(range[0].startDate, 'MM/dd/yyy') }`}
                                    // readOnly={open ? false : true}
                                    onChange={updateStartDate}
                                    readOnly
                                    className='inputBox'
                                />
                            </div>
                            <div className='checkout-input'
                                onClick = { () => setOpen(true)}>
                        
                                <div>CHECK-OUT</div>
                                <input type="text" 
                                    value={ ` ${format(range[0].endDate, 'MM/dd/yyy') }`}
                                    // readOnly={open ? false : true}
                                    onChange={updateEndDate}
                                    readOnly
                                    className='inputBox'
                                />
                            </div>
                        </div>

                    </div>

                    {/* calendar when it is open: */}
                    <div >
                        {open &&
                            <DateRange
                                onChange = { item => setRange([item.selection]) }
                                editableDateInputs = {true}
                                moveRangeOnFirstSelection = {false}
                                ranges={range}
                                months={2}
                                direction="horizontal"
                                className = "calendarElement"
                            />
                        }
                    </div>


                    { open &&
                        <div className='calendar-sub-buttons'>
                            <button 
                            onClick = { () => setOpen(false)}
                            className='close-calendar'>
                                Close
                            </button>
                        </div>
                    }
               
                    

                </div>

            </div>

            <div className='guests-input-container'>
                <div className='guests-input-new'>
                    <div className='guests-input-header'>GUESTS</div>
                    <div className='guests-input-val'>
                        {`${booking ? booking.guests : '1'} guest${booking ? (booking.guests > 1 ? 's' : '') : ''}`}
                        {/* 7 guests, 3 infants, 1 pet */}
                    </div>
                </div>

                <div class="number-input">
                        <button id="guest-decrement-button" onClick={decrementGuests}><BiMinus id="decrement-button"/></button>
                        {/* <div id="guests-quantity" >{booking.guests}</div> */}
                        <button id="guest-increment-button" onClick={incrementGuests}><AiOutlinePlus id="increment-button"/></button>
                            {/* {maxGuests &&
                            <div>max guests!</div>} */}
                </div>
    
            </div>

            

       
               
        </div>
    )

}

export default DateRangeReserve