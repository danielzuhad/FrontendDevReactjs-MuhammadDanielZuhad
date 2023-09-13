import React from "react";

interface RatingCardProps {
  review?: string;
}

export default function RatingCard({ review }: RatingCardProps) {
  const formattedReview = review ? { __html: review } : undefined;

  return (
    <div className="min-w-[20vw] border-2 border-gray-500 rounded-sm p-2 max-h-[12vh]">
      <h2 dangerouslySetInnerHTML={formattedReview}></h2>
    </div>
  );
}
