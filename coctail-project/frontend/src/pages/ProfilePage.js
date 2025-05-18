import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';

function ProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axiosInstance.get('/api/profile/')
      .then(res => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card p-5 shadow-lg rounded-4" style={{ maxWidth: '500px', width: '100%' }}>
        <div className="text-center mb-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png"
            alt="Avatar"
            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
            className="rounded-circle shadow-sm"
          />
        </div>
        <h3 className="text-center mb-4">👨‍💼 Хувийн мэдээлэл</h3>
        {user ? (
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <strong>👨‍💼 Нэр:</strong> {user.username}
            </li>
            <li className="list-group-item">
              <strong>📧 Имэйл:</strong> {user.email}
            </li>
          </ul>
        ) : (
          <p className="text-muted text-center">Ачааллаж байна...</p>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
