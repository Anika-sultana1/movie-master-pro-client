import React from 'react';
import error404 from '../../assets/error-404.png'
import { useNavigate } from 'react-router';

const ErrorPage = () => {


    const navigate = useNavigate();
    const handleGoBack = ()=>{
        navigate(-1)
    }


    return (
        <div className='flex flex-col justify-center items-center my-10'>
            <img className='w-[400px] h-[400px]' src={error404} alt="" />
            <h1 className='font-bold text-2xl my-5'>Oops, page not found!</h1>
            <p className='text-[#627382]'>The page you are looking for is not available.</p>
            <button onClick={handleGoBack} className='bg-linear-to-r from-[#632EE3] to-[#9F62F2] p-2 px-4 rounded-[5px] text-white mt-2'>Go Back!</button>
        </div>
    );
};

export default ErrorPage;