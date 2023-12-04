import Chart from "chart.js/auto";
import React, { useState, useEffect } from "react";
import { Card, Row, Col, Button, message, Modal } from "antd";
import { getCartItems, deleteCartItem } from "../services/add_to_cart";
import { useSnapshot } from "valtio";
import state from "../store";
import { Line } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
Chart.register(CategoryScale);

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [chartOpen, setChartOpen] = useState(false);
  const snap = useSnapshot(state);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const generateRandomValues = (price, lPrice) => {
    return Array.from(
      { length: 7 },
      () => Math.floor(Math.random() * (price - lPrice + 1)) + lPrice
    );
  };

  const [chartData, setChartData] = useState({});

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
      fetchCartItems();
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
              onClick={() => {
                setChartData({
                  labels: Array.from(
                    { length: 7 },
                    (_, index) => `Point ${index + 1}`
                  ),
                  datasets: [
                    {
                      label: "Random Values",
                      data: generateRandomValues(
                        Number(item.product.price.replace("$", "")),
                        item.lowest_price
                      ),
                      fill: false,
                      borderColor: "rgba(75,192,192,1)",
                      borderWidth: 2,
                    },
                  ],
                });
                setChartOpen(true);
                setSelectedProduct(item);
              }}
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
      <Modal
        title=""
        visible={chartOpen}
        onCancel={() => {
          setChartOpen(false);
        }}
        footer={null}
      >
        <Line
          data={chartData}
          options={{
            plugins: {
              title: {
                display: true,
                text: "Price range of last 7 times",
              },
              legend: {
                display: false,
              },
              
            },
          }}
        />
      </Modal>
    </div>
  );
};

export default Cart;
