
import React from 'react';


const LoadingCard = () => {
    return (
        <div className=" py-4  rounded  animate-pulse grid grid-cols-2 gap-x-3">
            <div className="h-40 bg-gray-200 rounded mb-4"></div>
            <div className="h-40 bg-gray-200 rounded mb-2"></div>
            <div className="h-40 bg-gray-200 rounded mb-2"></div>
            <div className="h-40 bg-gray-200 rounded mb-2"></div>
            <div className="h-40 bg-gray-200 rounded mb-2"></div>
            <div className="h-40 bg-gray-200 rounded mb-2"></div>
            <div className="h-40 bg-gray-200 rounded mb-2"></div>
            <div className="h-40 bg-gray-200 rounded mb-2"></div>
        </div>
    );
};

export default LoadingCard;

