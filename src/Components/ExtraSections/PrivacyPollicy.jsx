import React from 'react';
import { Link } from 'react-router';

const PrivacyPolicy = () => {
 
    const sections = [
        { id: "intro", title: "Introduction" },
        { id: "info-collect", title: "Information We Collect" },
        { id: "how-use", title: "How We Use Data" },
        { id: "cookies", title: "Cookies & Storage" },
        { id: "third-party", title: "Third-Party Services" },
        { id: "security", title: "Data Security" },
        { id: "contact", title: "Contact Us" },
    ];

    return (
        <div className="min-h-screen bg-secondary text-base-content py-12 px-4 md:px-12 lg:px-24 pt-20">
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
                
                {/* Left Side: Sticky Navigation (Desktop Only) */}
                <aside className="hidden lg:block w-1/4 sticky top-24 h-fit">
                    <ul className="menu bg-dark w-full rounded-box p-4 shadow-sm border border-base-300">
                        <li className="menu-title text-primary font-bold">Table of Contents</li>
                        {sections.map((section) => (
                            <li key={section.id}>
                                <a href={`#${section.id}`} className="hover:text-primary transition-colors">
                                    {section.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </aside>

                {/* Right Side: Main Content */}
                <main className="flex-1 space-y-16">
                    {/* Header Section */}
                    <header className="text-center lg:text-left">
                        <h1 className="text-5xl font-extrabold mb-4 bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                            Privacy Policy
                        </h1>
                        <p className="text-sm opacity-60 italic">Last Updated: October 2023</p>
                        <div className="divider divider-primary w-24"></div>
                    </header>

                    {/* Section: Introduction */}
                    <section id="intro" className="scroll-mt-24">
                        <div className="card bg-dark shadow-xl border-l-8 border-primary">
                            <div className="card-body">
                                <h2 className="card-title text-2xl font-bold">Introduction</h2>
                                <p className="leading-relaxed">
                                    Welcome to our platform. We value your privacy and are committed to protecting your personal data. 
                                    This policy explains how we handle your information when you use our services built with 
                                    <span className="badge badge-outline mx-1">React</span>, 
                                    <span className="badge badge-outline mx-1">Tailwind</span>, and 
                                    <span className="badge badge-outline mx-1">DaisyUI</span>.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Section: Information We Collect */}
                    <section id="info-collect" className="scroll-mt-24 space-y-4">
                        <h2 className="text-3xl font-bold flex items-center gap-2">
                            <span className="text-primary text-4xl">01.</span> Information We Collect
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-6 bg-dark rounded-2xl border border-base-300">
                                <h3 className="font-bold mb-2">Personal Data</h3>
                                <p className="text-sm opacity-80">We may collect your name, email address, and profile picture when you sign up using our forms.</p>
                            </div>
                            <div className="p-6 bg-dark rounded-2xl border border-base-300">
                                <h3 className="font-bold mb-2">Usage Data</h3>
                                <p className="text-sm opacity-80">Technical data like IP address, browser type, and device information are collected automatically.</p>
                            </div>
                        </div>
                    </section>

                    {/* Section: How We Use Data */}
                    <section id="how-use" className="scroll-mt-24">
                        <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                            <span className="text-secondary text-4xl">02.</span> How We Use Data
                        </h2>
                        <ul className="steps steps-vertical lg:steps-horizontal w-full bg-dark p-8 rounded-2xl">
                            <li className="step step-primary">Provide Services</li>
                            <li className="step step-primary">Improve UI/UX</li>
                            <li className="step step-primary">Communication</li>
                            <li className="step">Marketing</li>
                        </ul>
                    </section>

                    {/* Section: Cookies & Storage (Using Collapse) */}
                    <section id="cookies" className="scroll-mt-24">
                        <h2 className="text-3xl font-bold mb-6">Cookies & Local Storage</h2>
                        <div className="collapse collapse-arrow bg-dark border border-base-300 rounded-box">
                            <input type="checkbox" /> 
                            <div className="collapse-title text-xl font-medium">
                                Why do we use Local Storage?
                            </div>
                            <div className="collapse-content"> 
                                <p>We use <code className="text-accent italic">localStorage</code> to save your theme preferences (Dark/Light mode) and session tokens to keep you logged in securely without re-entering credentials.</p>
                            </div>
                        </div>
                    </section>

                    {/* Section: Contact */}
                    <section id="contact" className="scroll-mt-24 text-center py-12 bg-linear-to-br from-primary/10 to-secondary/10 rounded-2xl border border-primary/20">
                        <h2 className="text-3xl font-bold mb-4">Have Any Questions?</h2>
                        <p className="mb-8 opacity-70">If you have concerns about your data, please reach out to our team.</p>
                       <Link to='/contact'>
                        <button className="btn btn-primary btn-wide shadow-lg">Contact Support</button></Link>
                    </section>

                    {/* Footer for Privacy Page */}
                    <footer className="footer footer-center p-4 text-base-content/50">
                        <aside>
                            <p>© 2026 MOVIEMASTER. All rights reserved.</p>
                        </aside>
                    </footer>
                </main>
            </div>
        </div>
    );
};

export default PrivacyPolicy;