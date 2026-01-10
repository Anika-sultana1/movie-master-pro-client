import React, { useState } from 'react';

const ContactUs = () => {

const [showToast, setShowToast] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, 3000);
        e.target.reset();
    };


    return (
        <div className="min-h-screen bg-secondary  px-4 md:px-12 lg:px-24 py-20">
            <div className="max-w-6xl mx-auto">
        
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-black mb-4">Get In Touch</h1>
                    <p className="text-lg opacity-70">Have a question or just want to say hi? We'd love to hear from you.</p>
                    <div className="divider w-24 mx-auto divider-primary"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    
                
                    <div className="space-y-8">
                        <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
                        
                        <div className="card bg-secondary shadow-sm hover:shadow-md transition-shadow">
                            <div className="card-body flex-row items-center gap-6">
                                <div className="p-4 bg-primary/10 rounded-2xl text-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-bold opacity-60 uppercase text-xs tracking-widest">Email Us</h3>
                                    <p className="text-xl font-semibold">moviemaster@pro.com</p>
                                </div>
                            </div>
                        </div>

                        <div className="card bg-secondary shadow-sm hover:shadow-md transition-shadow">
                            <div className="card-body flex-row items-center gap-6">
                                <div className="p-4 bg-secondary/10 rounded-2xl text-secondary">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-bold opacity-60 uppercase text-xs tracking-widest">Location</h3>
                                    <p className="text-xl font-semibold">Dhaka, Bangladesh</p>
                                </div>
                            </div>
                        </div>

                     
                        <div className="p-8 bg-linear-to-br from-primary/20 to-secondary/20 rounded-2xl">
                            <h3 className="font-bold mb-4">Follow Our Updates</h3>
                            <div className="flex gap-4">
                               <a href="https://www.facebook.com/" target='_blank'> <button className="btn btn-circle bg-primary btn-outline">FB</button></a>
                               <a href="https://x.com/" target='_blank'> <button className="btn btn-circle bg-primary btn-outline">TW</button></a>
                               <a href="https://www.linkedin.com/feed/" target='_blank'> <button className="btn btn-circle bg-primary btn-outline">LD</button></a>
                               <a href="https://github.com/" target='_blank'> <button className="btn btn-circle bg-primary btn-outline">GH</button></a>
                     
                            </div>
                        </div>
                    </div>

        
                    <div className="card bg-secondary shadow-2xl border border-base-300">
                        <div className="card-body p-8 md:p-12">
                            <h2 className="card-title text-2xl mb-6">Send Message</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="form-control">
                                  
                                    <input type="text" placeholder="Your Name" className="input input-bordered focus:input-primary transition-all" />
                                </div>

                                <div className="form-control">
                                    <input type="email" placeholder="Your Email" className="input input-bordered focus:input-primary transition-all" />
                                </div>

                                <div className="form-control">
                                    <select className="select select-bordered focus:select-primary">
                                        <option disabled selected>Pick a reason</option>
                                        <option>General Inquiry</option>
                                        <option>Bug Report</option>
                                        <option>Feature Request</option>
                                        <option>Privacy Concern</option>
                                    </select>
                                </div>

                                <div className="form-control">
                                    <textarea className="textarea textarea-bordered h-32 focus:textarea-primary" placeholder="Write your message here..."></textarea>
                                </div>

                                <div className="form-control mt-6">
                                    <button className="btn bg-primary shadow-lg shadow-primary/30">
                                        Send Message
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                                        </svg>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
            {showToast && (
                <div className="toast toast-end toast-bottom p-4">
                    <div className="alert alert-success shadow-xl rounded-2xl text-white border-none bg-primary">
                        <div className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="font-bold">Message sent successfully!</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContactUs;