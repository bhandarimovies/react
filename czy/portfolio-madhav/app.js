import express from 'express';
import mongoose from 'mongoose';

const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/madhav')
.then(() => {
    console.log("Database connected");

    app.listen(PORT, () => {
        console.log("Server running on port " + PORT);
    });
})
.catch((err) => {
    console.log("Error connecting DB:", err);
});
