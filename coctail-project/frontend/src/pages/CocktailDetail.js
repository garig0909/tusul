import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';

function CocktailDetail() {
    const { id } = useParams();
    const [cocktail, setCocktail] = useState(null);

    useEffect(() => {
        axiosInstance.get(`/api/cocktails/${id}/`)
            .then(res => setCocktail(res.data))
            .catch(err => console.error("Алдаа:", err));
    }, [id]);

    if (!cocktail) return <p className="text-center mt-5">Ачааллаж байна...</p>;

    return (
        <div className="container mt-5">
            <div className="card shadow-sm p-4">
                <div className="row">
                    {/* Зураг - зүүн талд */}
                    <div className="col-md-4 mb-3">
                        {cocktail.image && (
                            <img
                                src={cocktail.image}
                                alt={cocktail.name}
                                className="img-fluid"
                                style={{ width: '100%', height: 'auto' }}
                            />
                        )}
                    </div>

                    {/* Текст - баруун талд */}
                    <div className="col-md-8">
                        <h2>{cocktail.name}</h2>
                        <p><strong>Орц:</strong> {cocktail.ingredients}</p>
                        <p><strong>Хийх заавар:</strong> {cocktail.instructions}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CocktailDetail;
