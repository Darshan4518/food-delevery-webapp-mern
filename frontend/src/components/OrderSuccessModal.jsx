// src/components/OrderSuccessModal.jsx
import React from "react";
import { Modal, Box, Typography } from "@mui/material";

const OrderSuccessModal = ({ open, handleClose }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box className="bg-white p-6 rounded shadow-lg mx-auto mt-20 max-w-md text-center">
        <Typography variant="h5" className="mb-4">
          Order Successful!
        </Typography>
        <Typography variant="body1" className="mb-4">
          Your order has been placed successfully.
        </Typography>
        <button
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          onClick={handleClose}
        >
          Close
        </button>
      </Box>
    </Modal>
  );
};

export default OrderSuccessModal;
