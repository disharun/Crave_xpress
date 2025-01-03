import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { assets } from "../../assets/assets";
import "./FoodDetail.css";

const FoodDetail = ({ addToCart }) => {
  const { foodId } = useParams();
  const [foodItem, setFoodItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addedToCart, setAddedToCart] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFoodDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/food/${foodId}`);
        setFoodItem(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching food details:", error);
        setLoading(false);
      }
    };
    fetchFoodDetails();
  }, [foodId]);

  const handleBack = () => {
    navigate("/");
  };

  const handleAddToCart = () => {
    if (foodItem) {
      addToCart(foodItem);
      setAddedToCart(true);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <p>Loading...</p>
      </div>
    );
  }

  if (!foodItem) {
    return <p>Food item not found!</p>;
  }

  const imageUrl = foodItem.image ? `http://localhost:4000/images/${foodItem.image}` : assets.defaultImage;

  return (
    <div className="food-detail-container">
      <div className="food-detail-header">
        <button onClick={handleBack} className="back-button">Back to Home</button>
      </div>
      <div className="food-detail-content">
        <div className="food-image">
          <img src={imageUrl} alt={foodItem.name} />
        </div>
        <div className="food-info">
          <h1>{foodItem.name}</h1>
          <p className="food-price">₹{foodItem.price}</p>
          <p className="food-description">{foodItem.description}</p>
        </div>
      </div>
      <div className="food-detail-footer">
        <button
          className="add-to-cart-button"
          onClick={handleAddToCart}
          disabled={addedToCart}
        >
          {addedToCart ? "Added to Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default FoodDetail;
