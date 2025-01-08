import React, { useState } from "react";
import axios from "axios";

const AddClient = () => {
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    gstNo: "", // Changed from gst-no to gstNo
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://final-proposal-order-backend.vercel.app/api/clients", customer, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        alert("Client added successfully");
        setCustomer({ name: "", email: "", phone: "", address: "", gstNo: "" }); // Reset form fields
      }
    } catch (err) {
      console.error("Error submitting form", err);
      alert("An error occurred");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="p-4 w-full max-w-md bg-gradient-to-r from-blue-100 to-blue-200 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Add Client</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Client Name</label>
            <input
              type="text"
              name="name"
              value={customer.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={customer.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700">Phone</label>
            <input
              type="tel"
              name="phone"
              value={customer.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={customer.address}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700">GST No.</label>
            <input
              type="text" 
              name="gstNo"
              value={customer.gstNo} // Updated to match state
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md"
          >
            Add Client
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddClient;
