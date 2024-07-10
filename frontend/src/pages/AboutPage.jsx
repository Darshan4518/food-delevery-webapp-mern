import React from "react";
import { motion } from "framer-motion";
import { Typography, Container, Box, Grid, Paper } from "@mui/material";

const statsData = [
  { label: "Total Orders", value: "15k", color: "text-blue-600" },
  { label: "Happy Customers", value: "12k", color: "text-blue-600" },
  { label: "Available Dishes", value: "350", color: "text-blue-600" },
];

const StatCard = ({ label, value, color }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center"
  >
    <Typography
      variant="h4"
      component="dd"
      className={`font-extrabold ${color} md:text-5xl`}
    >
      {value}
    </Typography>
    <Typography
      variant="subtitle1"
      component="dt"
      className="order-last text-lg font-medium text-gray-500"
    >
      {label}
    </Typography>
  </motion.div>
);

const AboutPage = () => {
  return (
    <section className="bg-white">
      <Container maxWidth="xl" className="px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <Box textAlign="center" maxWidth="3xl" mx="auto">
          <Typography
            variant="h3"
            component="h2"
            className="font-bold text-gray-900 sm:text-4xl"
          >
            Trusted by Food Lovers
          </Typography>
          <Typography variant="body1" className="mt-4 text-gray-500 sm:text-xl">
            Our commitment to quality and service has earned us the trust of
            thousands of happy customers. Join us in our journey to deliver
            delicious meals right to your doorstep.
          </Typography>
        </Box>
        <Box mt={8} sm={{ mt: 12 }}>
          <Grid container spacing={4}>
            {statsData.map((stat, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <StatCard
                  label={stat.label}
                  value={stat.value}
                  color={stat.color}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </section>
  );
};

export default AboutPage;
