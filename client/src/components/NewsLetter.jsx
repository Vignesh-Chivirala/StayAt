import React from 'react'
import Title from './Title'
import { assets } from '../assets/assets'

const NewsLetter = () => {
    return (
        <div className="flex flex-col items-center max-w-5xl lg:w-full rounded-3xl px-6 py-14 md:py-20 mx-4 lg:mx-auto my-24 bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 text-white shadow-xl relative overflow-hidden">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 via-transparent to-indigo-500/20 blur-3xl -z-10"></div>

            <Title 
                title="✨ Stay Inspired" 
                subTitle="Join our travel community and unlock handpicked deals, hidden gems, and unforgettable adventures delivered straight to your inbox." 
            />

            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-8 w-full max-w-lg">
                <input 
                    type="email" 
                    className="bg-white/10 px-5 py-3.5 border border-white/20 rounded-xl outline-none w-full text-sm placeholder-gray-300 focus:ring-2 focus:ring-purple-400 transition-all" 
                    placeholder="Enter your email address" 
                />
                <button className="flex items-center justify-center gap-2 group bg-gradient-to-r from-purple-600 to-indigo-600 px-7 py-3.5 rounded-xl text-sm font-medium shadow-md hover:shadow-lg active:scale-95 transition-all">
                    Subscribe
                    <img 
                        src={assets.arrowIcon} 
                        alt="arrow-icon" 
                        className="w-4 invert group-hover:translate-x-1 transition-transform duration-300" 
                    />
                </button>
            </div>

            <p className="text-gray-400 mt-6 text-xs text-center max-w-md">
                By subscribing, you agree to our Privacy Policy and consent to receive curated updates and offers. You can unsubscribe anytime.
            </p>
        </div>
    )
}

export default NewsLetter
