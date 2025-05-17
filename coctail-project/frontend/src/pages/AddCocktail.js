import React, { useState } from 'react';
import axiosInstance from '../utils/axiosInstance';

function AddCocktail() {
    const [name, setName] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');
    const [image, setImage] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('ingredients', ingredients);
        formData.append('instructions', instructions);
        if (image) formData.append('image', image);

        try {
            await axiosInstance.post('/api/cocktails/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setSuccess(true);
            setName('');
            setIngredients('');
            setInstructions('');
            setImage(null);
        } catch (error) {
            console.error('Алдаа:', error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="card p-4 shadow-sm">
                <h2 className="mb-4">Коктейль нэмэх</h2>
                {success && <div className="alert alert-success">Амжилттай нэмэгдлээ!</div>}
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="mb-3">
                        <label>Нэр</label>
                        <input className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label>Орц</label>
                        <textarea className="form-control" value={ingredients} onChange={(e) => setIngredients(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label>Хийх заавар</label>
                        <textarea className="form-control" value={instructions} onChange={(e) => setInstructions(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label>Зураг</label>
                        <input type="file" className="form-control" onChange={(e) => setImage(e.target.files[0])} accept="image/*" />
                    </div>
                    <button type="submit" className="btn btn-primary">Нэмэх</button>
                </form>
            </div>
        </div>
    );
}

export default AddCocktail;
