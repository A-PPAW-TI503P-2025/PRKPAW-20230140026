const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(cors());

// Endpoint utama
app.get('/', (req, res) => {
    res.json({ message: 'Hello from Server!' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
