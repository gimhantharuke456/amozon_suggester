import React, { useState } from "react";
import { Col, Card, Button, message } from "antd";
import { addToCart } from "../services/add_to_cart";
import state from "../store";

const ProductCard = ({ product }) => {
  const handleAddToCart = async () => {
    try {
      await addToCart(product, 1);
      state.cart.push({
        product: product,
        quantity: 1,
        searchTag: localStorage.getItem("search_tag"),
        lowest_price: (Number(product.price.replace("$", "")) / 100) * 90,
      });
      message.success("Product added to the cart.");
    } catch (error) {
      message.error(`${error}`);
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
