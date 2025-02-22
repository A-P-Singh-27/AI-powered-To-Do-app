import React from 'react'
import getCurrentWeekDates from '../assets/dates'

function DateList({currDate, SelectedDate, setSelectedDate}) {
    // console.log(getCurrentWeekDates());
    const weekdates = getCurrentWeekDates();
    // console.log(weekdates);
    console.log(SelectedDate,currDate);
    
    const setdate = (dateselected)=>{
      setSelectedDate(dateselected)
    }
    

  return (
    <div className='flex gap-2 w-full p-4 bg-slate-100'>
        {
            weekdates?.map((date,index)=>(
                <div 
                onClick={()=>setdate(date)}
                key={index} className={` p-2 flex flex-col items-center w-[4rem] rounded-tl-[50%] rounded-br-[50%] ${date?.date?.split('/')[0]==SelectedDate?.date?.split('/')[0]?'bg-red-100':date?.date?.split('/')[0]==currDate?.date?.split('/')[0]?'bg-green-200':'bg-slate-200'}`}>
                    <p className='font-semibold'>{date?.date?.split('/')[0]}</p>
                    <p className='text-[10px] font-semibold'>{date.day.slice(0,3)}</p>
                </div>
            ))
        }
    </div>
  )
}

export default DateList