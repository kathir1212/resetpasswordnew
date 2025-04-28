import React from 'react';
import clsx from 'clsx';
import { useSeat } from '../context/SeatContext';

const seats = Array.from({ length: 8 * 8 }, (_, i) => i);

export default function Cinema() {
  const { selectedMovie, selectedSeats, handleSelectedState } = useSeat();

  return (
    <div className="Cinema">
      <div className="screen" />
      <div className="seats">
        {seats.map((seat) => {
          const isSelected = selectedSeats.includes(seat);
          const isOccupied = selectedMovie.occupied.includes(seat);

          return (
            <span
              tabIndex="0"
              key={seat}
              className={clsx('seat', isSelected && 'selected', isOccupied && 'occupied')}
              onClick={isOccupied ? null : () => handleSelectedState(seat)}
              onKeyPress={
                isOccupied
                  ? null
                  : (e) => {
                      if (e.key === 'Enter') {
                        handleSelectedState(seat);
                      }
                    }
              }
            />
          );
        })}
      </div>
    </div>
  );
}
