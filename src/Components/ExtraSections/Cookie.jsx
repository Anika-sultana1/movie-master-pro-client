import React from 'react';

const Cookie = () => {

const [isModalOpen, setIsModalOpen] = React.useState(false);

    return (
        <div className="min-h-screen bg-secondary text-base-content py-12 px-4 md:px-12 lg:px-24 pt-20">
            <div className="max-w-4xl mx-auto">
          
                <header className="text-center mb-16">
                    <div className="inline-block p-3 rounded-2xl bg-primary/10 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black mb-4">Cookie Policy</h1>
                    <p className="text-lg opacity-70">How we use cookies to improve your experience</p>
                    <div className="divider w-32 mx-auto"></div>
                </header>

                <div className="space-y-10">
 
                    <section className="card bg-secondary shadow-sm border border-base-300">
                        <div className="card-body">
                            <h2 className="card-title text-2xl text-secondary">What are Cookies?</h2>
                            <p className="opacity-80 leading-relaxed">
                                Cookies are small text files stored on your device when you visit websites. They help the website recognize your device and remember information about your preferences or past actions.
                            </p>
                        </div>
                    </section>

             
                    <section>
                        <h2 className="text-3xl font-bold mb-6 px-4">The Cookies We Set</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
                            <div className="p-8 bg-linear-to-br from-primary/5 to-transparent rounded-2xl border border-primary/20">
                                <span className="badge badge-primary mb-4">Necessary</span>
                                <h3 className="text-xl font-bold mb-2">Essential Cookies</h3>
                                <p className="text-sm opacity-70">These are required for the website to function. They handle authentication and security during your session.</p>
                            </div>

                    
                            <div className="p-8 bg-linear-to-br from-secondary/5 to-transparent rounded-2xl border border-secondary/20">
                                <span className="badge badge-secondary mb-4">Preferences</span>
                                <h3 className="text-xl font-bold mb-2">UI Preferences</h3>
                                <p className="text-sm opacity-70">We use Local Storage to remember your DaisyUI theme choice (Light/Dark mode) for your next visit.</p>
                            </div>

                            <div className="p-8 bg-linear-to-br from-accent/5 to-transparent rounded-2xl border border-accent/20">
                                <span className="badge badge-accent mb-4">Analytics</span>
                                <h3 className="text-xl font-bold mb-2">Analytics</h3>
                                <p className="text-sm opacity-70">We use third-party tools to understand how you interact with our site so we can improve the UI/UX.</p>
                            </div>

                            <div className="p-8 bg-linear-to-br from-info/5 to-transparent rounded-2xl border border-info/20">
                                <span className="badge badge-info mb-4">Third-Party</span>
                                <h3 className="text-xl font-bold mb-2">External Assets</h3>
                                <p className="text-sm opacity-70">Libraries like Google Fonts or Icon sets may collect standard technical data for delivery.</p>
                            </div>
                        </div>
                    </section>

             
                    <section className="bg-neutral text-neutral-content rounded-2xl p-8 md:p-12 shadow-2xl">
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="flex-1">
                                <h2 className="text-3xl font-bold mb-4">Controlling Cookies</h2>
                                <p className="opacity-80">
                                    You can control and/or delete cookies as you wish—for details, see <span className="underline decoration-primary">aboutcookies.org</span>. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed.
                                </p>
                            </div>
                            <div className="flex-none">
                               <button 
  onClick={() => setIsModalOpen(true)} 
  className="btn btn-primary btn-lg rounded-2xl"
>
  Manage Settings
</button>
{/* --- Ultra Modern Cookie Settings Modal --- */}
{isModalOpen && (
    <div className="modal modal-open modal-bottom sm:modal-middle backdrop-blur-sm transition-all duration-300">
        <div className="modal-box max-w-md bg-secondary border border-primary/20 shadow-2xl rounded-2xl p-8 relative overflow-hidden">
            
            {/* Background Decoration */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-2xl blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-secondary/10 rounded-2xl blur-3xl"></div>

            {/* Modal Header */}
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-primary/20 text-primary rounded-2xl">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </div>
                <div>
                    <h3 className="text-2xl font-black leading-none text-black">Settings</h3>
                    <p className="text-xs opacity-50 mt-1 uppercase tracking-widest font-bold">Privacy Control</p>
                </div>
            </div>

            {/* Cookie Items */}
            <div className="space-y-3 relative z-10">
                
                {/* Essential - Always ON */}
                <div className="group flex justify-between items-center p-4 bg-secondary hover:bg-dark rounded-2xl border border-transparent hover:border-primary/20 transition-all">
                    <div className="flex-1">
                        <h4 className="font-bold text-black text-sm">Strictly Necessary</h4>
                        <p className="text-[10px] opacity-60 text-gray-700">Required for site security and login.</p>
                    </div>
                    <input type="checkbox" className="toggle toggle-primary toggle-sm" checked disabled />
                </div>

            
                <div className="group flex justify-between items-center p-4 bg-secondary hover:bg-dark rounded-2xl border border-transparent hover:border-secondary/20 transition-all">
                    <div className="flex-1">
                        <h4 className="font-bold text-black text-sm">Performance Tools</h4>
                        <p className="text-[10px] opacity-60 text-gray-700">Help us understand how you use the site.</p>
                    </div>
                    <input type="checkbox" className="toggle toggle-secondary toggle-sm" defaultChecked />
                </div>

                <div className="group flex justify-between items-center p-4 bg-secondary hover:bg-dark rounded-2xl border border-transparent hover:border-accent/20 transition-all">
                    <div className="flex-1">
                        <h4 className="font-bold text-black text-sm">Personalization</h4>
                        <p className="text-[10px] opacity-60 text-gray-700">Saves your theme and language settings.</p>
                    </div>
                    <input type="checkbox" className="toggle toggle-accent toggle-sm" defaultChecked />
                </div>

            </div>

       
            <div className="flex gap-3 mt-10">
                <button 
                    className="btn btn-ghost text-gray-700 flex-1 rounded-2xl" 
                    onClick={() => setIsModalOpen(false)}
                >
                    Dismiss
                </button>
                <button 
                    className="btn bg-primary flex-1 rounded-2xl shadow-lg shadow-primary/20" 
                    onClick={() => {
                
                        setIsModalOpen(false);
                    }}
                >
                    Save Changes
                </button>
            </div>
        </div>
        
       
        <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}></div>
    </div>
)}
                            </div>
                        </div>
                    </section>

           
                    <section className="overflow-x-auto">
                        <h2 className="text-2xl font-bold mb-6">Specific Cookies Used</h2>
                        <table className="table w-full bg-secondary rounded-2xl overflow-hidden">
                            <thead>
                                <tr className="bg-dark">
                                    <th>Name</th>
                                    <th>Purpose</th>
                                    <th>Duration</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><span className="font-mono text-primary italic">theme_mode</span></td>
                                    <td>Stores Dark/Light theme preference</td>
                                    <td>Persistent</td>
                                </tr>
                                <tr>
                                    <td><span className="font-mono text-primary italic">_ga</span></td>
                                    <td>Google Analytics Tracking</td>
                                    <td>2 Years</td>
                                </tr>
                                <tr>
                                    <td><span className="font-mono text-primary italic">session_id</span></td>
                                    <td>User Authentication</td>
                                    <td>Session</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>
                </div>

                <footer className="mt-20 text-center opacity-50 text-sm">
                    <p>If you have questions about our cookie usage, please email us.</p>
                </footer>
            </div>
        </div>
    );
};

export default Cookie;