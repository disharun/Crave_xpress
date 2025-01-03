import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import foodRouter from "./routes/foodRoute.js";
import "dotenv/config";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import foodModel from "./models/foodModel.js";

// app config
const app = express();
const port = process.env.PORT || 4000;

// middlewares
app.use(express.json());
app.use(cors());

// db connection
connectDB();

// api endpoints
app.use("/api/user", userRouter);
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});
app.get("/api/food/search", async (req, res) => {
  const { q } = req.query;
  try {
    const results = await foodModel.find({
      $or: [
        { name: { $regex: q, $options: "i" } },
        { desc: { $regex: q, $options: "i" } },
      ],
    });
    res.json({ data: results });
  } catch (error) {
    res.status(500).send("Error fetching search results");
  }
});


app.listen(port, () =>
  console.log(`Server started on http://localhost:${port}`)
);
