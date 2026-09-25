"use client";

import { useState } from "react";
import { addProduct } from "@/services/productApi";
import useAuth from "@/hooks/useAuth";
import ProductForm from "@/components/products/ProductForm";
import Link from "next/link";

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

    if (formData.stock === "" || Number(formData.stock) < 0) {
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
        localStorage.getItem("createdProducts") || "[]",
      );

      const newProduct = {
        ...response.data,
        id: Date.now(),
      };

      localStorage.setItem(
        "createdProducts",
        JSON.stringify([newProduct, ...existingProducts]),
      );

      setSuccessMessage("Product added successfully!");
    } catch (error) {
      console.error("Failed to add product:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (checkingAuth) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="flex w-full max-w-sm flex-col items-center rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-indigo-600"></div>

          <h2 className="mt-5 text-lg font-semibold text-gray-900">
            Checking authentication
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Please wait while we verify your session.
          </p>
        </div>
      </main>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <main className="min-h-screen bg-white p-4 md:p-8">
      <div className="mx-auto max-w-4xl">
        {/* Back to Products */}
        <Link
          href="/products"
          className="mb-6 inline-flex items-center gap-2 text-sm text-black transition hover:text-violet-600"
        >
          ← Back to Products
        </Link>

        {/* Page Header */}
        <div className="mb-7">
          <h1 className="mt-1 bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
            Add New Product
          </h1>

          <p className="mt-2 text-sm text-gray-500 md:text-base">
            Create a new product and add it to your inventory.
          </p>
        </div>

        {/* Product Form */}
        <ProductForm
          formData={formData}
          errors={errors}
          isSubmitting={isSubmitting}
          successMessage={successMessage}
          onChange={handleChange}
          onSubmit={handleSubmit}
          buttonText="Save Product"
        />
      </div>
    </main>
  );
};

export default NewProductPage;
