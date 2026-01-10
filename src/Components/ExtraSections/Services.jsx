import React, { useState } from 'react';
import { Link } from 'react-router';
import { 
    HiOutlineShieldCheck, 
    HiOutlineAdjustmentsHorizontal, 
    HiOutlineSwatch, 
    HiOutlineBellAlert, 
    HiOutlineEyeSlash, 
    HiOutlinePlayCircle,
    HiXMark
} from "react-icons/hi2";

const Services = () => {

    const [selectedService, setSelectedService] = useState(null);

    const serviceList = [
        {
            title: "Secure Data Management",
            subtitle: "Only logged-in users can add/update movies",
            description: "Experience robust security where only authenticated enthusiasts can contribute to our database.",
            details: "Security is our priority. We use Firebase Authentication to ensure that only verified users can add new movies or update existing ones. This prevents spam and maintains a high-quality database for everyone.",
            icon: <HiOutlineShieldCheck className="w-10 h-10 text-primary group-hover:scale-110 transition-transform duration-300" />,
            tags: ["Firebase", "Auth", "Security"]
        },
        {
            title: "Smart Filtering",
            subtitle: "Find movies by genres or rating range",
            description: "Our advanced search engine allows you to pinpoint your next watch effortlessly.",
            details: "Stop wasting time scrolling. Our system allows you to combine multiple filters like Genre (Action, Sci-Fi) and Rating (1.0 to 10.0) to find exactly what you want to watch in seconds.",
            icon: <HiOutlineAdjustmentsHorizontal className="w-10 h-10 text-secondary group-hover:scale-110 transition-transform duration-300" />,
            tags: ["Filtering", "Search", "UX"]
        },
        {
            title: "Dynamic Theming",
            subtitle: "Users can change their theme",
            description: "Personalize your viewing experience with our dark and light mode support.",
            details: "Whether you prefer a bright interface or a cinematic dark look, we have it all. Our theme switcher remembers your choice using LocalStorage, so it stays the same every time you visit.",
            icon: <HiOutlineSwatch className="w-10 h-10 text-accent group-hover:scale-110 transition-transform duration-300" />,
            tags: ["DaisyUI", "Theme", "Storage"]
        },
        {
            title: "Real-time Feedback",
            subtitle: "Instant notice for any errors",
            description: "Stay informed with instant notifications and error messages for a smoother experience.",
            details: "Our integrated Toast notification system gives you real-time updates. Whether you successfully added a movie or missed a field in the form, you'll know exactly what's happening immediately.",
            icon: <HiOutlineBellAlert className="w-10 h-10 text-error group-hover:scale-110 transition-transform duration-300" />,
            tags: ["Toasts", "Alerts", "Feedback"]
        },
        {
            title: "Privacy First",
            subtitle: "Only you can see your own data",
            description: "We prioritize your privacy. Your personalized lists are protected and visible only to you.",
            details: "Your movie preferences and 'My Watchlist' data are strictly private. We use secure database rules so that no other user can access or edit your personal collection.",
            icon: <HiOutlineEyeSlash className="w-10 h-10 text-info group-hover:scale-110 transition-transform duration-300" />,
            tags: ["Private", "Encrypted", "SSL"]
        },
        {
            title: "Watched History",
            subtitle: "List and track your watched movies",
            description: "Keep track of your cinematic journey and organize your watched movies into a clean list.",
            details: "Never forget a movie again. Our 'Watched History' feature lets you build a personal archive of every film you've seen, complete with your own ratings and notes.",
            icon: <HiOutlinePlayCircle className="w-10 h-10 text-success group-hover:scale-110 transition-transform duration-300" />,
            tags: ["History", "Database", "Tracking"]
        }
    ];

    return (
        <div className="min-h-screen bg-secondary px-4 mt-20 md:mt-28 md:px-12 lg:px-24">
            <div className="max-w-7xl mx-auto">
        
                <div className="text-center mb-20">
                    <span className="text-primary font-bold tracking-widest uppercase text-sm">Features</span>
                    <h1 className="text-5xl md:text-6xl font-black mt-4 mb-6 italic">Our Core Services</h1>
                    <p className="max-w-2xl mx-auto text-lg opacity-70 italic">
                        Explore the powerful features designed to make your movie tracking experience seamless and fun.
                    </p>
                    <div className="flex justify-center gap-2 mt-8">
                        <div className="h-1.5 w-16 rounded-2xl bg-primary"></div>
                        <div className="h-1.5 w-4 rounded-2xl bg-secondary"></div>
                    </div>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {serviceList.map((service, index) => (
                        <div 
                            key={index} 
                            className="group card bg-dark shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-base-300 overflow-hidden"
                        >
                            <div className="card-body">
                                <div className="mb-4">{service.icon}</div>
                                <h2 className="card-title text-2xl font-bold group-hover:text-primary transition-colors">
                                    {service.title}
                                </h2>
                                <p className="opacity-70 leading-relaxed my-4">
                                    {service.description}
                                </p>
                                
                                <div className="card-actions justify-start mt-4">
                                    {service.tags.map((tag, i) => (
                                        <div key={i} className="badge badge-outline badge-sm opacity-50 italic">
                                            #{tag}
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6">
                                    <button 
                                        onClick={() => setSelectedService(service)}
                                        className="btn btn-sm btn-ghost group-hover:btn-primary group-hover:text-white transition-all p-0 group-hover:px-4 rounded-2xl"
                                    >
                                        Learn More 
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* --- Quick View Modal --- */}
                {selectedService && (
                    <div className="modal modal-open modal-bottom sm:modal-middle backdrop-blur-md">
                        <div className="modal-box bg-secondary border border-primary/20 rounded-2xl p-8 max-w-2xl relative shadow-2xl">
                            <button 
                                onClick={() => setSelectedService(null)}
                                className="btn btn-sm btn-circle btn-ghost absolute right-6 top-6"
                            >
                                <HiXMark className="text-2xl" />
                            </button>

                            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                                <div className="p-6 bg-primary/10 rounded-2xl text-primary shadow-inner">
                                    {selectedService.icon}
                                </div>
                                <div className="flex-1 text-center md:text-left">
                                    <h3 className="text-3xl font-black mb-2">{selectedService.title}</h3>
                                    <p className="text-primary font-bold mb-6 italic">{selectedService.subtitle}</p>
                                    <p className="text-lg opacity-80 leading-relaxed mb-8">
                                        {selectedService.details}
                                    </p>
                                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                                        {selectedService.tags.map((tag, i) => (
                                            <span key={i} className="badge badge-primary badge-lg badge-outline font-bold">#{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="modal-action justify-center mt-12">
                                <button 
                                    onClick={() => setSelectedService(null)} 
                                    className="btn btn-primary btn-wide rounded-2xl shadow-lg shadow-primary/20"
                                >
                                    Understood
                                </button>
                            </div>
                        </div>
                        <div className="modal-backdrop" onClick={() => setSelectedService(null)}></div>
                    </div>
                )}

                {/* Bottom CTA */}
                <div className="mt-24 p-12 rounded-2xl bg-neutral text-neutral-content text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-2xl -mr-32 -mt-32 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 rounded-2xl -ml-32 -mb-32 blur-3xl"></div>
                    
                    <h2 className="text-3xl md:text-5xl font-black mb-6 italic">Ready to build your collection?</h2>
                    <p className="mb-10 opacity-80 max-w-xl mx-auto text-lg">Join our community today and start tracking your favorite movies with ease.</p>
                    <Link to='/movies/add'>
                        <button className="btn btn-primary btn-lg rounded-2xl px-12 hover:scale-105 transition-transform">
                            Start Tracking Now
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Services;