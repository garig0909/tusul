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
    <div className="container mt-5">
      <div className="card p-4 shadow-sm">
        <h2 className="mb-4">Хувийн мэдээлэл</h2>
        {user ? (
          <>
            <p><strong>Нэр:</strong> {user.username}</p>
            <p><strong>Имэйл:</strong> {user.email}</p>
          </>
        ) : (
          <p className="text-muted">Ачааллаж байна...</p>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
