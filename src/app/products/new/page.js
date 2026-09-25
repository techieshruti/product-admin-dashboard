"use client";

import { useState } from "react";
import { addProduct } from "@/services/productApi";
import useAuth from "@/hooks/useAuth";
import ProductForm from "@/components/products/ProductForm";

const NewProductPage = () => {
  const { isAuthenticated, checkingAuth } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    category: "",
  });
  const [errors, setErrors] = useState({});
const [isSubmitting, setIsSubmitting] = useState(false);
const [successMessage, setSuccessMessage] = useState("");

const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData((current) => ({
    ...current,
    [name]: value,
  }));
};

  const handleSubmit = async (e) => {
  e.preventDefault();
setSuccessMessage("");
  if (isSubmitting) {
  return;
}

setIsSubmitting(true);

  const newErrors = {};

  if (!formData.title.trim()) {
    newErrors.title = "Title is required";
  }

  if (!formData.description.trim()) {
    newErrors.description = "Description is required";
  }

  if (!formData.price || Number(formData.price) <= 0) {
    newErrors.price = "Price must be greater than 0";
  }

  if (
    formData.stock === "" ||
    Number(formData.stock) < 0
  ) {
    newErrors.stock = "Stock cannot be negative";
  }

  if (!formData.category.trim()) {
    newErrors.category = "Category is required";
  }

  setErrors(newErrors);

  if (Object.keys(newErrors).length > 0) {
    setIsSubmitting(false);
    return;
  }

try {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const response = await addProduct({
    title: formData.title,
    description: formData.description,
    price: Number(formData.price),
    stock: Number(formData.stock),
    category: formData.category,
  });

   console.log("Product added:", response.data);

const existingProducts = JSON.parse(
  localStorage.getItem("createdProducts") || "[]"
);

localStorage.setItem(
  "createdProducts",
  JSON.stringify([response.data, ...existingProducts])
);

  setSuccessMessage("Product added successfully!");

} catch (error) {
  console.error("Failed to add product:", error);
}
finally {
  setIsSubmitting(false);
}
};

if (checkingAuth) {
  return <p>Checking authentication...</p>;
}

if (!isAuthenticated) {
  return null;
}

  return (
    <main className="min-h-screen bg-gray-100 p-6">
     <h1 className="mb-6 text-2xl font-bold text-gray-950">
  Add New Product
</h1>
<ProductForm
  formData={formData}
  errors={errors}
  isSubmitting={isSubmitting}
  successMessage={successMessage}
  onChange={handleChange}
  onSubmit={handleSubmit}
  buttonText="Save Product"
/>
    </main>
  );
};

export default NewProductPage;