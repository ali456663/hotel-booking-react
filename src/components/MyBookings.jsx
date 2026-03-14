function MyBookings({ loggedInUser }) {
  if (!loggedInUser) {
    return null;
  }

  const allBookings = JSON.parse(localStorage.getItem('bookings')) || [];

  const userBookings = allBookings.filter(
    (booking) => booking.userId === loggedInUser.userId
  );

  const cancelBooking = (bookingId) => {
    const savedBookings = JSON.parse(localStorage.getItem('bookings')) || [];

    const updatedBookings = savedBookings.filter(
      (booking) => booking.bookingId !== bookingId
    );

    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    window.location.reload();
  };

  return (
    <section className="form-section">
      <h2>Mina bokningar</h2>

      {userBookings.length === 0 ? (
        <div className="form-card">
          <p>Du har ännu inga bokningar.</p>
        </div>
      ) : (
        <div className="bookings-grid">
          {userBookings.map((booking) => (
            <div className="booking-card" key={booking.bookingId}>
              <h3>Bokning</h3>

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

              <button onClick={() => cancelBooking(booking.bookingId)}>
                Avboka denna bokning
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default MyBookings;