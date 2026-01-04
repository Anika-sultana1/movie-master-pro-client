import React, { useEffect, useState } from 'react';
import useAxios from '../../Hooks/useAxios';
import { Link, useParams } from 'react-router';
import useAuth from '../../Hooks/useAuth';
import bgImage from '../../assets/body-bg.jpg'
import { FiYoutube } from "react-icons/fi";

import { FaEdit, FaStar, FaTrashAlt, } from 'react-icons/fa';
import FullScreenLoader from '../FullScreenLoader';
import Swal from 'sweetalert2';
import { toast, ToastContainer } from 'react-toastify';

const ViewDetails = () => {
    const axios = useAxios();
    const { id } = useParams();
    const { user } = useAuth();
    const [details, setDetails] = useState({});
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        setLoading(true);
        axios.get(`/movies/${id}`)
            .then(result => {
                setDetails(result.data);
                setLoading(false);
            })
            .catch(() => {
              
                setLoading(false);
            });
    }, [axios, id]);

const handleDelete = (movieId) => {
  Swal.fire({
    title: "Are you sure?",
    text: "Are you sure to delte this permenently!!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
          setLoading(true)
      axios.delete(`/movies/${movieId}`)
        .then(res => {
        
          if (res.data.deletedCount) {
            setDetails(details.filter(d => d._id !== movieId))
            toast.success('Movie deleted successfully')
              setLoading(false)
          }
        })
        .catch(error => {
          setLoading(false)
          console.log(error)
          toast.error('Delete failed')
        })
         
    }
  });
}


    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">

           <FullScreenLoader></FullScreenLoader>
            </div>
        );
    }

    if (!details._id) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <p className="text-2xl text-red-500 font-semibold">404 | Movie not found or invalid ID.</p>
            </div>
        );
    }


    const isOwner = user?.email === details.addedBy;


    return (
<div>
    <ToastContainer></ToastContainer>
    <title>MOVIEMASTERpro |Details</title>
            <div className="relative  min-h-screen rounded-xl overflow-hidden shadow-lg">

  <img
    src={bgImage}
    alt="Movie Poster"
    className="w-[1450px] h-[700px] object-cover"
  />


  <div className="absolute inset-0 bg-black/40"></div>

  <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
    <h2 className="text-white text-4xl font-bold mb-2">
      Movies Page
    </h2>
    <p className="text-gray-300 text-2xl mt-5 mb-10">
     Step into the world of this movie where every scene tells a story. Explore the plot, characters, and emotions that make this film a memorable cinematic experience.
    </p>
   <a
  href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
    details.title + " full movie"
  )}`}
  target="_blank"
  rel="noopener noreferrer"
   className="
    btn w-[200px] flex items-center gap-2
    bg-gray-200 text-black
    hover:bg-[#e50916] hover:text-black
    transition-all duration-300
  "
>
  <FiYoutube /> Watch Now
</a>

  </div>
</div>
        <div className="min-h-screen p-6 lg:p-12 mt-24">




            <div className=" mx-auto bg-white rounded-2xl  overflow-hidden flex flex-col lg:flex-row transform hover:shadow-3xl transition duration-300">


                <div className="lg:w-1/3 bg-gray-100 flex-shrink-0">
                    <img
                        src={details.posterUrl}
                        alt={details.title}
                        className="w-full h-full object-cover lg:max-h-[600px] shadow-xl"
                    />
                </div>


                <div className="lg:w-2/3 p-8 lg:p-10 flex flex-col gap-6">

                    <div className="pb-4 border-b border-gray-200">
                        <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
                            {details.title}
                        </h1>
                        <div className="flex items-center mt-3 gap-5">

                            <div className="flex items-center text-2xl font-bold text-white bg-amber-500 px-4 py-1 rounded-full shadow-md">
                                <FaStar className="mr-2 text-white" />
                                <span>{details.rating}</span>
                            </div>

                            <span className="badge badge-lg badge-neutral text-white">{details.genre || 'N/A'}</span>
                        </div>
                    </div>


                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-gray-700">
                        <div>
                            <p className="font-semibold text-sm text-gray-500">Year</p>
                            <p className="text-lg">{details.releaseYear || 'N/A'}</p>
                        </div>
                        <div>
                            <p className="font-semibold text-sm text-gray-500">Language</p>
                            <p className="text-lg">{details.language || 'N/A'}</p>
                        </div>
                        <div>
                            <p className="font-semibold text-sm text-gray-500">Duration</p>
                            <p className="text-lg">{details.duration || 'N/A'}</p>
                        </div>
                    </div>


                    <div className="mt-4">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-2 border-b-2 border-primary/20 inline-block">Plot Summary</h3>
                        <p className="text-gray-700 leading-relaxed text-lg">
                            {details.plotSummary || 'No summary available.'}
                        </p>
                    </div>


                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="font-bold text-gray-600">Director:</p>
                            <p className="text-gray-800">{details.director || 'N/A'}</p>
                        </div>
                        <div>
                            <p className="font-bold text-gray-600">Cast:</p>
                            <p className="text-gray-800">{details.cast || 'N/A'}</p>
                        </div>
                    </div>


                    <p className="text-gray-500 text-sm mt-auto pt-4 border-t border-gray-100">
                        Added by: <span className="font-medium text-primary">{details.addedBy}</span>
                    </p>



                    {isOwner && (
                        <div className="mt-4 flex gap-3">
                            <Link to={`/movies/update/${details._id}`}>
                             <button className="btn btn-primary shadow-lg hover:shadow-xl transition duration-200">
                                <FaEdit className="mr-1" />
                                Edit Movie
                            </button>
                            </Link>
                           
                            <button onClick={()=>handleDelete(details._id)} className="btn btn-error text-white shadow-lg hover:shadow-xl transition duration-200">
                                <FaTrashAlt className="mr-1" />
                                Delete Movie
                            </button>
                        </div>
                    )}
                </div>
            </div>
           
        </div>
</div>
    );
};

export default ViewDetails;