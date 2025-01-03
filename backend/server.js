import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import foodRouter from "./routes/foodRoute.js";
import "dotenv/config";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import Food from "./models/foodModel.js"; // Correct import for the Food model

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
  if (!q || q.trim().length === 0) {
    return res.status(400).json({ message: "Search query is required." });
  }

  try {
    const results = await Food.find({
      $or: [
        { name: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
      ],
    });

    if (results.length === 0) {
      return res.status(404).json({ message: "No results found" });
    }

    res.json({
      data: results.map(item => ({
        _id: item._id,
        name: item.name,
        price: item.price,
        imageUrl: item.image ? `/images/${item.image}` : "/images/default_image.jpg",
      })),
    });
  } catch (error) {
    console.error("Error fetching search results:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


app.get("/api/food/:foodId", async (req, res) => {
  try {
    const foodItem = await Food.findById(req.params.foodId);  
    if (!foodItem) {
      return res.status(404).json({ message: "Food item not found" });
    }
    res.json(foodItem);
  } catch (error) {
    console.error("Error fetching food item:", error);
    res.status(500).json({ message: "Error fetching food item", error: error.message });
  }
});


app.listen(port, () =>
  console.log(`Server started on http://localhost:${port}`)
);
