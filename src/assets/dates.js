// const dates = [
//     { date: "12-02-2025", day: "Wednesday" },
//     { date: "13-02-2025", day: "Thursday" },
//     { date: "14-02-2025", day: "Friday" },
//     { date: "15-02-2025", day: "Saturday" },
//     { date: "16-02-2025", day: "Sunday" },
//     { date: "17-02-2025", day: "Monday" },
//     { date: "18-02-2025", day: "Tuesday" }
//   ];
  
//   export default dates;
  
const getCurrentWeekDates = () => {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // Adjust for Sunday
  
  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(today.getDate() + mondayOffset + i);
    
    // Format date as dd/mm/yyyy
    const formattedDate = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;

    return {
      date: formattedDate, // Format: dd/mm/yyyy
      day: date.toLocaleDateString("en-US", { weekday: "long" }) // Day of the week
    };
  });

  return weekDates;
};

export default getCurrentWeekDates;


