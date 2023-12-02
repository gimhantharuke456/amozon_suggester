import React, { useState } from "react";
import { Col, Card, Button, message } from "antd";

const ProductCard = ({ product }) => {
  const [cart, setCart] = useState([]);

  const handleAddToCart = () => {
    const existingProduct = cart.find((item) => item.ASIN === product.ASIN);
    if (existingProduct) {
      message.warning("Product is already in the cart.");
    } else {
      setCart([...cart, product]);
      message.success("Product added to the cart.");
    }
  };

  return (
    <Col key={product.ASIN} xs={24} sm={12} md={8} lg={6}>
      <Card
        className="product-card"
        hoverable
        cover={<img alt={product.title} src={product.imageUrl} />}
      >
        <div className="product-details">
          <Card.Meta
            title={product.title}
            description={`Price: ${product.price}`}
          />
        </div>
        <div style={{ height: 16 }} />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button type="primary" onClick={handleAddToCart}>
            Add to Cart
          </Button>
          <a
            className="product-link"
            href={product.detailPageURL}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on Amazon
          </a>
        </div>
      </Card>
    </Col>
  );
};

export default ProductCard;
