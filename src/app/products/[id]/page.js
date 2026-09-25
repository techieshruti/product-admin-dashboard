import { notFound } from "next/navigation";
import { getProductById } from "@/services/productApi";

const ProductDetailsPage = async ({ params }) => {
  const { id } = await params;

  let product;

  try {
    const response = await getProductById(id);

    product = response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      notFound();
    }

    throw error;
  }

  const handleDeleteClick = (product) => {
  console.log("Delete clicked:", product);
};

  return (
    <main>
      <h1>{product.title}</h1>

      <div>
        {product.images.map((image) => (
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

      {product.reviews.length === 0 ? (
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