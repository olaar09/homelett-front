"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const lastWords = ["insights.", "records", "charts.", "workflows."];

const typingVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100 } },
};

const HomeText = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % lastWords.length);
    }, 3000); // Change the last word every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative"
      style={{
        fontFamily: "Arial, sans-serif",
        fontSize: "24px",
        textAlign: "center",
        marginTop: "10px",
      }}
    >
      <span className="font-bold text-foreground  text-5xl lg:text-md xs:text:md">
        Chat with any datasource{" "}
        <AnimatePresence mode="wait">
          <motion.span
            key={index}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={typingVariants}
          >
            for <span className=" text-primary w-20">{lastWords[index]}</span>
          </motion.span>
        </AnimatePresence>
      </span>
    </div>
  );
};

export default HomeText;
