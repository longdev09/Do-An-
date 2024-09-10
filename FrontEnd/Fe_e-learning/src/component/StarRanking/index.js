import React from "react";
import { FaStar } from "react-icons/fa";

export default function StarRanking({ rating }) {
  const maxRating = 5;
  const starColor = "#ffd700"; // Màu sắc cho sao được chọn

  const stars = Array.from({ length: maxRating }, (_, index) => (
    <FaStar style={{ color: index < rating ? starColor : "gray" }} />
  ));

  return <div>{stars}</div>;
}
