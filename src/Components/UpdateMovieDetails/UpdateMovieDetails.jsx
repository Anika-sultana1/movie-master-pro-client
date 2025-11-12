import React, { useState, useEffect } from 'react';
import useAuth from '../../Hooks/useAuth';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const UpdateMovieDetails = () => {
const [loading, setLoading] = useState(true)
  const navigate = useNavigate();
  const { id } = useParams();
  const axios = useAxiosSecure();

  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    releaseYear: '',
    director: '',
    cast: '',
    posterUrl: '',
    plotSummary: '',
    duration: '',
    language: '',
    rating: '',
    addedBy: '',
  });

  useEffect(() => {
    axios
      .get(`/movies/${id}`)
      .then((res) => {
        setFormData(res.data); 
      })
      .catch((error) => {
        console.error(error);
        toast.error('Failed to load movie details');
      });
  }, [id, axios]);


  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleUpdate = (e) => {
    e.preventDefault();
  


    const { addedBy, ...updatedData } = formData;
console.log(addedBy)
setLoading(true)
    axios
      .patch(`/movies/update/${id}`, updatedData)
      .then((result) => {
        if (result.data.modifiedCount) {
          toast.success('Movie updated successfully!');
          navigate('/myCollection');
        setLoading(false)
        } else {
          toast.info('No changes were made.');
        }
      })
      .catch((error) => {
        console.error(error);
        setLoading(false)
        toast.error('Movie update failed');
      })

  };

  return (
    <div className="pt-24 px-5 md:px-10">
      <h1 className="text-3xl font-bold mb-5 text-center">Update Movie Details</h1>

      <form onSubmit={handleUpdate} className="flex flex-col gap-4 max-w-2xl mx-auto">

        <input
          onChange={handleOnChange}
          value={formData.title }
          type="text"
          name="title"
          placeholder="Movie Title"
          className="input input-bordered w-full"
          required
        />

        <input
          onChange={handleOnChange}
          value={formData.genre}
          type="text"
          name="genre"
          placeholder="Genre"
          className="input input-bordered w-full"
        />

        <input
          onChange={handleOnChange}
          value={formData.releaseYear }
          type="number"
          name="releaseYear"
          placeholder="Release Year *"
          className="input input-bordered w-full"
          required
        />

        <input
          onChange={handleOnChange}
          value={formData.director }
          type="text"
          name="director"
          placeholder="Director"
          className="input input-bordered w-full"
        />

        <input
          onChange={handleOnChange}
          value={formData.cast }
          type="text"
          name="cast"
          placeholder="Cast (comma separated)"
          className="input input-bordered w-full"
        />

        <input
          onChange={handleOnChange}
          value={formData.posterUrl }
          type="url"
          name="posterUrl"
          placeholder="Poster URL"
          className="input input-bordered w-full"
        />

        <textarea
          onChange={handleOnChange}
          value={formData.plotSummary }
          name="plotSummary"
          placeholder="Plot Summary"
          className="textarea textarea-bordered w-full"
        />

        <input
          onChange={handleOnChange}
          value={formData.duration }
          type="text"
          name="duration"
          placeholder="Duration"
          className="input input-bordered w-full"
        />

        <input
          onChange={handleOnChange}
          value={formData.language }
          type="text"
          name="language"
          placeholder="Language"
          className="input input-bordered w-full"
        />

        <input
          onChange={handleOnChange}
          value={formData.rating }
          type="number"
          name="rating"
          placeholder="Rating (1-10)"
          min="1"
          max="10"
          className="input input-bordered w-full"
        />

      
        <input
          type="text"
          name="addedBy"
          value={formData.addedBy}
          readOnly
          className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
        />

        <button
          className={`btn btn-primary mt-4 ${loading ? 'loading' : ''}`}
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update'}
        </button>
      </form>
    </div>
  );
};

export default UpdateMovieDetails;
