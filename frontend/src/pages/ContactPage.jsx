import React from "react";
import { TextField, Button, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { styled } from "@mui/system";

const ContactContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "2rem",
  maxWidth: "600px",
  margin: "auto",
});

const MotionButton = motion(Button);

const ContactPage = () => {
  return (
    <ContactContainer className="bg-gray-50 p-6 rounded-lg shadow-md">
      <Typography variant="h4" component="h1" className="mb-4 text-gray-800">
        Contact Us
      </Typography>
      <form className="w-full space-y-4">
        <TextField fullWidth label="Name" variant="outlined" required />
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          type="email"
          required
        />
        <TextField
          fullWidth
          label="Phone Number"
          variant="outlined"
          type="tel"
        />
        <TextField
          fullWidth
          label="Message"
          variant="outlined"
          multiline
          rows={4}
          required
        />
        <div className="flex justify-center">
          <MotionButton
            type="submit"
            variant="contained"
            color="primary"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </MotionButton>
        </div>
      </form>
    </ContactContainer>
  );
};

export default ContactPage;
