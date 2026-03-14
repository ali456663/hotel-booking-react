import { useState } from 'react';

function BookingForm({ selectedRoom, loggedInUser, onBookingCreated }) {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');

  const generateBookingId = () => {
    return `BOOK-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  };

  const handleBooking = () => {
    if (!checkIn || !checkOut) {
      alert('Välj check-in och check-out.');
      return;
    }

    if (checkOut <= checkIn) {
      alert('Check-out måste vara efter check-in.');
      return;
    }

    const savedBookings = JSON.parse(localStorage.getItem('bookings')) || [];

    const roomAlreadyBooked = savedBookings.some((booking) => {
      if (booking.roomNumber !== selectedRoom.roomNumber) return false;

      const existingCheckIn = new Date(booking.checkIn);
      const existingCheckOut = new Date(booking.checkOut);
      const newCheckIn = new Date(checkIn);
      const newCheckOut = new Date(checkOut);

      return newCheckIn < existingCheckOut && newCheckOut > existingCheckIn;
    });

    if (roomAlreadyBooked) {
      alert('Detta rum är redan bokat under vald period.');
      return;
    }

    const newBooking = {
      bookingId: generateBookingId(),
      userId: loggedInUser.userId,
      firstName: loggedInUser.firstName,
      lastName: loggedInUser.lastName,
      email: loggedInUser.email,
      roomId: selectedRoom.id,
      room: selectedRoom.name,
      roomNumber: selectedRoom.roomNumber,
      floor: selectedRoom.floor,
      address: 'TeamWater Hotel, Drottninggatan 12, Stockholm',
      checkIn,
      checkOut
    };

    savedBookings.push(newBooking);
    localStorage.setItem('bookings', JSON.stringify(savedBookings));

    onBookingCreated(newBooking);

    setCheckIn('');
    setCheckOut('');
  };

  return (
    <section className="form-section">
      <h2>Slutför din bokning</h2>

      <div className="form-card">
        <p><strong>Gäst:</strong> {loggedInUser.firstName} {loggedInUser.lastName}</p>
        <p><strong>Gmail:</strong> {loggedInUser.email}</p>
        <p><strong>User ID:</strong> {loggedInUser.userId}</p>
        <p><strong>Rum typ:</strong> {selectedRoom.name}</p>
        <p><strong>Rum nummer:</strong> {selectedRoom.roomNumber}</p>
        <p><strong>Våning:</strong> {selectedRoom.floor}</p>
        <p><strong>Pris:</strong> {selectedRoom.price}</p>

        <label>Check-in</label>
        <input
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
        />

        <label>Check-out</label>
        <input
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
        />

        <button onClick={handleBooking}>Bekräfta bokning</button>
      </div>
    </section>
  );
}

export default BookingForm;