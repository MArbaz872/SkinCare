const express = require('express');
const cors = require('cors'); // CORS middleware

const app = express();
const port = process.env.PORT || 3000;

// Use CORS middleware
app.use(cors());

// API endpoint
app.get('/api/data', (req, res) => {
  // Sample data
  const data = {
    message: 'Hello from your Node.js API!!!',
  };

  res.json(data);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
