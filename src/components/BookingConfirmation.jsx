function BookingConfirmation({ booking, onNewBooking }) {
  if (!booking) {
    return null;
  }

  return (
    <section className="selected-room-box">
      <h2>Bokningen är bekräftad</h2>

      <p><strong>Boknings-ID:</strong> {booking.bookingId}</p>
      <p><strong>User ID:</strong> {booking.userId}</p>
      <p><strong>Namn:</strong> {booking.firstName} {booking.lastName}</p>
      <p><strong>Gmail:</strong> {booking.email}</p>
      <p><strong>Adress:</strong> {booking.address}</p>
      <p><strong>Rum typ:</strong> {booking.room}</p>
      <p><strong>Rum nummer:</strong> {booking.roomNumber}</p>
      <p><strong>Våning:</strong> {booking.floor}</p>
      <p><strong>Check-in:</strong> {booking.checkIn}</p>
      <p><strong>Check-out:</strong> {booking.checkOut}</p>

      <button onClick={onNewBooking}>Gör en ny bokning</button>
    </section>
  );
}

export default BookingConfirmation;
