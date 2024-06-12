import React from "react";

function reviewDetails({
  params,
}: {
  params: {
    productId: string;
    reviewId: string;
  };
}) {
  return (
    <div>
      review Details of {params.reviewId} for product number {params.productId}
    </div>
  );
}

export default reviewDetails;
