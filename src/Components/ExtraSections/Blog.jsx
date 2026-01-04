import React, { useState } from 'react';
import { HiOutlineCalendarDays, HiOutlineUser, HiOutlineArrowRight, HiXMark } from "react-icons/hi2";

const Blog = () => {
    const [selectedBlog, setSelectedBlog] = useState(null);

    const blogs = [
        {
            id: 1,
            title: "Top 10 Must-Watch Sci-Fi Movies of 2026",
            excerpt: "From deep space exploration to AI revolutions, this year's sci-fi lineup is mind-blowing...",
            content: "2026 is proving to be a golden year for science fiction. With movies like 'Nebula's Edge' and 'Silicon Souls' leading the charts, fans are experiencing a new era of visual storytelling. In this article, we dive deep into why these films are setting new benchmarks for the industry...",
            date: "Jan 03, 2026",
            category: "Reviews",
            author: "MovieMaster",
            readTime: "5 min read",
            image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=800",
        },
        {
            id: 2,
            title: "Why IMAX is Changing the Way We Watch Movies",
            excerpt: "Is the extra ticket price worth it? We explore the technology behind the giant screens...",
            content: "The immersive experience of IMAX isn't just about a bigger screen; it's about the aspect ratio, the dual-projection system, and the precision audio. As filmmakers increasingly use IMAX-certified cameras, the gap between home streaming and cinema continues to grow...",
            date: "Dec 28, 2025",
            category: "Tech",
            author: "Cinema Phil",
            readTime: "8 min read",
            image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=800",
        },
        {
            id: 3,
            title: "The Return of Classic Noir in Modern Cinema",
            excerpt: "How modern directors are bringing back the 1940s aesthetic with a contemporary twist...",
            content: "Neo-noir is making a massive comeback. Directors are blending traditional shadows and mystery with high-tech urban landscapes. This resurgence shows that audiences still crave the gritty, complex moral tales of the classic noir era...",
            date: "Dec 15, 2025",
            category: "History",
            author: "Retro Critic",
            readTime: "6 min read",
            image: "https://images.unsplash.com/photo-1509281373149-e957c6296406?auto=format&fit=crop&q=80&w=800",
        }
    ];

    return (
        <div className="min-h-screen bg-base-100 py-12 px-4 md:px-12 lg:px-24 pt-24">
            <title>MOVIEMASTERpro | </title>
            <div className="max-w-7xl mx-auto">
                
              
                <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-8 text-center md:text-left">
                    <div className="max-w-xl">
                        <span className="text-primary font-bold tracking-[0.3em] uppercase text-sm">Cine-Journal</span>
                        <h1 className="text-5xl md:text-6xl font-black mt-2 mb-4 italic">Latest Stories</h1>
                        <p className="opacity-70 text-lg border-l-0 md:border-l-4 border-primary md:pl-6">
                            Stay updated with the latest trends, reviews, and technology in the world of cinema.
                        </p>
                    </div>
                    
                </div>

                {/* --- Blog Grid --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {blogs.map((blog) => (
                        <div 
                            key={blog.id} 
                            className="group card bg-base-200 border border-base-300 hover:shadow-2xl transition-all duration-500 rounded-[2.5rem] overflow-hidden"
                        >
                            <figure className="relative h-64 overflow-hidden">
                                <img 
                                    src={blog.image} 
                                    alt={blog.title} 
                                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="badge badge-primary font-bold py-3 px-4 shadow-lg border-none">{blog.category}</span>
                                </div>
                            </figure>
                            
                            <div className="card-body p-8">
                                <div className="flex items-center gap-4 text-xs opacity-50 font-bold uppercase tracking-widest mb-2">
                                    <span className="flex items-center gap-1"><HiOutlineCalendarDays /> {blog.date}</span>
                                    <span>•</span>
                                    <span className="flex items-center gap-1"><HiOutlineUser /> {blog.author}</span>
                                </div>
                                <h3 className="text-2xl font-bold group-hover:text-primary transition-colors leading-tight mb-4">
                                    {blog.title}
                                </h3>
                                <p className="opacity-60 line-clamp-3 mb-6">
                                    {blog.excerpt}
                                </p>
                                <div className="card-actions pt-2">
                                    <button 
                                        onClick={() => setSelectedBlog(blog)}
                                        className="btn btn-ghost p-0 text-primary font-black hover:bg-transparent group/btn"
                                    >
                                        READ MORE 
                                        <HiOutlineArrowRight className="ml-2 group-hover/btn:translate-x-2 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* --- Newsletter --- */}
                <div className="mt-24 p-12 rounded-[3rem] bg-neutral text-neutral-content relative overflow-hidden text-center md:text-left">
                    <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
                    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
                        <div className="max-w-md">
                            <h2 className="text-4xl font-black mb-4 italic">Join the Cinephile Club</h2>
                            <p className="opacity-70">Weekly movie recommendations and exclusive tech insights delivered to your inbox.</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-lg">
                            <input type="email" placeholder="Your movie-loving email" className="input input-bordered input-lg w-full rounded-2xl text-base-content" />
                            <button className="btn btn-primary btn-lg rounded-2xl px-10">Subscribe</button>
                        </div>
                    </div>
                </div>

                {/* --- Read More Modal --- */}
                {selectedBlog && (
                    <div className="modal modal-open modal-bottom sm:modal-middle backdrop-blur-md">
                        <div className="modal-box max-w-3xl bg-base-100 rounded-[2.5rem] p-0 overflow-hidden shadow-2xl border border-base-300">
                            <button 
                                onClick={() => setSelectedBlog(null)}
                                className="btn btn-circle btn-ghost absolute right-4 top-4 z-20 bg-base-100/50 backdrop-blur-md"
                            >
                                <HiXMark className="text-2xl" />
                            </button>

                            <div className="relative h-72">
                                <img src={selectedBlog.image} className="w-full h-full object-cover" alt="" />
                                <div className="absolute inset-0 bg-gradient-to-t from-base-100 to-transparent"></div>
                                <div className="absolute bottom-6 left-8">
                                    <span className="badge badge-secondary mb-2">{selectedBlog.category}</span>
                                    <h2 className="text-3xl md:text-4xl font-black text-white">{selectedBlog.title}</h2>
                                </div>
                            </div>

                            <div className="p-8 md:p-12">
                                <div className="flex flex-wrap gap-6 mb-8 opacity-60 font-bold text-sm uppercase tracking-widest">
                                    <span className="flex items-center gap-2"><HiOutlineUser className="text-primary text-lg" /> {selectedBlog.author}</span>
                                    <span className="flex items-center gap-2"><HiOutlineCalendarDays className="text-primary text-lg" /> {selectedBlog.date}</span>
                                    <span className="badge badge-ghost badge-outline">{selectedBlog.readTime}</span>
                                </div>
                                <div className="prose prose-lg max-w-none italic opacity-90 leading-relaxed">
                                    <p>{selectedBlog.content}</p>
                                    <p className="mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                </div>
                                <div className="modal-action mt-10">
                                    <button onClick={() => setSelectedBlog(null)} className="btn btn-primary btn-block rounded-2xl">Close Article</button>
                                </div>
                            </div>
                        </div>
                        <div className="modal-backdrop" onClick={() => setSelectedBlog(null)}></div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Blog;