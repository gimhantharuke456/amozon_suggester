import { Button, Card, Input, Modal, message } from "antd";
import React, { useEffect, useState } from "react";
import SignInModal from "./SigninModal";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios
import { fetchData } from "../services/search_products";
import state from "../store";
import LoadingSpinner from "./Loading";

const Home = ({ onImageUpload }) => {
  const [signinModalOpend, setSignInModalOpened] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [predictedLabel, setPredictedLabel] = useState(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleUpload = async () => {
    // Perform any actions needed before uploading (e.g., validation).

    if (selectedImage) {
      try {
        setShouldLoad(true);
        const formData = new FormData();
        formData.append("image", selectedImage);

        // Make a POST request to the Flask API
        const response = await axios.post(
          "http://127.0.0.1:5000/upload_image",
          formData
        );

        // Handle the response as needed
        console.log("Prediction:", response.data);
        if (response.status == 200) {
          setPredictedLabel(response.data.label);
          localStorage.setItem("search_tag", predictedLabel);
          const productRes = await fetchData(response.data.label);
          state.products = productRes;
        }
        setShouldLoad(false);
      } catch (error) {
        message.error("Error uploading image:", error);
        setShouldLoad(false);
      }
    } else {
      message.warning("Please select an image before uploading.");
    }
  };

  if (shouldLoad) {
    return <LoadingSpinner />;
  }
  return (
    <div className="home-container">
      <nav
        style={{
          width: "100%",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
        }}
      >
        {auth.currentUser != null ? (
          <Button
            onClick={() => {
              navigate("/cart");
            }}
            type="primary"
          >
            Cart
          </Button>
        ) : (
          <Button
            onClick={() => {
              setSignInModalOpened(true);
            }}
            type="primary"
          >
            Sign In or Register
          </Button>
        )}
      </nav>
      <div style={{ flex: 1 }}></div>
      <Card className="upload-section">
        <Input type="file" accept="image/*" onChange={handleImageChange} />
        <button onClick={handleUpload}>Upload Image</button>
      </Card>
      <div style={{ flex: 1 }}></div>
      <SignInModal
        signinModalOpend={signinModalOpend}
        onClose={() => {
          setSignInModalOpened(false);
        }}
      />
    </div>
  );
};

export default Home;
