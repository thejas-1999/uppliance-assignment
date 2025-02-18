import React, { useState, useEffect } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";

const UserForm = () => {
  const savedData = JSON.parse(localStorage.getItem("userData")) || {
    userId: "",
    name: "",
    address: "",
    email: "",
    phone: "",
  };

  const generateUserId = () => `USER-${Math.floor(Math.random() * 10000)}`;

  const [formData, setFormData] = useState(
    savedData.userId ? savedData : { ...savedData, userId: generateUserId() }
  );
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (isDirty) {
        event.preventDefault();
        event.returnValue = "You have unsaved changes!";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setIsDirty(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userData", JSON.stringify(formData));
    setIsDirty(false);
    alert("User data saved successfully!");
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        User Data Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="User ID"
          value={formData.userId}
          disabled
        />
        <TextField
          fullWidth
          margin="normal"
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Save
        </Button>
      </form>
    </Container>
  );
};

export default UserForm;
