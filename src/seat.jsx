import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Movies from './components/moviesselect';
import Cinema from './components/Cinema';
import { useSeat } from './context/SeatContext';
import { Link } from 'react-router-dom';

export default function Seat() {
  const { id } = useParams();
  const [selectedMovie, setSelectedMovie] = useState({
    name: 'Avenger',
    price: 10,
    occupied: [0, 1, 2],
  });

  const [selectedSeats, setSelectedSeats] = useState([]); 
  const [showtime, setShowtimeinfo] = useState([]);
  const [ischecklist, setchecklist] = useState(false);

  useEffect(() => {
    const fetchShowtimeData = async () => {
      try {
        const res = await axios.get(`https://reset-password-backend-1.onrender.com/seat/${id}`);
        setShowtimeinfo(res.data);
      } catch (error) {
        console.error('Error fetching showtime data:', error);
      }
    };
    fetchShowtimeData();
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-12 px-6">
    {/* Heading */}
    <h1 className="text-4xl font-extrabold mb-8 text-center">
      🎟️ Book Your Seats for <span className="text-yellow-400">{selectedMovie.name}</span>
    </h1>
  
    {/* Movie Selection Dropdown */}
    <Movies
      movie={selectedMovie}
      onChange={(movie) => {
        setSelectedSeats([]);
        setSelectedMovie(movie);
      }}
    />
  
    {/* Cinema Seat Layout */}
    <Cinema movie={selectedMovie} selectedSeats={selectedSeats} onSelectedSeatsChange={setSelectedSeats} />
  
    {/* Selection Summary */}
    <p className="text-xl font-medium mt-8 bg-gray-800 py-4 px-6 rounded-lg shadow-md">
      You have selected <span className="text-yellow-400 font-bold">{selectedSeats.length}</span> seats 
      for a total price of <span className="text-green-400 font-bold">{selectedSeats.length * selectedMovie.price}$</span>
    </p>
  
    {/* Booking Button */}
    <div className="mt-8">
      <Link to={`/seat/checklist/${showtime._id}`}>
        <button className="bg-gradient-to-r from-red-600 to-red-800 hover:scale-105 transition-all duration-200 text-white font-semibold py-3 px-8 rounded-lg shadow-xl">
          Proceed to Booking 🚀
        </button>
      </Link>
    </div>
  </div>
  
  );
}
