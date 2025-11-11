import React from 'react';
import { Link } from 'react-router';





const SingleMovie = ({movie}) => {
    console.log(movie)
const {title, posterUrl,plotSummary} = movie;


    return (
       <div className="card w-[350px] shadow-sm bg-gray-400 pt-5">

  
          

  <figure>
    <img
    className='w-[300px] h-[400px] rounded-2xl p-1'
      src={posterUrl}
      alt={title} />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{title}</h2>
    <p>{plotSummary}</p>
    <div className="card-actions justify-end">
      <button className="btn-primary w-full"><Link to={`/movies/${movie._id}`}>View movie details</Link></button>
    </div>
    </div>

 

  
</div>
    );
};

export default SingleMovie;