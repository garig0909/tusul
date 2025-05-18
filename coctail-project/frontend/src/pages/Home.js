
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';

function Home() {
  const [cocktails, setCocktails] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [likedIds, setLikedIds] = useState(() => {
    const stored = localStorage.getItem('likedCocktails');
    return stored ? JSON.parse(stored) : [];
  });
  const [showOnlyLiked, setShowOnlyLiked] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    axiosInstance.get('/api/cocktails/')
      .then(res => setCocktails(res.data))
      .catch(err => console.error('Алдаа:', err));

    axiosInstance.get('/api/profile/')
      .then(res => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  const toggleLike = (id) => {
    const updated = likedIds.includes(id)
      ? likedIds.filter(i => i !== id)
      : [...likedIds, id];
    setLikedIds(updated);
    localStorage.setItem('likedCocktails', JSON.stringify(updated));
  };

  const handleDelete = (id) => {
    if (window.confirm("Энэ коктейлийг устгах уу?")) {
      axiosInstance.delete(`/api/cocktails/${id}/`)
        .then(() => {
          setCocktails(prev => prev.filter(c => c.id !== id));
        })
        .catch(err => {
          console.error("Устгах үед алдаа:", err);
          alert("Устгахад алдаа гарлаа.");
        });
    }
  };

  const filteredCocktails = cocktails.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (!showOnlyLiked || likedIds.includes(c.id))
  );

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">🍹 Коктейлийн жагсаалт</h2>

      {/* Хайлт */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Коктейлийн нэрээр хайх..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Зөвхөн дуртай toggle */}
      <div className="form-check mb-4">
        <input
          className="form-check-input"
          type="checkbox"
          id="showLikedOnly"
          checked={showOnlyLiked}
          onChange={() => setShowOnlyLiked(!showOnlyLiked)}
        />
        <label className="form-check-label" htmlFor="showLikedOnly">
          Зөвхөн таалагдсан коктейль үзэх
        </label>
      </div>

      <div className="row">
        {filteredCocktails.length > 0 ? (
          filteredCocktails.map(c => (
            <div className="col-md-4 mb-4" key={c.id}>
              <div className="card h-100 shadow-sm">
                <Link to={`/cocktail/${c.id}`} className="text-decoration-none text-dark">
                  {c.image && (
                    <img
                      src={c.image}
                      className="card-img-top"
                      alt={c.name}
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                  )}
                  <div className="card-body">
                    <h5 className="card-title">{c.name}</h5>
                    <p className="card-text text-truncate">{c.ingredients}</p>
                  </div>
                </Link>

                <div className="card-footer d-flex justify-content-between">
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => toggleLike(c.id)}
                  >
                    {likedIds.includes(c.id) ? '❤️' : '🤍'}
                  </button>

                  {user?.is_admin && (
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => handleDelete(c.id)}
                    >
                      🗑️
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted">Хайлтад тохирох коктейль олдсонгүй...</p>
        )}
      </div>
    </div>
  );
}

export default Home;
