import { useEffect, useState } from 'react';
import Header from './components/Header';
import RoomSelector from './components/RoomSelector';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import ForgotPassword from './components/ForgotPassword';
import BookingForm from './components/BookingForm';
import BookingConfirmation from './components/BookingConfirmation';
import MyBookings from './components/MyBookings';

function App() {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(
    JSON.parse(localStorage.getItem('loggedInUser')) || null
  );
  const [booking, setBooking] = useState(null);
  const [bookedRoomNumbers, setBookedRoomNumbers] = useState([]);

  const rooms = [
    {
      id: 1,
      name: 'Standard Room',
      roomNumber: 214,
      floor: 2,
      price: '900 kr / natt',
      description: 'Ett enkelt och bekvämt rum för en lugn vistelse.'
    },
    {
      id: 2,
      name: 'Deluxe Room',
      roomNumber: 362,
      floor: 3,
      price: '1400 kr / natt',
      description: 'Ett större rum med modern känsla och extra komfort.'
    },
    {
      id: 3,
      name: 'Suite',
      roomNumber: 415,
      floor: 4,
      price: '2200 kr / natt',
      description: 'Ett exklusivt rum för gäster som vill ha det lilla extra.'
    }
  ];

  useEffect(() => {
    const updateRoomAvailability = () => {
      const savedBookings = JSON.parse(localStorage.getItem('bookings')) || [];
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const activeBookings = savedBookings.filter((booking) => {
        const checkOutDate = new Date(booking.checkOut);
        checkOutDate.setHours(0, 0, 0, 0);
        return checkOutDate > today;
      });

      localStorage.setItem('bookings', JSON.stringify(activeBookings));

      const activeRoomNumbers = activeBookings.map(
        (booking) => booking.roomNumber
      );

      setBookedRoomNumbers(activeRoomNumbers);

      if (
        selectedRoom &&
        activeRoomNumbers.includes(selectedRoom.roomNumber)
      ) {
        setSelectedRoom(null);
      }
    };

    updateRoomAvailability();
    window.addEventListener('storage', updateRoomAvailability);

    return () => {
      window.removeEventListener('storage', updateRoomAvailability);
    };
  }, [selectedRoom, booking]);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setLoggedInUser(null);
    setBooking(null);
  };

  const handleBookingCreated = (newBooking) => {
    setBooking(newBooking);

    const savedBookings = JSON.parse(localStorage.getItem('bookings')) || [];
    const activeRoomNumbers = savedBookings.map((item) => item.roomNumber);
    setBookedRoomNumbers(activeRoomNumbers);

    if (selectedRoom && activeRoomNumbers.includes(selectedRoom.roomNumber)) {
      setSelectedRoom(null);
    }
  };

  return (
    <div className="app">
      <Header />

      <main className="container">
        <section className="hero">
          <div className="hero-text">
            <p className="small-title">Välkommen till vårt hotell</p>
            <h1>Boka ditt rum i modern och klassisk stil</h1>
            <p>
              Varje användare och varje bokning har eget ID.
            </p>
          </div>
        </section>

        <RoomSelector
          rooms={rooms}
          selectedRoom={selectedRoom}
          setSelectedRoom={setSelectedRoom}
          bookedRoomNumbers={bookedRoomNumbers}
        />

        {selectedRoom && !bookedRoomNumbers.includes(selectedRoom.roomNumber) && (
          <section className="selected-room-box">
            <h2>Ditt valda rum</h2>
            <p><strong>Rum typ:</strong> {selectedRoom.name}</p>
            <p><strong>Rum nummer:</strong> {selectedRoom.roomNumber}</p>
            <p><strong>Våning:</strong> {selectedRoom.floor}</p>
            <p><strong>Pris:</strong> {selectedRoom.price}</p>
          </section>
        )}

        <RegisterForm />
        <LoginForm onLogin={setLoggedInUser} />
        <ForgotPassword />

        {loggedInUser && (
          <>
            <section className="selected-room-box">
              <h2>Aktiv användare</h2>
              <p><strong>User ID:</strong> {loggedInUser.userId}</p>
              <p><strong>Namn:</strong> {loggedInUser.firstName} {loggedInUser.lastName}</p>
              <p><strong>Gmail:</strong> {loggedInUser.email}</p>

              <button onClick={handleLogout}>Logga ut</button>
            </section>

            {selectedRoom && !bookedRoomNumbers.includes(selectedRoom.roomNumber) && !booking && (
              <BookingForm
                selectedRoom={selectedRoom}
                loggedInUser={loggedInUser}
                onBookingCreated={handleBookingCreated}
              />
            )}

            {booking && (
              <BookingConfirmation
                booking={booking}
                onNewBooking={() => {
                  setBooking(null);
                  setSelectedRoom(null);
                }}
              />
            )}

            <MyBookings loggedInUser={loggedInUser} />
          </>
        )}
      </main>
    </div>
  );
}

export default App;