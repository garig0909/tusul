import React, { useState } from 'react';
import axios from 'axios';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/register/', {
        username,
        email,
        password,
      });
      setSuccess(true);
      setError('');
    } catch {
      setError('Бүртгэхэд алдаа гарлаа');
      setSuccess(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card mx-auto" style={{ maxWidth: 400 }}>
        <div className="card-body">
          <h3 className="card-title text-center mb-4">Бүртгүүлэх</h3>
          {success && <div className="alert alert-success">Амжилттай бүртгэгдлээ!</div>}
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Нэвтрэх нэр</label>
              <input type="text" className="form-control" value={username}
                onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label>Имэйл</label>
              <input type="email" className="form-control" value={email}
                onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label>Нууц үг</label>
              <input type="password" className="form-control" value={password}
                onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button className="btn btn-primary w-100" type="submit">Бүртгүүлэх</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
