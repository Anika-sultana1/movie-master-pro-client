import React, { useEffect, useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import { motion } from "framer-motion";
import { FaCalendarAlt, FaStar, FaTags } from 'react-icons/fa';
import { Link } from 'react-router';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import FullScreenLoader from '../FullScreenLoader';

const MyCollection = () => {

  const {user} = useAuth()
  const [loading, setLoading] = useState(true)
const axios = useAxiosSecure();
const [myCollections, setMyCollections] = useState([])

useEffect( ()=>{
setLoading(true)
axios.get(`/movies/my-collection?email=${user?.email}`)
.then(result => {
 
    setMyCollections(result.data)
    setLoading(false)
})
.catch(error => {
    console.log(error)
    setLoading(false)
})

},[axios, user])

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
        
          if (res.data.deletedCount > 0) {
            setMyCollections(myCollections.filter(m => m._id !== movieId))
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


    return (



        <div className='pt-24'>
          <title>MOVIEMASTERpro | My Movies</title>
            <h1 className='font-bold text-4xl text-center my-5'>My Collections</h1>

  <div>
              {
              loading ? <FullScreenLoader></FullScreenLoader> : 
               myCollections.length === 0 ? (
      <div className='text-center mt-10'>
        <h2 className='text-2xl font-semibold text-gray-600 mb-4'>
          You don’t have any movies yet.
        </h2>
        <p className='text-gray-500 mb-6'>
          Please add your movies to see them here.
        </p>
     
          <button className='bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition'>
           <Link to='/movies/add'> Add Movie</Link>
          </button>

      </div>
    ) :
               <div>
                {
                    myCollections.map((mycollection,index) =>  <motion.div
              key={mycollection._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
              className="relative group rounded-2xl overflow-hidden mx-10 mb-5 shadow-lg cursor-pointer"
            >
        
              <img
                src={mycollection.posterUrl}
                alt={mycollection.title}
                className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-110"
              />

      
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100"></div>

              <div className="absolute bottom-0 left-0 p-4 text-white w-full">
                <h3 className="text-5xl font-bold mb-5">{mycollection.title}</h3>
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <span className="flex items-center gap-1  text-3xl">
                    <FaStar className="text-yellow-400" /> {mycollection.rating }
                  </span>
                  <span className="flex items-center gap-1 text-3xl">
                    <FaTags className="text-teal-400" /> {mycollection.genre }
                  </span>
                  <span className="flex items-center gap-1  text-3xl">
                    <FaCalendarAlt className="text-gray-300" /> {mycollection.releaseYear}
                  </span>
               
       
                </div>
           <span className="flex items-center gap-1 ">
              {mycollection.director }
                  </span>
           <span className="flex items-center gap-1  text-xl">
              {mycollection.language }
                  </span>
           <span className="flex items-center gap-1  text-2xl">
              {mycollection.cast }
                  </span>
                <p className=" text-gray-300 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2 text-xl">
                  {mycollection.plotSummary?.length > 120
                    ? mycollection.plotSummary.slice(0, 120) + "..."
                    : mycollection.plotSummary}
                </p>

       <div className='flex gap-3'>
                 <Link to={`/movies/update/${mycollection._id}`}><button className="mt-3 w-[150px] py-1.5  bg-teal-600  text-white font-medium rounded-lg hover:bg-teal-700 transition">
                  Edit Details
                </button></Link>
                <button onClick={()=>handleDelete(mycollection._id)} className="mt-3 w-[150px] py-1.5 opacity-0 group-hover:opacity-100 bg-red-500 text-white font-medium rounded-lg hover:bg-teal-700 transition">
                  Delete 
                </button>
       </div>
                <Link to={`/movies/${mycollection._id}`}><button className="mt-3 w-[300px] py-1.5 opacity-0 group-hover:opacity-100 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition">
                  View Details
                </button></Link>
              </div>
            </motion.div>)
                }
            </div>
            }
          </div>

           
        
        </div>
    );
};

export default MyCollection;