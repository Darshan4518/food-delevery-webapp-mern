<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Darshan-Food-Order README</title>
</head>

<body>

  <h1>Darshan-Food-Order</h1>

  <p><strong>Darshan-Food-Order</strong> is a full-stack food ordering web application built with <strong>React.js</strong>, <strong>Node.js</strong>, <strong>Express</strong>, and <strong>MongoDB</strong>. It allows users to browse food items, place orders, and manage their orders, while providing administrators the ability to manage menus and categories through a comprehensive dashboard.</p>

  <h2>Live Demo</h2>
  <p>Check out the live application: <a href="https://your-live-link-here.com" target="_blank">Live Demo</a></p>

  <h2>Screenshots</h2>
  <p>Below are some screenshots of the application:</p>

  <h3>Home Page</h3>
  <img src="https://your-screenshot-link.com/homepage.png" alt="Home Page Screenshot" width="600px">

  <h3>Admin Panel</h3>
  <img src="https://your-screenshot-link.com/admin-panel.png" alt="Admin Panel Screenshot" width="600px">

  <h3>Order Page</h3>
  <img src="https://your-screenshot-link.com/order-page.png" alt="Order Page Screenshot" width="600px">

  <h2>Features</h2>

  <h3>User Features</h3>
  <ul>
    <li><strong>Browse Menus:</strong> Users can view available food items categorized by type.</li>
    <li><strong>Order Food:</strong> Add items to the cart, place orders, and track order status.</li>
    <li><strong>User Authentication:</strong> Secure user authentication and management using <strong>Clerk</strong>.</li>
    <li><strong>Responsive UI:</strong> Built with <strong>Tailwind CSS</strong> and <strong>Material UI</strong> for a sleek and modern design.</li>
    <li><strong>Interactive Animations:</strong> <strong>Framer Motion</strong> is used for smooth, interactive transitions.</li>
    <li><strong>Notifications:</strong> In-app notifications with <strong>React Toastify</strong> for a better user experience.</li>
    <li><strong>Image Upload:</strong> Image handling and upload via <strong>Cloudinary</strong> and <strong>Multer</strong>.</li>
  </ul>

  <h3>Admin Features</h3>
  <ul>
    <li><strong>Admin Panel:</strong> A comprehensive dashboard for admin management.</li>
    <li><strong>Menu Management:</strong> Admins can create, update, and delete food items.</li>
    <li><strong>Category Management:</strong> Admins can add, update, and delete food categories.</li>
    <li><strong>Order Management:</strong> Admins can track and manage user orders.</li>
    <li><strong>Real-time Updates:</strong> <strong>Redis</strong> is used for real-time data updates and caching.</li>
  </ul>

  <h2>Tech Stack</h2>

  <h3>Frontend:</h3>
  <ul>
    <li><strong>React.js:</strong> JavaScript library for building user interfaces.</li>
    <li><strong>Tailwind CSS:</strong> Utility-first CSS framework for styling.</li>
    <li><strong>Material UI:</strong> React UI framework for pre-built components.</li>
    <li><strong>Framer Motion:</strong> Animations and transitions for a smooth experience.</li>
    <li><strong>React Toastify:</strong> Notifications for user actions.</li>
    <li><strong>Clerk:</strong> Authentication and user management.</li>
  </ul>

  <h3>Backend:</h3>
  <ul>
    <li><strong>Node.js:</strong> JavaScript runtime for server-side development.</li>
    <li><strong>Express.js:</strong> Web framework for building APIs.</li>
    <li><strong>MongoDB:</strong> NoSQL database for storing data.</li>
    <li><strong>Multer:</strong> Middleware for handling multipart form data (image uploads).</li>
    <li><strong>Cloudinary:</strong> Cloud-based image and video management service.</li>
    <li><strong>Redis:</strong> In-memory data structure store for caching and real-time updates.</li>
  </ul>

  <h2>Installation</h2>
  <ol>
    <li><strong>Clone the repository:</strong></li>
    <pre><code>git clone https://github.com/yourusername/darshan-food-order.git
cd darshan-food-order
    </code></pre>
    <li><strong>Install dependencies</strong> for both frontend and backend:</li>
    <pre><code># Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
    </code></pre>

    <li><strong>Set up environment variables:</strong></li>
    <p>Create a <code>.env</code> file in the <code>backend</code> directory and add the following:</p>
    <pre><code>MONGODB_URI=&lt;your-mongodb-uri&gt;
CLOUDINARY_API_KEY=&lt;your-cloudinary-api-key&gt;
CLOUDINARY_API_SECRET=&lt;your-cloudinary-api-secret&gt;
CLOUDINARY_CLOUD_NAME=&lt;your-cloudinary-cloud-name&gt;
REDIS_URL=&lt;your-redis-url&gt;
CLERK_API_KEY=&lt;your-clerk-api-key&gt;
    </code></pre>
    <li><strong>Run the application:</strong></li>
    <p><strong>Start the backend server:</strong></p>
    <pre><code>cd backend
npm run dev
    </code></pre>
    <p><strong>Start the frontend server:</strong></p>
    <pre><code>cd frontend
npm start
    </code></pre>
    <li><strong>Access the application:</strong></li>
    <ul>
      <li>Frontend: <a href="http://localhost:3000">http://localhost:3000</a></li>
      <li>Backend: <a href="http://localhost:5000">http://localhost:5000</a></li>
    </ul>
  </ol>

  <h2>Contributing</h2>
  <ol>
    <li>Fork the project.</li>
    <li>Create a new branch for your feature (<code>git checkout -b feature-name</code>).</li>
    <li>Commit your changes (<code>git commit -m 'Add feature'</code>).</li>
    <li>Push to the branch (<code>git push origin feature-name</code>).</li>
    <li>Open a Pull Request.</li>
  </ol>

  <h2>License</h2>
  <p>This project is licensed under the MIT License.</p>

</body>

</html>
