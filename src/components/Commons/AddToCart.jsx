import { useContext } from "react";

import { Button } from "neetoui";
import { without } from "ramda";
import CartItemsContext from "src/contexts/CartItemsContext";

const AddToCart = ({ slug }) => {
  const [cartItems, setCartItems] = useContext(CartItemsContext);
  function toggleIsInCart() {
    setCartItems(prev =>
      prev.includes(slug) ? without([slug], cartItems) : [slug, ...cartItems]
    );
  }

  function handleClick(event) {
    event.stopPropagation();
    event.preventDefault();
    toggleIsInCart();
  }

  return (
    <Button
      label={cartItems.includes(slug) ? "Remove from cart" : "Add to cart"}
      size="large"
      onClick={handleClick}
    />
  );
};

export default AddToCart;
