import React from 'react'
import { FaCalendarDays } from "react-icons/fa6";
import { FaCalendarCheck } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

export default function TodoItem({id, currDate, title, description, completed, dueDate,removeTodo,createdAt}) {
    const navigate = useNavigate()
    return (
        <div className={`${completed?'bg-green-200':'bg-red-50'} grid grid-cols-[2rem_auto_2rem]  items-center gap-4 p-4 m-1 rounded-tl-[3rem] rounded-br-[3rem]`}>
            <div>
                {completed ? <FaCalendarCheck className='text-green-400'/> : <FaCalendarDays className='text-red-400'/>}
            </div>
            <div className='flex flex-col'>
                <p className='text-xs text-slate-500'>{createdAt}</p>
                <p className='text-lg font-bold'>{title}</p>
                <p className='text-xs text-slate-500'>{description}</p>
            </div>
            <div className='flex flex-col justify-between gap-y-5'>
                <FaRegEdit onClick={() => navigate(`/updatetodo?id=${id}&title=${title}&description=${description}&completed=${completed}&dueDate=${dueDate}&createdAt=${createdAt}`)}/>
                <MdOutlineDelete
                    onClick={()=>removeTodo(id)}
                    className='cursor-pointer' />
            </div>
        </div>
    )
}
