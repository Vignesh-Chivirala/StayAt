import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className="bg-gradient-to-b from-slate-50 via-white to-slate-100 text-gray-600 pt-12 px-6 md:px-16 lg:px-24 xl:px-32">
      
      {/* Top Section */}
      <div className="flex flex-wrap justify-between gap-12 md:gap-8">
        
        {/* Brand */}
        <div className="max-w-80">
          <h2 className="text-2xl font-extrabold text-gray-800 tracking-wide font-serif">
            Stay<span className="text-indigo-600">At</span>
          </h2>
          <p className="mt-3 text-sm">
            Discover the world’s most extraordinary places to stay, from boutique hotels 
            to luxury villas and private escapes.
          </p>
          <div className="flex items-center gap-4 mt-5">
            <img src={assets.instagramIcon} alt="instagram" className="w-6 cursor-pointer hover:scale-110 transition-transform" />
            <img src={assets.facebookIcon} alt="facebook" className="w-6 cursor-pointer hover:scale-110 transition-transform" />
            <img src={assets.twitterIcon} alt="twitter" className="w-6 cursor-pointer hover:scale-110 transition-transform" />
            <img src={assets.linkendinIcon} alt="linkedin" className="w-6 cursor-pointer hover:scale-110 transition-transform" />
          </div>
        </div>

        {/* Company Links */}
        <div>
          <p className="font-semibold text-lg text-gray-900">Company</p>
          <ul className="mt-4 flex flex-col gap-2 text-sm">
            <li><a href="#" className="hover:text-indigo-600 transition-colors">About</a></li>
            <li><a href="#" className="hover:text-indigo-600 transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-indigo-600 transition-colors">Press</a></li>
            <li><a href="#" className="hover:text-indigo-600 transition-colors">Blog</a></li>
            <li><a href="#" className="hover:text-indigo-600 transition-colors">Partners</a></li>
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <p className="font-semibold text-lg text-gray-900">Support</p>
          <ul className="mt-4 flex flex-col gap-2 text-sm">
            <li><a href="#" className="hover:text-indigo-600 transition-colors">Help Center</a></li>
            <li><a href="#" className="hover:text-indigo-600 transition-colors">Safety Information</a></li>
            <li><a href="#" className="hover:text-indigo-600 transition-colors">Cancellation Options</a></li>
            <li><a href="#" className="hover:text-indigo-600 transition-colors">Contact Us</a></li>
            <li><a href="#" className="hover:text-indigo-600 transition-colors">Accessibility</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="max-w-80">
          <p className="font-semibold text-lg text-gray-900">Stay Updated</p>
          <p className="mt-3 text-sm">
            Subscribe to our newsletter for travel inspiration and special offers.
          </p>
          <div className="flex items-center mt-5 bg-white rounded-full shadow-sm border border-gray-300 overflow-hidden">
            <input 
              type="text" 
              className="flex-1 px-4 py-2 text-sm outline-none" 
              placeholder="Your email" 
            />
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-r-full transition-all">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-gray-300 mt-10" />

      {/* Bottom Row */}
      <div className="flex flex-col md:flex-row gap-2 items-center justify-between py-5 text-xs text-gray-500">
        <p>© {new Date().getFullYear()} StayAt. All rights reserved.</p>
        <ul className="flex items-center gap-4">
          <li><a href="#" className="hover:text-indigo-600 transition-colors">Privacy</a></li>
          <li><a href="#" className="hover:text-indigo-600 transition-colors">Terms</a></li>
          <li><a href="#" className="hover:text-indigo-600 transition-colors">Sitemap</a></li>
        </ul>
      </div>
    </div>
  )
}

export default Footer
