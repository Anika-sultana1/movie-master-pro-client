import React from 'react';





const SingleMovie = ({movie}) => {
    console.log(movie)
const {title, posterUrl,plotSummary} = movie;


    return (
       <div className="card bg-base-100 w-96 shadow-sm">

  
          

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
      <button className="btn-primary w-full">View movie details</button>
    </div>
    </div>

 

  
</div>
    );
};

export default SingleMovie;