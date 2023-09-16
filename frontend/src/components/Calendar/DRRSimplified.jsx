import format from 'date-fns/format'
import { DateRange } from 'react-date-range'
import { addDays } from 'date-fns'
import { useEffect, useRef, useState } from 'react'
import { AiOutlinePlus } from "react-icons/ai"
import { BiMinus } from "react-icons/bi"
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import './DRRSimplified.css'

const DRRSimplified = ({ booking, setBooking, listing, duration, open, setOpen, range, setRange}) => {

    // const [open, setOpen] = useState(false)
    const refOne = useRef(null)
    const [max, setMax] = useState(false)
    const [min, setMin] = useState(false)

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
        <div className='simple-calendarWrap'>

            <div className='static-container'>

            <div ref={refOne}
                className="update-dates">


                    <div
                        className="update-dates-header">
             
                        <div className='calendar-modal-title'>
                            <div className='select-dates'>{ duration ? `${duration} night${duration===1 ? '' : 's'}` : "Re-select dates"}</div>
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


                    

                </div>

            </div>


          

            {!open && 

                <div className='simplified-guests-input-container'>


                    <div className="updated-dates-header">
                        <div className='calendar-modal-title'>
                            <div className='select-dates'>Guests</div>
                            <div>{`${booking ? booking.guests : '1'} guest${booking ? (booking.guests > 1 ? 's' : '') : ''}`}</div>
                        </div>
                    </div>


                    <div class="simplified-number-input">
                        <button id="guest-decrement-button" 
                            className={`${(booking.guests === 1) ? 'inactive' : ''}`}
                            onClick={decrementGuests}>
                            <BiMinus id="decrement-button"/>
                        </button>
                        <button id="guest-increment-button" 
                                className={`${(booking.guests === listing.guests) ? 'inactive' : ''}`}
                                onClick={incrementGuests}>
                                <AiOutlinePlus id="increment-button"/>
                        </button>
                    </div>
        
                </div>

            }

            

       
               
        </div>
    )

}

export default DRRSimplified