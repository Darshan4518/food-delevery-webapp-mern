import React from "react";
import { motion } from "framer-motion";
import {
  Typography,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { styled } from "@mui/system";

const blogPosts = [
  {
    title: "The Best Street Foods to Try in 2024",
    description:
      "Discover the top street foods you must try in 2024, from various cultures and cuisines.",
    image:
      "https://tds.indianeagle.com/wp-content/uploads/2024/03/Must-Try-Street-Foods-of-India-01.png",
    date: "July 1, 2024",
  },
  {
    title: "Healthy Eating: Tips and Tricks in 2024",
    description:
      "Learn how to maintain a healthy diet while enjoying delicious meals from our delivery service.",
    image:
      "https://drivefordti.com/wp-content/uploads/2019/01/HealthyEatingTips1.jpg",
    date: "June 15, 2024",
  },
  {
    title: "Top 10 Dishes to Try This Summer",
    description:
      "A curated list of must-try dishes for the summer season, perfect for food lovers.",
    image:
      "https://i.ndtvimg.com/i/2017-04/salad-620x350_620x350_61491216343.jpg",
    date: "June 10, 2024",
  },
];

const BlogContainer = styled(Container)({
  paddingTop: "2rem",
  paddingBottom: "2rem",
});

const MotionCard = motion(Card);

const BlogPage = () => {
  return (
    <BlogContainer maxWidth="lg">
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Our Blog
      </Typography>
      <Typography
        variant="h6"
        component="p"
        gutterBottom
        align="center"
        color="textSecondary"
      >
        Stay updated with the latest food trends, tips, and delicious recipes.
      </Typography>
      <Grid container spacing={4} marginTop={10}>
        {blogPosts.map((post, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <MotionCard
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-lg shadow-lg overflow-hidden"
            >
              <CardMedia
                component="img"
                height="200"
                image={post.image}
                alt={post.title}
                className=" max-h-[200px]"
              />
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  {post.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {post.description}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {post.date}
                </Typography>
              </CardContent>
            </MotionCard>
          </Grid>
        ))}
      </Grid>
    </BlogContainer>
  );
};

export default BlogPage;
