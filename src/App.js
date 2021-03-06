import "./App.css";
import Category from "./Pages/Category/Category";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS_QUERY, GET_CURRENCIES } from "./graphql/Queries";
import Header from "./Components/Header/Header";
import Cart from "./Pages/CartPage/Cart";
import ProductDescription from "./Pages/PDP/ProductDescription";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./Pages/HomePage/Home";
import Footer from "./Components/Footer/Footer";
import Checkout from "./Pages/Checkout/Checkout";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [categoriesIndex, setCategoriesIndex] = useState("all");
  const { loading: categoriesLoading, error: categoriesError, data : categories } = useQuery(GET_PRODUCTS_QUERY);
  const { loading: currenciesLoading, error: currenciesError, data:currencies } = useQuery(GET_CURRENCIES);
  const filterCategory = (catName) => {
    // console.log(catName);
    setCategoriesIndex(catName);
  };
  useEffect(() => {
    filterCategory(categoriesIndex);
  }, [categoriesIndex]);

  if (categoriesLoading || currenciesLoading) return <div className="loader"></div>;
  else if (categoriesError) console.log(categoriesError.message);
  else if (currenciesError) console.log(currenciesError.message);
  // const  categories = data;
  // console.log(currencies);

  // console.log(categories.categories);
  return (
    <div className="App">
      <Router>
        <Header
          categories={categories.categories}
          currencies = {currencies.currencies}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          filterCategory={filterCategory}
        />
        <Routes>
          <Route exact path="/" element={<Home home={categories.categories[0]} />} />
          <Route
            exact
            path="/category/:cat_name"
            element={<Category categories={categories.categories} />}
          />
          <Route
            path="/cart"
            element={<Cart categories={categories[categoriesIndex]} />}
          />
          <Route path="/product/:name" element={<ProductDescription />} />
          <Route path="/checkout" element={<Checkout />} />
          
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
