"use client";

import { useState } from "react";
import { addProduct } from "@/services/productApi";

const NewProductPage = () => {
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

  return (
    <main>
      <h1>Add New Product</h1>
      {successMessage && <p>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
  <div>
    <label htmlFor="title">Title:</label>
    <input
      id="title"
      type="text"
      value={formData.title}
      onChange={(e) =>
        setFormData({
          ...formData,
          title: e.target.value,
        })
      }
    />
    {errors.title && <p>{errors.title}</p>}
  </div>

  <div>
    <label htmlFor="description">Description:</label>
    <textarea
      id="description"
      value={formData.description}
      onChange={(e) =>
        setFormData({
          ...formData,
          description: e.target.value,
        })
      }
    />
    {errors.description && <p>{errors.description}</p>}
  </div>

  <div>
    <label htmlFor="price">Price:</label>
    <input
      id="price"
      type="number"
      value={formData.price}
      onChange={(e) =>
        setFormData({
          ...formData,
          price: e.target.value,
        })
      }
    />
    {errors.price && <p>{errors.price}</p>}
  </div>

  <div>
    <label htmlFor="stock">Stock:</label>
    <input
      id="stock"
      type="number"
      value={formData.stock}
      onChange={(e) =>
        setFormData({
          ...formData,
          stock: e.target.value,
        })
      }
    />
    {errors.stock && <p>{errors.stock}</p>}
  </div>

  <div>
    <label htmlFor="category">Category:</label>
    <input
      id="category"
      type="text"
      value={formData.category}
      onChange={(e) =>
        setFormData({
          ...formData,
          category: e.target.value,
        })
      }
    />
    {errors.category && <p>{errors.category}</p>}
  </div>

 <button type="submit" disabled={isSubmitting}>
  {isSubmitting ? "Saving..." : "Save Product"}
</button>
</form>
    </main>
  );
};

export default NewProductPage;