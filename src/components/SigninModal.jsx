import React, { useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import { authentication, signup } from "../services/auth_service";

const SignInModal = ({ signinModalOpend, onClose }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isSignin, setIsSignIn] = useState(false);
  const handleSignIn = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      if (isSignin) {
        await authentication(values.email, values.password);
      } else {
        await signup(values.email, values.password);
      }
      message.success("Sign-in successful!");
      onClose();
    } catch (error) {
      console.error("Sign-in error:", error);
      message.error("Authentication failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Sign In/ Register"
      open={signinModalOpend}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={handleSignIn}
        >
          Continue
        </Button>,
      ]}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Form form={form}>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter your email address" },
              { type: "email", message: "Please enter a valid email address" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
        {isSignin && (
          <div
            style={{
              display: "flex",
              gap: 4,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <p>Already have an account ? </p>

            <p
              onClick={() => {
                setIsSignIn(false);
              }}
              style={{ color: "blue" }}
            >
              Signup Now
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default SignInModal;
