import React from 'react'

const Title = ({ 
    title, 
    subTitle, 
    align = "center", 
    font = "font-playfair",
    highlight, // optional word/phrase to highlight
    className = "" // extra classes for customization
}) => {
    const alignment = align === "left" ? "items-start text-left" : "items-center text-center";

    return (
        <div className={`flex flex-col justify-center ${alignment} ${className}`}>
            <h1 
                className={`text-3xl md:text-[40px] font-bold tracking-tight ${font} bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-purple-700`}
            >
                {title} {highlight && <span className="text-purple-600">{highlight}</span>}
            </h1>
            
            {subTitle && (
                <p className="text-sm md:text-base text-gray-600 mt-3 max-w-2xl leading-relaxed">
                    {subTitle}
                </p>
            )}
        </div>
    )
}

export default Title
