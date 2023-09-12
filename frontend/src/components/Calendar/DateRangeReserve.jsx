// import './Calendar.css'
import { DateRange } from 'react-date-range'
import format from 'date-fns/format'

import { addDays } from 'date-fns'

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { useEffect, useRef, useState } from 'react'

import './DateRangeReserve.css'

const DateRangeReserve = () => {

    const [range, setRange] = useState([
        {
            startDate: new Date(), 
            endDate: addDays(new Date(), 7),
            key: 'selection'
        }
    ])
    const [open, setOpen] = useState(false)
    const refOne = useRef(null)

    const [bookingStartDate, setBookingStartDate] = useState('');
    const [bookingEndDate, setBookingEndDate] = useState('');



    useEffect(()=>{
        
        document.addEventListener("keydown", hideOnEscape, true)
        document.addEventListener("click", hideOnClickOutside, true)
    },[])

    const hideOnEscape = (e) => {
        console.log(e.key)
        if (e.key === "Escape"){
            setOpen(false)
        }
    }

    const hideOnClickOutside = (e) => {
        console.log(refOne.current)
        if (refOne.current && !refOne.current.contains(e.target)){
            setOpen(false)
        }
    }

    return (
        <div className='calendarWrap'>

            <div className='static-container'>

            

            <div ref={refOne}
                className={`select-dates-focus ${open ? 'focus' : ''}`}>


                    <div
                        className={`select-date-header ${open ? 'focus' : ''}`}>
             
                        <div className='checkin-checkout'>
                            <div className='checkin-input'>
                                <div>CHECK-IN</div>
                                <input type="text" 
                                    value={ ` ${format(range[0].startDate, 'MM/dd/yyy') }`}
                                    readOnly
                                    className='inputBox'
                                    // onClick = { () => setOpen(open => !open)}
                                    onClick = { () => setOpen(true)}
                                />
                            </div>
                            <div className='checkout-input'>
                                <div>CHECK-OUT</div>
                                <input type="text" 
                                    value={ ` ${format(range[0].endDate, 'MM/dd/yyy') }`}
                                    readOnly
                                    className='inputBox'
                                    // onClick = { () => setOpen(open => !open)}
                                    onClick = { () => setOpen(true)}
                                />
                            </div>
                        </div>

                        <div className='calendar-modal-title'>
                            <div>Hi!</div>

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

            <div className='guests-input-container'>
                <div className='guests-input-new'>
                    <div className='guests-input-header'>GUESTS</div>
                    <div className='guests-input-val'>
                        7 guests, 3 infants, 1 pet
                    </div>
                </div>
            </div>

            

       
               
        </div>
    )

}

export default DateRangeReserve