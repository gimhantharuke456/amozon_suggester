import { Button, Card, Input, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { fetchData } from "../services/search_products";
import SignInModal from "./SigninModal";

const Home = ({ onImageUpload }) => {
  const [signinModalOpend, setSignInModalOpened] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);

    // You can perform additional actions with the selected image, such as uploading it to the server.
  };

  useEffect(() => {
    //fetchData();
  }, []);

  const handleUpload = () => {
    // Perform any actions needed before uploading (e.g., validation).

    if (selectedImage) {
      onImageUpload(selectedImage);
    } else {
      alert("Please select an image before uploading.");
    }
  };

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
        <Button
          onClick={() => {
            setSignInModalOpened(true);
          }}
          type="primary"
        >
          Sign In or Register
        </Button>
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
