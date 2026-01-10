import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import FullScreenLoader from '../FullScreenLoader';

const UpdateMovieDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const axios = useAxiosSecure();

  // 🔹 separate loading states
  const [pageLoading, setPageLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);

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
        setPageLoading(false);
      })
      .catch((error) => {
        console.error(error);
        toast.error('Failed to load movie details');
        setPageLoading(false);
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

    setUpdateLoading(true);

    axios
      .patch(`/movies/update/${id}`, updatedData)
      .then((res) => {
        if (res.data.modifiedCount) {
          toast.success('Movie updated successfully!');
          navigate('/myCollection');
        } else {
          toast.info('No changes were made.');
        }
        setUpdateLoading(false);
      })
      .catch((error) => {
        console.error(error);
        toast.error('Movie update failed');
        setUpdateLoading(false);
      });
  };

  
  if (pageLoading) {
    return <FullScreenLoader />;
  }

  return (
    <div className="pt-24 px-5 md:px-10">
      <title>MOVIEMASTERpro | Update</title>
      <h1 className="text-3xl font-bold mb-5 text-center">
        Update Movie Details
      </h1>

      <form
        onSubmit={handleUpdate}
        className="flex flex-col gap-4 max-w-2xl mx-auto"
      >
        <input
          name="title"
          value={formData.title}
          onChange={handleOnChange}
          type="text"
          placeholder="Movie Title"
          className="input input-bordered w-full"
          required
        />

        <input
          name="genre"
          value={formData.genre}
          onChange={handleOnChange}
          type="text"
          placeholder="Genre"
          className="input input-bordered w-full"
        />

        <input
          name="releaseYear"
          value={formData.releaseYear}
          onChange={handleOnChange}
          type="number"
          placeholder="Release Year"
          className="input input-bordered w-full"
          required
        />

        <input
          name="director"
          value={formData.director}
          onChange={handleOnChange}
          type="text"
          placeholder="Director"
          className="input input-bordered w-full"
        />

        <input
          name="cast"
          value={formData.cast}
          onChange={handleOnChange}
          type="text"
          placeholder="Cast"
          className="input input-bordered w-full"
        />

        <input
          name="posterUrl"
          value={formData.posterUrl}
          onChange={handleOnChange}
          type="url"
          placeholder="Poster URL"
          className="input input-bordered w-full"
        />

        <textarea
          name="plotSummary"
          value={formData.plotSummary}
          onChange={handleOnChange}
          placeholder="Plot Summary"
          className="textarea textarea-bordered w-full"
        />

        <input
          name="duration"
          value={formData.duration}
          onChange={handleOnChange}
          type="text"
          placeholder="Duration"
          className="input input-bordered w-full"
        />

        <input
          name="language"
          value={formData.language}
          onChange={handleOnChange}
          type="text"
          placeholder="Language"
          className="input input-bordered w-full"
        />

        <input
          name="rating"
          value={formData.rating}
          onChange={handleOnChange}
          type="number"
          min="1"
          max="10"
          placeholder="Rating (1-10)"
          className="input input-bordered w-full"
        />

        <input
          value={formData.addedBy}
          readOnly
          className="input input-bordered w-full bg-secondary cursor-not-allowed"
        />

        <button
          type="submit"
          className={`btn btn-primary mt-4 ${
            updateLoading ? 'loading' : ''
          }`}
          disabled={updateLoading}
        >
          {updateLoading ? 'Updating...' : 'Update'}
        </button>
      </form>
    </div>
  );
};

export default UpdateMovieDetails;
