function RoomSelector({ rooms, selectedRoom, setSelectedRoom, bookedRoomNumbers }) {
  return (
    <section className="room-section">
      <h2>Välj ditt rum</h2>
      <p className="section-text">
        Rum som redan är bokade visas som inte tillgängliga.
      </p>

      <div className="room-grid">
        {rooms.map((room) => {
          const isBooked = bookedRoomNumbers.includes(room.roomNumber);

          return (
            <div
              key={room.id}
              className={`room-card ${
                selectedRoom?.id === room.id ? 'active-room' : ''
              } ${isBooked ? 'booked-room' : ''}`}
            >
              <h3>{room.name}</h3>
              <p>{room.description}</p>
              <p><strong>Rum nummer:</strong> {room.roomNumber}</p>
              <p><strong>Våning:</strong> {room.floor}</p>
              <p><strong>Pris:</strong> {room.price}</p>
              <p><strong>Status:</strong> {isBooked ? 'Inte tillgänglig' : 'Ledig'}</p>

              <button
                onClick={() => setSelectedRoom(room)}
                disabled={isBooked}
              >
                {isBooked ? 'Inte tillgänglig' : 'Välj detta rum'}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default RoomSelector;