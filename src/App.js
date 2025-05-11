import React, { useEffect, useState } from "react";
import "./styles.css";
import ProductCard from "./components/ProductCard";

export default function App() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [totalProdInPage, setTotalProdInPage] = useState(10);

  const totalPages = Math.ceil(products.length / totalProdInPage);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const startIndex = (currentPage - 1) * totalProdInPage;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const fetchedProducts = await fetch(
        "https://dummyjson.com/products?limit=100"
      );

      if (!fetchedProducts.ok) {
        throw new Error(`HTTP error! status: ${fetchedProducts.status}`);
      }

      const data = await fetchedProducts.json();
      setProducts(data.products);
    } catch (error) {
      console.error("Failed to fetch products:", error.message);
    }
  };

  console.log(products);

  if (!products.length) return <div>No Products found!!</div>;

  return (
    <div className="App">
      <div className="header">
        <h1>Pagination</h1>
      </div>
      <div className="product-list">
        {products
          .slice(startIndex, startIndex + totalProdInPage)
          .map((prod, index) => (
            <ProductCard key={index} img={prod.thumbnail} title={prod.title} />
          ))}
      </div>
      <div className="pagination">
        <button
          key="prev"
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="prev"
          disabled={currentPage === 1}
        >
          prev
        </button>
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className={currentPage === number ? "active" : ""}
          >
            {number}
          </button>
        ))}
        <button
          key="next"
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="next"
          disabled={currentPage === totalPages}
        >
          next
        </button>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="itemsPerPage">Items per page: </label>
          <select
            id="itemsPerPage"
            value={totalProdInPage}
            onChange={(e) => {
              setTotalProdInPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </select>
        </div>
      </div>
    </div>
  );
}
