import React, { useState } from 'react';
import axios from 'axios';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://127.0.0.1:8000/api/register/', {
      username, email, password
    });
    setSuccess(true);
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-sm">
        <h2 className="mb-4">Бүртгүүлэх</h2>
        {success && <div className="alert alert-success">Амжилттай бүртгэгдлээ!</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Нэвтрэх нэр</label>
            <input className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label>Имэйл</label>
            <input className="form-control" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label>Нууц үг</label>
            <input className="form-control" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button className="btn btn-primary">Бүртгүүлэх</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
