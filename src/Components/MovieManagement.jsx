import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { HiOutlineTrash, HiOutlineCheckCircle, HiOutlineXCircle, HiOutlineFilm } from "react-icons/hi2";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { FaStar } from "react-icons/fa";

const MovieManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axiosSecure.get("/movies").then((res) => {
      setMovies(res.data);
    });
  }, [axiosSecure]);

const handleApproveMovies = (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "Do you want to approve this movie?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#16a34a", 
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, approve it!",
    cancelButtonText: "Cancel"
  }).then((result) => {
    if (result.isConfirmed) {
      axiosSecure.patch(`/movies/approve/${id}`)
        .then(res => {
          if (res.data.modifiedCount > 0) {
            Swal.fire({
              title: "Approved!",
              text: "Movie has been approved successfully.",
              icon: "success",
              timer: 1500,
              showConfirmButton: false
            });

 
            setMovies(prev =>
              prev.map(movie =>
                movie._id === id
                  ? { ...movie, status: "approved" }
                  : movie
              )
            );
          }
        })
        .catch(() => {
          Swal.fire("Error", "Failed to approve movie", "error");
        });
    }
  });
};


 const handleRejectMovie = (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "Do you want to reject this movie?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#f59e0b", 
    cancelButtonColor: "#6b7280",
    confirmButtonText: "Yes, reject it!",
    cancelButtonText: "Cancel"
  }).then(async (result) => {
    if (result.isConfirmed) {
      
        axiosSecure.patch(`/movies/reject/${id}`)
        .then(res=> {
  if (res.data.modifiedCount) {
          setMovies(prev =>
            prev.map(movie =>
              movie._id === id
                ? { ...movie, status: "rejected" }
                : movie
            )
          );

          Swal.fire(
            "Rejected!",
            "Movie has been rejected successfully.",
            "success"
          );
        }
        })

      
      .catch((error)=> {
        Swal.fire("Error", "Failed to reject movie for",error);
      })
    }
  });
};

const handleRemoveMovie = (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "This movie will be permanently removed!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#e11d48",
    cancelButtonColor: "#6b7280",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel"
  }).then(async (result) => {
    if (result.isConfirmed) {
axiosSecure.delete(`/movies/${id}`)
.then(res=> {
if (res.data.deletedCount > 0) {
          setMovies(prev => prev.filter(movie => movie._id !== id));

          Swal.fire(
            "Deleted!",
            "Movie has been removed successfully.",
            "success"
          );
        }
})

        
      .catch ((error)=> {
        Swal.fire(
          "Error",
          "Failed to remove movie.",error
        );
      })
    }
  });
};

  return (
    <div className="min-h-screen pt-28 p-6">
      <title>Dashboard | Movie Management</title>
      <div className="max-w-6xl mx-auto bg-base-200 rounded-3xl p-8">
        <h2 className="text-3xl font-black mb-6 text-teal-600">
          Movie Management
        </h2>

        <div className="bg-base-200 rounded-[3rem] p-8 border border-base-300">
          <h3 className="text-2xl font-black mb-6 flex items-center gap-3">
            <HiOutlineFilm className="text-teal-500" /> Global Content Management
          </h3>
          <div className="overflow-x-auto">
            <table className="table w-full border-separate border-spacing-y-3">
              <thead>
                <tr className="text-xs uppercase opacity-50">
                  <th>Title</th>
                  <th>Added By</th>
                  <th>Rating</th>
                  <th>Status</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {movies.map((movie) => (
                  <tr key={movie._id} className="bg-base-100 shadow-sm">
                    <td className="font-bold rounded-l-2xl">{movie.title}</td>
                    <td className="text-xs opacity-70">{movie.addedBy}</td>
                    <td className="text-amber-500 font-bold">
                      <div className="flex items-center gap-1">
                        <FaStar /> {movie.rating}
                      </div>
                    </td>
                    <td>
                      <span className={`badge font-semibold ${
                        movie.status === 'approved' ? 'badge-success' : 
                        movie.status === 'rejected' ? 'badge-error' : 'badge-warning'
                      }`}>
                        {movie.status}
                      </span>
                    </td>
                    <td className="text-center rounded-r-2xl">
                      <div className="flex justify-center gap-2">
                        {/* Approve Button */}
                        <button
                          onClick={() => handleApproveMovies(movie._id)}
                          className="btn btn-sm btn-circle btn-ghost text-success hover:bg-success/10"
                          title="Approve"
                          disabled={movie.status === 'approved'}
                        >
                          <HiOutlineCheckCircle size={22} />
                        </button>

                        {/* Reject Button */}
                        <button
                          onClick={() => handleRejectMovie(movie._id)}
                          className="btn btn-sm btn-circle btn-ghost text-warning hover:bg-warning/10"
                          title="Reject"
                          disabled={movie.status === 'rejected'}
                        >
                          <HiOutlineXCircle size={22} />
                        </button>

                        {/* Remove/Delete Button */}
                        <button
                          onClick={() => handleRemoveMovie(movie._id)}
                          className="btn btn-sm btn-circle btn-ghost text-error hover:bg-error/10"
                          title="Remove"
                        >
                          <HiOutlineTrash size={22} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieManagement;