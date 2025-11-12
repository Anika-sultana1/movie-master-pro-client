import React, { useState } from 'react';
import useAxios from '../../Hooks/useAxios';
import useAuth from '../../Hooks/useAuth';
import {  useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { toast, ToastContainer } from 'react-toastify';

const AddMovie = () => {
    const axios = useAxios();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

const [formData, setFormData] = useState({
    title: '', genre:'', releaseYear: '', director: '', cast: '', posterUrl: '', plotSummary: '', duration: '', language: '', rating: '',
})

const handleOnChange = (e)=>{
    setFormData({...formData, [e.target.name]:e.target.value})
}

const handleSubmit = (e)=>{
    e.preventDefault();
setLoading(true)
setError('')

const newMovie = {
    ...formData, addedBy:user?.email || 'Anonymous', addedAt: new Date().toISOString()
}


axios.post('/movies/add', newMovie)
.then(result=> {
    console.log(result.data)
    toast.success('Your movie Added Succusfully')
    setLoading(false)
    navigate('/allMovies')
})
.catch(error => {
    console.log(error)
   
    Swal.fire({
  icon: "error",
  title: "Oops...",
  text: "Something went wrong!",
  footer: '<a href="#">Why do I have this issue?</a>'
});
setLoading(false)
})
 
}


    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-start pt-24 py-10">
        
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-3xl">
                <h1 className="text-3xl font-bold mb-6">Add New Movie</h1>

                {error && <p className="text-red-500 mb-4">{error}</p>}

                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    <input onChange={handleOnChange} value={formData.title} type="text" name='title' placeholder='Movie Title' className="input input-bordered w-full" required/>
                    <input onChange={handleOnChange} value={formData.genre} type="text" name='genre' placeholder='Genre' className="input input-bordered w-full"/>
                    <input type="number"
                        name="releaseYear"
                        placeholder="Release Year *"
                        value={formData.releaseYear}
                        onChange={handleOnChange}
                        className="input input-bordered w-full"
                        required/>
                    <input onChange={handleOnChange} value={formData.director} type="text" name='director' placeholder='Director' className="input input-bordered w-full" />
                    <input onChange={handleOnChange} value={formData.cast} type="text" name='cast' placeholder='Cast  (comma separated)' className="input input-bordered w-full" />
                    <input onChange={handleOnChange} value={formData.posterUrl} type="url" name='posterUrl' placeholder='Poster URL' className="input input-bordered w-full" />
                    <textarea onChange={handleOnChange} value={formData.plotSummary} name="plotSummary" placeholder="Plot Summary" className="textarea textarea-bordered w-full"/>
                    <input onChange={handleOnChange} value={formData.duration} type="text"name="duration" placeholder='Duration' className="input input-bordered w-full"/>
                    <input onChange={handleOnChange} value={formData.language} type="text" name="language" placeholder="Language" className="input input-bordered w-full"/>
                    <input onChange={handleOnChange} value={formData.rating} type="number" name="rating" placeholder="Rating (1-10)" className="input input-bordered w-full" min="1" max="10" />

                    <button type="submit" className={`btn btn-primary mt-4 ${loading ? 'loading' : ''}`} disabled={loading}
                    >
                        {loading ? 'Adding...' : 'Add Movie'}
                    </button>
                </form>


      
            </div>
        </div>
    );
};

export default AddMovie;
