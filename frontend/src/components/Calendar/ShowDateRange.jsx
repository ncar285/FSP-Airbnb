import format from 'date-fns/format'
import { DateRange } from 'react-date-range'
// import { addDays } from 'date-fns'
import { useEffect, useState } from 'react'

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import './DateRangeReserve.css'

const ShowDateRange = ({ booking, setBooking, listing, duration, range, setRange}) => {


    useEffect(()=>{
        const start = format(range[0].startDate, 'MM/dd/yyy')
        const end = format(range[0].endDate, 'MM/dd/yyy')
        setBooking({ ...booking, startDate: start, endDate: end})
    }, [range[0]])


    return (
        <div className='calendarWrap'>

            <div className='static-container'>


            {/* <div
                className={`select-dates-focus focus static`}> */}


                    <div
                        className={`select-date-header focus`}>
             
                        <div className='calendar-modal-title'>
                            <div className='select-dates'>{ duration ? `${duration} night${duration===1 ? '' : 's'} in ${listing.city}` : "Select dates"}</div>
                            <div>{ duration ? `${booking.startDate} - ${booking.endDate}` 
                            : "Add your travel dates for exact pricing"}</div>
                        </div>



                    </div>

                    {/* calendar always open: */}
                    <div >
                
                            <DateRange
                                onChange = { item => setRange([item.selection]) }
                                editableDateInputs = {true}
                                moveRangeOnFirstSelection = {false}
                                ranges={range}
                                months={2}
                                direction="horizontal"
                                className = "calendarElement"
                            />
                   
                    </div>


                    

                {/* </div> */}

            </div>



            

       
               
        </div>
    )

}

export default ShowDateRange