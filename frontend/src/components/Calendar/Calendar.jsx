// import './Calendar.css'
import { Calendar } from 'react-date-range'
import format from 'date-fns/format'

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { useEffect, useState } from 'react'

const CalendarComp = () => {

    const [calendar, setCalendar] = useState('')

    const [open, setOpen] = useState(false)

    useEffect(()=>{
        setCalendar(format(new Date(), 'MM/dd/yyyy'))
    },[])

    const handleSelect = (date) => {
        console.log(format(date, 'MM/dd/yyyy'))
        setCalendar(format( date, 'MM/dd/yyyy'))
    }


    return (
        <div className='calendarWrap'>
            <input 
                value = { calendar }
                readOnly
                className='inputBox'
            />

            {open &&
                <Calendar
                    date = { new Date() }
                    onChange = { handleSelect }
                    className = "calendarElement"
                />
            }
            Calendar!
        </div>
    )

}

export default CalendarComp