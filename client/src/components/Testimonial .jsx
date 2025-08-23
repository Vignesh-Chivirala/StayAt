import React from 'react';
import Title from './Title';
import { testimonials } from '../assets/assets';
import StarRating from './StarRating';

const Testimonial = () => {
    return (
        <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 pt-20 pb-30">
            <Title 
                title="What Our Guests Say" 
                subTitle="Hear from our travelers who experienced unforgettable stays with QuickStay. Their stories reflect our commitment to luxury, comfort, and excellence." 
            />

            <div className="flex flex-wrap items-stretch justify-center gap-8 mt-20 w-full">
                {testimonials.map((testimonial) => (
                    <div 
                        key={testimonial.id} 
                        className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all max-w-sm flex flex-col"
                        aria-label={`Testimonial from ${testimonial.name}`}
                    >
                        {/* User Info */}
                        <div className="flex items-center gap-3">
                            <img 
                                className="w-12 h-12 rounded-full object-cover border border-gray-200" 
                                src={testimonial.image} 
                                alt={testimonial.name} 
                            />
                            <div>
                                <p className="font-playfair text-lg font-semibold text-gray-800">{testimonial.name}</p>
                                <p className="text-gray-500 text-sm">{testimonial.location}</p>
                            </div>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-1 mt-4">
                            <StarRating rating={testimonial.rating} />
                        </div>

                        {/* Review */}
                        <p className="text-gray-600 mt-4 text-sm leading-relaxed">
                            "{testimonial.review}"
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Testimonial;
