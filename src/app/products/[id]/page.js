"use client";

import { useEffect, useState } from "react";
import { getProductById } from "@/services/productApi";
import useAuth from "@/hooks/useAuth";

const ProductDetailsPage = ({ params }) => {
  const { isAuthenticated, checkingAuth } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
    return;
  }

    const fetchProduct = async () => {
      try {
        const { id } = await params;

        // First check products created/updated by our app
        const savedProducts = JSON.parse(
          localStorage.getItem("createdProducts") || "[]"
        );

        const localProduct = savedProducts.find(
          (item) => String(item.id) === String(id)
        );

        if (localProduct) {
          setProduct(localProduct);
          return;
        }

        // If not found locally, get it from DummyJSON
        const response = await getProductById(id);

        setProduct(response.data);
      } catch (error) {
        if (error.response?.status === 404) {
          setNotFound(true);
        } else {
          console.error("Failed to fetch product:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params, isAuthenticated]);

if (checkingAuth) {
  return <p>Checking authentication...</p>;
}

if (!isAuthenticated) {
  return null;
}

  if (loading) {
    return <p>Loading product...</p>;
  }

  if (notFound || !product) {
    return (
      <main>
        <h1>Product Not Found</h1>
        <p>Sorry, the product you are looking for does not exist.</p>
      </main>
    );
  }

  return (
    <main>
      <h1>{product.title}</h1>

      <div>
        {product.images?.map((image) => (
          <img
            key={image}
            src={image}
            alt={product.title}
            width="150"
          />
        ))}
      </div>

      <p>Category: {product.category}</p>
      <p>Price: ${product.price}</p>
      <p>Rating: {product.rating}</p>
      <p>Stock: {product.stock}</p>

      <p>{product.description}</p>

      <h2>Reviews</h2>

      {!product.reviews || product.reviews.length === 0 ? (
        <p>No reviews available.</p>
      ) : (
        <div>
          {product.reviews.map((review, index) => (
            <div key={index}>
              <p>
                <strong>{review.reviewerName}</strong>
              </p>
              <p>Rating: {review.rating}/5</p>
              <p>{review.comment}</p>
              <p>
                Date: {new Date(review.date).toLocaleDateString()}
              </p>
              <hr />
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default ProductDetailsPage;