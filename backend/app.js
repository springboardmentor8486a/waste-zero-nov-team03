import express from "express"
import cors from 'cors'
import 'dotenv/config';
import userRouter from "./routes/userRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use('/api/users', userRouter);

app.listen(PORT, () => {
    console.log("Server running on port", PORT);
})