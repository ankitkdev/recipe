import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [recipe, setRecipe] = useState([]);
  const [selectedRecipe, setselectedRecipe] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const searchByRecipe = () => {
    // setIsLoading(true);
    fetch(`https://api.edamam.com/search?q=${selectedRecipe}&app_id=9d9f83bb&app_key=17a78a54e97b90185450c4789266bb72`)
      .then((response) => {
        if (response.status === 200 || response.ok) {
          return response.json();
        } else {
          setIsLoading(false);
          throw new Error(`HTTP error status: ${response.status}`);
        }
      })
      .then((json) => {
        setIsLoading(false);
        console.log(json.hits)
        setRecipe(json.hits);
      });
  };

  return (
    <>
      <div className="container mx-auto mt-2">
        <h1 class="text-lg text-white text-center font-semibold text-slate-900">
          Recipe Recommender
        </h1>
        <div className="row flex mt-5 justify-center">
          <label for="search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <input type="search" id="search" onChange={(event) => setselectedRecipe(event.target.value)} value={selectedRecipe} class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
            <button type="button" onClick={searchByRecipe} class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
          </div>
        </div>
        {recipe.map((recipe) => {
          return (
            <div className="row flex mt-5 justify-center">
              <div class="bg-white image-width border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                  <img class="rounded-t-lg" src={recipe.recipe.image} alt="" />
                </a>
                <div class="p-5">
                  <a href="#">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{recipe.recipe.calories}</h5>
                  </a>
                  <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  );
}

export default App;
