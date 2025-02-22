import DateList from '../Components/DateList';
import Header from '../Components/Header';
import Todos from '../Components/Todos';
import React, { useEffect, useState } from 'react';
import { FaMastodon } from "react-icons/fa";
import PromptField from '../Components/PromptField'; // Import PromptField
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate()
  const [currDate, setCurrDate] = useState({});
  const [SelectedDate, setSelectedDate] = useState(currDate);
  const [showPromptField, setShowPromptField] = useState(false); // State to control PromptField visibility

  const getCurrentDateTime = () => {
    const now = new Date();
    const date = now.toLocaleDateString("en-GB"); // "12-02-2025"
    const day = now.toLocaleDateString("en-US", { weekday: "long" }); // "Tuesday"
    const time = now.toLocaleTimeString("en-US", { hour12: false }); // "14:30:15"
    return { date, day, time };
  };

  useEffect(() => {
    setCurrDate(getCurrentDateTime());
    setSelectedDate(getCurrentDateTime());
  }, []);



  return (
    <>
      <div className='w-[100vw] flex flex-col md:flex-row'>
        <Header currDate={currDate} />
        <DateList currDate={currDate}
          SelectedDate={SelectedDate}
          setSelectedDate={setSelectedDate}
        />
      </div>
      <Todos currDate={currDate}
        SelectedDate={SelectedDate}
        setSelectedDate={setSelectedDate}
      />

      {/* Floating AI button */}
      <div className='fixed bottom-1 w-[100vw] flex flex-row-reverse justify-between'>
        <div className='flex justify-center items-center animate-pulse mx-4'>
          <button onClick={() => setShowPromptField(true)}>
            <FaMastodon className='text-[2rem] sm:text-[3rem] md:text-[5rem]  text-red-700 shadow-2xl rounded-[50%] hover:text-red-700 transition-all' />
          </button>
        </div>
        <div className='flex justify-center items-center mx-4'>
          <button onClick={() => navigate('/addtodo')}>
            <FaPlus className='text-[2rem] sm:text-[3rem] md:text-[5rem]  text-gray-500 shadow-2xl rounded-[50%] hover:text-gray-600 transition-all' />
          </button>
        </div>
      </div>

      {/* Show PromptField when state is true */}
      {showPromptField && (
        <div className="fixed inset-0 bg-black/40 flex justify-end items-end z-50">

          <PromptField onClose={() => setShowPromptField(false)} />
        </div>
      )}
    </>
  );
}

export default App;
