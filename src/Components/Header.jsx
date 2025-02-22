import months from '../assets/months';

function Header({currDate}) {
    
      
  return (
    <div className=' p-3 w-full bg-none md:bg-slate-100'>
        <p>
            <span className='font-bold'>{currDate.day}</span>
            <span className='text-slate-400'>&nbsp;{currDate?.date?.split('/')[0]}th&nbsp;{months[parseInt(currDate?.date?.split('/')[1])]}</span>
        </p>
        <h1 className='text-3xl font-bold'>ToDo List</h1>
    </div>
  )
}

export default Header