import React, { useState, useEffect } from "react";
import { Card, Row, Col, Button, message } from "antd";
import { getCartItems, deleteCartItem } from "../services/add_to_cart";
import { useSnapshot } from "valtio";
import state from "../store";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const snap = useSnapshot(state);
  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const items = snap.cart;
      setCartItems(items);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const handleDeleteCartItem = async (cartItemId) => {
    try {
      await deleteCartItem(cartItemId);
      message.success("Item removed from the cart.");
      fetchCartItems(); // Fetch updated cart items after deletion
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };

  return (
    <div style={{ padding: "16px" }}>
      <h2>Your Cart</h2>
      <Row gutter={[16, 16]}>
        {cartItems.map((item) => (
          <Col key={item.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              cover={
                <img alt={item.product.title} src={item.product.imageUrl} />
              }
              actions={[
                <Button
                  type="danger"
                  onClick={() => handleDeleteCartItem(item.id)}
                >
                  Remove
                </Button>,
              ]}
            >
              <Card.Meta
                title={item.product.title}
                description={`Price: ${item.product.price}`}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Cart;
