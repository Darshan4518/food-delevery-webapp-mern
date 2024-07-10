import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { IoMicOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import { Context } from "../store/Strore";

const SearchFilter = () => {
  const { setFoods } = useContext(Context);
  const [voiceSearchActive, setVoiceSearchActive] = useState(false);
  const [search, setSearch] = useState("");

  const startVoiceSearch = () => {
    setVoiceSearchActive(true);
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const speechToText = event.results[0][0].transcript;
      setSearch(speechToText);
      setVoiceSearchActive(false);
      handleSearch(speechToText);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setVoiceSearchActive(false);
    };

    recognition.start();
  };

  const handleSearch = async (query) => {
    setSearch(query);

    try {
      const response = await axios.get(
        `http://localhost:5000/api/foods/filter/search?query=${query}`
      );
      setFoods(response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setFoods([]);
    }
  };

  return (
    <div className="mb-4 flex items-center justify-end px-3 w-[40%]">
      <input
        type="text"
        className="border rounded py-2 px-4 w-[100%]"
        placeholder="Search food...."
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <button onClick={startVoiceSearch} disabled={voiceSearchActive}>
        {voiceSearchActive ? (
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: 1.1 }}
            transition={{ duration: 0.3, yoyo: Infinity }}
          >
            <IoMicOutline style={{ fontSize: 35, color: "red" }} />
          </motion.div>
        ) : (
          <IoMicOutline style={{ fontSize: 35, color: "green" }} />
        )}
      </button>
    </div>
  );
};

export default SearchFilter;
