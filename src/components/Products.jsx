import React from "react";
import { Card, Row, Col } from "antd";
import { products } from "../constants";
import ProductCard from "./ProductCard";

const Products = () => {
  return (
    <div className="product-grid-container">
      <Row gutter={[16, 16]}>
        {products.map((product) => (
          <ProductCard product={product} />
        ))}
      </Row>
    </div>
  );
};

export default Products;
