import React from 'react'
import { useSeat } from './context/SeatContext';
import { useState , useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';



function Bookticketchecklist() {
      const { selectedSeats, setSelectedSeats } = useSeat(); 
        const { id } = useParams(); 
      

      const [data, setData] = useState(null);

        const [showtime, setShowtimeinfo] = useState([]);
      
       
      
        useEffect(() => {
          const fetchShowtimeData = async () => {
            try {
              const res = await axios.get(`https://reset-password-backend-1.onrender.com/seat/${id}`);
              console.log(res.data._id);
              
              setShowtimeinfo(res.data);
            } catch (error) {
              console.error('Error fetching showtime data:', error);
            }
          };
          fetchShowtimeData();
        }, [id]);



  const handlePost = async () => {
    try {
      const response = await fetch("https://reset-password-backend-1.onrender.com/booking/ticket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          showtime: showtime._id,
          user: "67b35641c9bf47056fce801c",
          seatsBooked: selectedSeats.length,
          seatNumbers: selectedSeats
      }),
      });

      console.log(response,"response>>>>>");
      

      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error:", error);
    }
  };



      

  return (
    <>
    <div className='mt-[4rem]'>
      {selectedSeats.map((seat,index)=>(
        
        <div key={index}>
          <h1>{seat}</h1>
          <h1>kathirve</h1>
          
        </div>
        
      ))}
    </div>
    <div>
    <button onClick={()=>{
      handlePost()
    }}>submit</button>
  </div>
    </>
    
  )
}

export default Bookticketchecklist