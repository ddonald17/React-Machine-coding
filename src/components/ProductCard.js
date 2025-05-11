import React from "react";

const ProductCard = ({ title, img }) => {
  return (
    <div>
      <img src={img} alt={title} />
      <div className="img-title">{title}</div>
    </div>
  );
};

export default ProductCard;
