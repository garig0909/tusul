import React, { useState } from 'react';
import axios from 'axios';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [token, setToken] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/token/', {
        username,
        password,
      });
      localStorage.setItem('accessToken', res.data.access);
      localStorage.setItem('refreshToken', res.data.refresh);
      setToken(res.data.access);
      setError('');
    } catch {
      setError('Нэвтрэхэд алдаа гарлаа');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card mx-auto" style={{ maxWidth: 400 }}>
        <div className="card-body">
          <h3 className="card-title text-center mb-4">Нэвтрэх</h3>
          {token && <div className="alert alert-success">Амжилттай нэвтэрлээ</div>}
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Нэвтрэх нэр</label>
              <input type="text" className="form-control" value={username}
                onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label>Нууц үг</label>
              <input type="password" className="form-control" value={password}
                onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button className="btn btn-primary w-100" type="submit">Нэвтрэх</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
