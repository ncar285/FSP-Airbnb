// import './Calendar.css'
import { Calendar } from 'react-date-range'
import format from 'date-fns/format'

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { useEffect, useRef, useState } from 'react'

const DateRangePicker = () => {

    const [calendar, setCalendar] = useState('')
    const [open, setOpen] = useState(false)
    const refOne = useRef(null)

    const handleSelect = (date) => {
        setCalendar(format( date, 'MM/dd/yyyy'))
    }

    useEffect(()=>{
        setCalendar(format(new Date(), 'MM/dd/yyyy'))
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
            <input 
                value = { calendar }
                readOnly
                className='inputBox'
                onClick = { () => setOpen(open => !open)}
            />

            <div ref={refOne}>
                {open &&
                    <Calendar
                        date = { new Date() }
                        onChange = { handleSelect }
                        className = "calendarElement"
                    />
                }
            </div>
            DateRangePicker!
        </div>
    )

}

export default DateRangePicker