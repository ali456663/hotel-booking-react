import { useState } from 'react';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleResetPassword = (e) => {
    e.preventDefault();

    if (!email || !newPassword) {
      setMessage('Fyll i gmail och nytt lösenord.');
      return;
    }

    const savedUsers = JSON.parse(localStorage.getItem('users')) || [];

    const userIndex = savedUsers.findIndex(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );

    if (userIndex === -1) {
      setMessage('Ingen användare hittades med denna gmail.');
      return;
    }

    savedUsers[userIndex].password = newPassword;
    localStorage.setItem('users', JSON.stringify(savedUsers));

    if (
      JSON.parse(localStorage.getItem('loggedInUser'))?.email?.toLowerCase() ===
      email.toLowerCase()
    ) {
      localStorage.setItem('loggedInUser', JSON.stringify(savedUsers[userIndex]));
    }

    setMessage('Lösenordet är ändrat. Nu kan du logga in med din gmail.');
    setEmail('');
    setNewPassword('');
  };

  return (
    <section className="form-section">
      <h2>Glömt lösenord?</h2>

      <form className="form-card" onSubmit={handleResetPassword}>
        <label>Gmail</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Skriv din gmail"
        />

        <label>Nytt password</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Skriv nytt lösenord"
        />

        <button type="submit">Återställ lösenord</button>

        {message && <p className="form-message">{message}</p>}
      </form>
    </section>
  );
}

export default ForgotPassword;