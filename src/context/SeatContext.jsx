import React, { createContext, useContext, useState } from 'react';

// Create Context
const SeatContext = createContext();

// Provider Component
export const SeatProvider = ({ children }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState({
    name: 'Avenger',
    price: 10,
    occupied: [0, 1, 2],
  });

  const movies = [
    { name: 'Avenger', price: 10, occupied: [0, 1, 2] },
    { name: 'Joker', price: 12, occupied: [9, 41, 35, 11, 65, 26] },
    { name: 'Toy story', price: 8, occupied: [37, 25, 44, 13, 2, 3] },
    { name: 'The Lion King', price: 9, occupied: [10, 12, 50, 33, 28, 47] },
  ];

  // Handle seat selection
  const handleSelectedState = (seat) => {
    setSelectedSeats((prevSelectedSeats) =>
      prevSelectedSeats.includes(seat)
        ? prevSelectedSeats.filter((selectedSeat) => selectedSeat !== seat)
        : [...prevSelectedSeats, seat]
    );
    console.log(selectedSeats,"selectedSeats>>>>>");
    
  };

  return (
    <SeatContext.Provider value={{ selectedSeats, setSelectedSeats, selectedMovie, setSelectedMovie, movies, handleSelectedState }}>
      {children}
    </SeatContext.Provider>
  );
};

// Custom Hook to use Seat Context
export const useSeat = () => useContext(SeatContext);
