import { useState } from 'react';

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage('Fyll i gmail och password.');
      return;
    }

    const savedUsers = JSON.parse(localStorage.getItem('users')) || [];

    const matchedUser = savedUsers.find(
      (user) =>
        user.email.toLowerCase() === email.toLowerCase() &&
        user.password === password
    );

    if (!matchedUser) {
      setMessage('Fel gmail eller password.');
      return;
    }

    localStorage.setItem('loggedInUser', JSON.stringify(matchedUser));
    onLogin(matchedUser);

    setMessage(`Välkommen ${matchedUser.firstName}!`);
    setEmail('');
    setPassword('');
  };

  return (
    <section className="form-section">
      <h2>Logga in</h2>

      <form className="form-card" onSubmit={handleLogin}>
        <label>Gmail</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Skriv din gmail"
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Skriv ditt lösenord"
        />

        <button type="submit">Logga in</button>

        {message && <p className="form-message">{message}</p>}
      </form>
    </section>
  );
}

export default LoginForm;