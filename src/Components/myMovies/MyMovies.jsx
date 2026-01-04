import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { FaEdit, FaTrashAlt, FaFilm, FaCalendarAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const MyMovies = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [movies, setMovies] = useState([]);
  const [editingMovie, setEditingMovie] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    genre: "",
    releaseYear: "",
    director: "",
    cast: "",
    language: "",
    plotSummary: "",
    posterUrl: "",
  });

 useEffect(() => {
  if (user?.email) {
    axiosSecure
      .get(`/movies/my-collection`)
      .then((res) => {
        const approvedMovies = res.data.filter(movie => movie.status === 'approved');
        setMovies(approvedMovies);
      })
      .catch((err) => console.error("Error fetching movies:", err));
  }
}, [user, axiosSecure]);


  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      borderRadius: "15px",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/movies/${id}`)
          .then((res) => {
            if (res.data.deletedCount) {
              Swal.fire("Deleted!", "Movie has been removed.", "success");
              setMovies((prev) => prev.filter((movie) => movie._id !== id));
            }
          })
          .catch((err) => {

            Swal.fire("Error!", "Failed to delete movie.",err);
          });
      }
    });
  };


  const handleEditClick = (movie) => {
    setEditingMovie(movie);
    setEditData({
      title: movie.title || "",
      genre: movie.genre || "",
      releaseYear: movie.releaseYear || "",
      director: movie.director || "",
      cast: movie.cast || "",
      language: movie.language || "",
      plotSummary: movie.plotSummary || "",
      posterUrl: movie.posterUrl || "",
    });
  };

  const handleEditSubmit = async () => {
    try {
      const res = await axiosSecure.patch(`/movies/update/${editingMovie._id}`, editData);
      if (res.modifiedCount > 0) {
        setMovies((prev) =>
          prev.map((m) => (m._id === editingMovie._id ? { ...m, ...editData } : m))
        );
        Swal.fire("Updated!", "Movie has been updated.", "success");
      }
      setEditingMovie(null);
    } catch (err) {
      console.error("Error updating movie:", err);
      Swal.fire("Error!", "Failed to update movie.", "error");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-[#f8fafc] min-h-screen">
<title>MOVIEMASTERpro | My Movies/approved</title>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h3 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            My Collection
          </h3>
          <p className="text-slate-500 mt-1">Manage and organize your favorite movies</p>
        </div>
        <div className="bg-white px-6 py-2 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-2">
          <FaFilm className="text-indigo-500" />
          <span className="font-bold text-slate-700">{movies.length} Movies</span>
        </div>
      </div>

     
      {movies.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm">
          <p className="text-slate-400 text-lg italic">Your collection is currently empty.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {movies.map((movie) => (
            <div
              key={movie._id}
              className="group bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-300 flex flex-col md:flex-row md:items-center gap-6"
            >
         
              <div className="flex-grow">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="text-xl font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                    {movie.title}
                  </h4>
                  <span className="hidden md:block bg-indigo-50 text-indigo-600 text-[10px] uppercase font-bold px-2 py-0.5 rounded">
                    HD
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                      movie.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : movie.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {movie.status}
                  </span>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed line-clamp-2 mb-3">
                  {movie.plotSummary}
                </p>
                <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
                  <span className="flex items-center gap-1">
                    <FaCalendarAlt className="text-slate-300" />
                    {new Date(movie.addedAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>

    
              <div className="flex items-center gap-3 border-t md:border-t-0 pt-4 md:pt-0">
                <button
                  onClick={() => handleEditClick(movie)}
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-50 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 rounded-xl font-semibold text-sm transition-all"
                >
                  <FaEdit size={16} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(movie._id)}
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-red-50 hover:bg-red-100 text-red-500 rounded-xl font-semibold text-sm transition-all"
                >
                  <FaTrashAlt size={14} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

 
      {editingMovie && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-lg relative">
            <h3 className="text-xl font-bold mb-4">Edit Movie</h3>
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Title"
                value={editData.title}
                onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Genre"
                value={editData.genre}
                onChange={(e) => setEditData({ ...editData, genre: e.target.value })}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Release Year"
                value={editData.releaseYear}
                onChange={(e) => setEditData({ ...editData, releaseYear: e.target.value })}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Director"
                value={editData.director}
                onChange={(e) => setEditData({ ...editData, director: e.target.value })}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Cast"
                value={editData.cast}
                onChange={(e) => setEditData({ ...editData, cast: e.target.value })}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Language"
                value={editData.language}
                onChange={(e) => setEditData({ ...editData, language: e.target.value })}
                className="w-full p-2 border rounded"
              />
              <textarea
                placeholder="Plot Summary"
                value={editData.plotSummary}
                onChange={(e) => setEditData({ ...editData, plotSummary: e.target.value })}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Poster URL"
                value={editData.posterUrl}
                onChange={(e) => setEditData({ ...editData, posterUrl: e.target.value })}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setEditingMovie(null)}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSubmit}
                className="px-4 py-2 rounded bg-indigo-500 text-white hover:bg-indigo-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyMovies;
