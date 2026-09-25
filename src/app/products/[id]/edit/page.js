"use client";

import { useEffect, useState } from "react";
import { getProductById, updateProduct, } from "@/services/productApi";
import ProductForm from "@/components/products/ProductForm";

const EditProductPage = ({ params }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    category: "",
  });

  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

useEffect(() => {
  const fetchProduct = async () => {
    try {
      const { id } = await params;

      const savedProducts = JSON.parse(
        localStorage.getItem("createdProducts") || "[]"
      );

      const localProduct = savedProducts.find(
        (product) => String(product.id) === String(id)
      );

      if (localProduct) {
        setFormData({
          title: localProduct.title,
          description: localProduct.description,
          price: localProduct.price,
          stock: localProduct.stock,
          category: localProduct.category,
        });

        return;
      }

      const response = await getProductById(id);

      const product = response.data;

      setFormData({
        title: product.title,
        description: product.description,
        price: product.price,
        stock: product.stock,
        category: product.category,
      });
    } catch (error) {
      console.error("Failed to fetch product:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchProduct();
}, [params]);

const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData((current) => ({
    ...current,
    [name]: value,
  }));
};

const handleSubmit = async (e) => {
  e.preventDefault();

if (isSubmitting) {
    return;
  }

  setIsSubmitting(true);

setSuccessMessage("");
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
  const { id } = await params;

  const existingProducts = JSON.parse(
    localStorage.getItem("createdProducts") || "[]"
  );

  const localProduct = existingProducts.find(
    (product) => String(product.id) === String(id)
  );

  const productData = {
    title: formData.title,
    description: formData.description,
    price: Number(formData.price),
    stock: Number(formData.stock),
    category: formData.category,
  };

  let updatedProduct;

  if (localProduct) {
      await new Promise((resolve) => setTimeout(resolve, 500));

    // Product was created by our app, so update it locally
    updatedProduct = {
      ...localProduct,
      ...productData,
    };
  } else {
    // Product came from DummyJSON, so call the update API
    const response = await updateProduct(id, productData);

    updatedProduct = response.data;
  }

  const updatedProducts = existingProducts.filter(
    (product) => String(product.id) !== String(id)
  );

  updatedProducts.unshift(updatedProduct);

  localStorage.setItem(
    "createdProducts",
    JSON.stringify(updatedProducts)
  );

  console.log("Product updated:", updatedProduct);
  setSuccessMessage("Product updated successfully!");
} catch (error) {
  console.error("Failed to update product:", error);
}
finally {
  setIsSubmitting(false);
}
};

  if (loading) {
    return <p>Loading product...</p>;
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">
       <h1 className="mb-6 text-2xl font-bold text-gray-950">
  Edit Product
</h1>
{successMessage && <p>{successMessage}</p>}
      <ProductForm
  formData={formData}
  errors={errors}
  isSubmitting={isSubmitting}
  successMessage={successMessage}
  onChange={handleChange}
  onSubmit={handleSubmit}
  buttonText="Update Product"
  loadingText="Updating..."
/>
    </main>
  );
};

export default EditProductPage;