import { Button } from "neetoui";

const AddToCart = ({ isInCart, toggleIsInCart }) => {
  function handleClick(event) {
    event.stopPropagation();
    event.preventDefault();
    toggleIsInCart();
  }

  return (
    <Button
      label={isInCart ? "Remove from cart" : "Add to cart"}
      size="large"
      onClick={handleClick}
    />
  );
};

export default AddToCart;
