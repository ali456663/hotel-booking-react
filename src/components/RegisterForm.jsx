import { useState } from 'react';

function RegisterForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const generateUserId = () => {
    return `USER-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !password) {
      setMessage('Alla fält måste fyllas i.');
      return;
    }

    const savedUsers = JSON.parse(localStorage.getItem('users')) || [];

    const emailExists = savedUsers.find(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );

    if (emailExists) {
      setMessage('Denna gmail finns redan registrerad.');
      return;
    }

    const newUser = {
      userId: generateUserId(),
      firstName,
      lastName,
      email,
      password
    };

    savedUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(savedUsers));

    setMessage('Registrering lyckades! Nu kan du logga in med gmail.');

    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
  };

  return (
    <section className="form-section">
      <h2>Registrera dig</h2>

      <form className="form-card" onSubmit={handleRegister}>
        <label>Förnamn</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Skriv ditt förnamn"
        />

        <label>Efternamn</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Skriv ditt efternamn"
        />

        <label>Gmail</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Skriv din gmail"
        />

        <label>Lösenord</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Skapa ett lösenord"
        />

        <button type="submit">Registrera</button>

        {message && <p className="form-message">{message}</p>}
      </form>
    </section>
  );
}

export default RegisterForm;