import React from "react";
import { Row } from "antd";

import ProductCard from "./ProductCard";
import { useSnapshot } from "valtio";
import state from "../store";

const Products = () => {
  const snap = useSnapshot(state);
  return (
    <div className="product-grid-container">
      <Row gutter={[16, 16]}>
        {snap.products.map((product) => (
          <ProductCard product={product} />
        ))}
      </Row>
    </div>
  );
};

export default Products;
