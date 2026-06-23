import { useState } from "react";

import Checkout from "components/Checkout";
import { NavLink, Route, Switch, Redirect } from "react-router-dom";
import routes from "routes";

import Cart from "./components/Cart";
import PageNotFound from "./components/Commons/PageNotFound";
import Product from "./components/Product";
import ProductList from "./components/ProductList";
import CartItemsContext from "./contexts/CartItemsContext";

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  console.log(Checkout);

  return (
    <>
      <div className="flex space-x-2">
        <NavLink exact activeClassName="underline font-bold" to="/products">
          Products
        </NavLink>
        <NavLink exact activeClassName="underline font-bold" to="/product">
          Product
        </NavLink>
      </div>
      <CartItemsContext.Provider value={[cartItems, setCartItems]}>
        <Switch>
          <Route exact component={ProductList} path={routes.products.index} />
          <Route exact component={Product} path={routes.products.show} />
          <Redirect exact from={routes.root} to={routes.products.index} />
          <Route exact component={Cart} path={routes.cart} />
          <Route exact component={Checkout} path={routes.checkout} />
          <Route component={PageNotFound} path="*" />
        </Switch>
      </CartItemsContext.Provider>
    </>
  );
};

export default App;
