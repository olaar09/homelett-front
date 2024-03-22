// components/SlideOut.tsx
import React, { useState } from "react";

const SlideOut: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="fixed top-4 left-4 z-30 p-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "Close" : "Open"}
      </button>

      <div
        className={`fixed top-0 left-0 z-20 w-64 h-full bg-white shadow-lg transform transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Content of the slide-out */}
        <div className="p-4">
          <h2 className="text-lg font-bold">Slide-Out Content</h2>
          <p>This is the content of the slide-out panel.</p>
        </div>
      </div>
    </>
  );
};

export default SlideOut;
