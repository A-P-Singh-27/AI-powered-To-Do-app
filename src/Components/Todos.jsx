import React, { useEffect, useState } from 'react'
// import todosfordo from '../assets/todos';
import TodoItem from './todoItem';
import Calendar from 'react-calendar/dist/cjs/Calendar.js';
import 'react-calendar/dist/Calendar.css';
function Todos({ currDate, SelectedDate, setSelectedDate }) {
    const [todos, setTodos] = useState([])
    const [sortby, setSortby] = useState('All')


    useEffect(() => {
        const interval = setInterval(() => {
            const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];

            const filteredTodos = storedTodos.filter(todo => {
                if (!(todo?.createdAt)) {
                    return
                }
                const todoDate = todo?.createdAt.split(',')[0].split('/')[0]; // Extract "DD/MM/YYYY" from "DD/MM/YYYY, hh:mm:ss"
                return todoDate == SelectedDate?.date.split('/')[0];
            }).reverse();
            // console.log(filteredTodos);
            // console.log(sortby);

            if (sortby == 'All') {
                setTodos(filteredTodos);
            } else if (sortby == 'Completed') {
                const completedTodo = filteredTodos?.filter(todo => {
                    return todo?.completed == true;
                })
                setTodos(completedTodo);
            } else if (sortby == 'Active') {
                const UncompletedTodo = filteredTodos?.filter(todo => {
                    return todo?.completed == false;
                })
                setTodos(UncompletedTodo);
            }
        }, 10);

        return () => clearInterval(interval);
    }, [SelectedDate, sortby])
    const removeTodo = (id) => {
        const updatedTodos = todos.filter(todo => todo.id !== id); // Remove the selected todo
        setTodos(updatedTodos);
        localStorage.setItem('todos', JSON.stringify(updatedTodos)); // Update localStorage
        alert("todo Removed succesfully!");
    };
    return (
        <div className='w-full relative flex flex-col'>
            <div className='bg-slate-50 w-full h-[1.5rem] flex justify-end px-4  text-xs text-slate-500'>
                {
                    ['All', 'Completed', 'Active'].map((sort, index) => (
                        <span
                            onClick={() => setSortby(sort)}
                            className={`${sortby == sort ? 'bg-gray-200 font-semibold' : 'bg-none'} text-xs rounded-full px-2 text-center leading-5.5`}>{sort}</span>
                    ))
                }
            </div>
            <div className="flex w-full px-10 mt-2 gap-6">
  {/* Calendar Section */}
  <div className="w-[30vw] p-4 hidden md:block">
    <Calendar />
    
  </div>

  {/* Todo List Section */}
  <div className={`w-[100vw] md:w-[70vw] ${todos?.length === 0 ? 'h-[70vh] justify-center items-center' : 'h-auto'} md:px-40 p-4 flex flex-col gap-4`}>
    {todos && todos.length > 0 ? (
      todos.map((todo, index) => (
        <div key={index}>
          <TodoItem
            id={todo.id}
            currDate={currDate}
            title={todo?.title}
            description={todo?.description}
            completed={todo?.completed}
            dueDate={todo?.dueDate}
            removeTodo={removeTodo}
            createdAt={todo.createdAt}
          />
        </div>
      ))
    ) : (
      sortby === 'All' ? (
        <p className="text-center text-gray-500 text-lg font-semibold">
          No Todos at {SelectedDate?.date}, {SelectedDate.day}
        </p>
      ) : (
        <p className="text-center text-gray-500 text-lg font-semibold">
          No Todos in {sortby} at {SelectedDate?.date}, {SelectedDate.day}
        </p>
      )
    )}
  </div>
</div>


        </div>
    )
}

export default Todos