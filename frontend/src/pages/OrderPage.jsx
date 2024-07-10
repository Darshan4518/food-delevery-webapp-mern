import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";
import {
  MdLocationOn,
  MdPhone,
  MdPerson,
  MdAdd,
  MdEmail,
  MdHome,
} from "react-icons/md";
import { useUser } from "@clerk/clerk-react"; // Clerk import

const OrderDetails = () => {
  const { user } = useUser();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Form submission logic here
  };

  return (
    <Container maxWidth="sm">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Order Details
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            InputProps={{
              startAdornment: <MdPerson />,
            }}
          />
          <TextField
            label="Mobile Number"
            variant="outlined"
            fullWidth
            InputProps={{
              startAdornment: <MdPhone />,
            }}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            InputProps={{
              startAdornment: <MdEmail />,
            }}
            value={user.primaryEmailAddress.emailAddress}
            disabled
          />
          <TextField
            label="Address"
            variant="outlined"
            fullWidth
            InputProps={{
              startAdornment: <MdLocationOn />,
            }}
          />
          <TextField
            label="Additional Address"
            variant="outlined"
            fullWidth
            InputProps={{
              startAdornment: <MdAdd />,
            }}
          />
          <TextField
            label="City"
            variant="outlined"
            fullWidth
            InputProps={{
              startAdornment: <MdHome />,
            }}
          />
          <TextField
            label="Zip Code"
            variant="outlined"
            fullWidth
            InputProps={{
              startAdornment: <MdHome />,
            }}
          />

          <TextField
            label="Additional Number"
            variant="outlined"
            fullWidth
            InputProps={{
              startAdornment: <MdAdd />,
            }}
          />
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Box>
      </motion.div>
    </Container>
  );
};

export default OrderDetails;
