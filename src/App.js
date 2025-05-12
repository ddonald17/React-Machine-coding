import React, { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [recipe, setRecipe] = useState([]);
  const [input, setInput] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [cache, setCache] = useState({});
 
 
  useEffect(() => {
    const timer = setTimeout(fetchRecipes, 300);

    return () => {
      clearTimeout(timer);
    }
  }, [input]);

  const fetchRecipes = async () => {
    try {
      if(cache[input]){
        console.log("FROM CACHE")
        setRecipe(cache[input]);
        return;
      }

      console.log("API CALL");
      const fetchedRecipes = await fetch(
        `https://dummyjson.com/recipes/search?q=${input}`
      );

      if (!fetchedRecipes.ok) {
        throw new Error(`HTTP error! status: ${fetchedRecipes.status}`);
      }

      const data = await fetchedRecipes.json();
      setRecipe(data?.recipes);
      setCache(prev => ({...prev, [input]: data?.recipes}));
    } catch (error) {
      console.error("Failed to fetch recipes:", error.message);
    }
  };

  console.log(input, "+++++");

  return (
    <div className="App">
      <div className="header">
        <h1>Autocomplete Search Bar</h1>
      </div>
      <div className = "search-container">
        <input
          className = "search-input"
          type = "text"
          value = {input}
          onChange = { (e) => setInput(e.target.value)}
          onFocus = {() => setShowResult(true)}
          onBlur = {() => setShowResult(false)}
        />
        {showResult && <div className = "result-container">
        {recipe.map( (r) => (<div className="results" key = {r.id}>
          {r.name}
        </div>))}
        </div>}
      </div>
    </div>
  );
}
