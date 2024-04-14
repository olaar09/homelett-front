import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const lastWords = [
  "Fetch Records.",
  "View Charts",
  "Get Insights",
  "Create Workflows.",
];

const InsightText = () => {
  const [index, setIndex] = useState(0);
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    // Clear characters first to avoid old characters showing during transition
    setCharacters([]);

    // Delay setting new characters to allow AnimatePresence to fully animate out old characters
    const timeout = setTimeout(() => {
      const newChars = [...lastWords[index].split("")]; // Split the current word into an array of characters
      setCharacters(newChars);
    }, 1000); // Increased delay to ensure smoother transitions

    const nextWordTimeout = setTimeout(() => {
      setIndex((prevIndex) => (prevIndex + 1) % lastWords.length);
    }, 1000 + lastWords[index].length * 150 + 3000); // Adjust time for all characters to animate plus a pause

    return () => {
      clearTimeout(timeout);
      clearTimeout(nextWordTimeout);
    };
  }, [index]);

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        fontSize: "24px",
        textAlign: "center",
        marginTop: "10px",
      }}
    >
      <span className=" lg:text-5xl text-2xl font-black">
        {" "}
        Chat with any datasource to
      </span>
      <br />
      <span className="text-5xl font-black text-primary">
        <AnimatePresence>
          {characters.map((char, i) => (
            <motion.span
              key={`${index}-${i}`} // Use both index and character position to ensure unique keys
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10, transition: { duration: 0 } }} // Slightly longer duration for a smoother exit
              transition={{ delay: i * 0.15, duration: 0.25 }} // Adjusted duration for a smoother enter
            >
              {char}
            </motion.span>
          ))}
        </AnimatePresence>
      </span>
    </div>
  );
};

export default InsightText;
