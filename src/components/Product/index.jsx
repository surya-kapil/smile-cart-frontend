import AddToCart from "components/Commons/AddToCart";
import { Header, PageLoader, PageNotFound } from "components/Commons/index";
import { useShowProduct } from "hooks/reactQuery/useProductsApi";
import useSelectedQuantity from "hooks/useSelectedQuantity";
import { Button, Typography } from "neetoui";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import routes from "routes";

import Carousel from "./Carousel";

const Product = () => {
  const { slug } = useParams();
  const { selectedQuantity, setSelectedQuantity } = useSelectedQuantity(slug);
  // function waitNSec() {
  //   return new Promise(resolve => {
  //     setTimeout(resolve, 5000);
  //   });
  // }
  const { data: product = {}, isLoading, isError } = useShowProduct(slug);

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) return <PageNotFound />;

  const { name, description, mrp, offerPrice } = product;
  const discountPrice = mrp - offerPrice;
  const discountPercentage = ((discountPrice / mrp) * 100).toFixed(1);

  return (
    <div className="px-6 pb-6">
      <div>
        <Header shouldShowBackButton title={name} />
        <div className="mt-16 flex gap-4">
          <div className="w-2/5">
            <div className="flex justify-center gap-16">
              <Carousel />
            </div>
          </div>
          <div className="w-3/5 space-y-4">
            <Typography>{description}</Typography>
            <Typography>MRP: {mrp}</Typography>
            <Typography className="font-semibold">
              Offer price: {offerPrice}
            </Typography>
            <Typography className="font-semibold text-green-600">
              {discountPercentage}% off
            </Typography>
            <div className="flex space-x-10">
              <AddToCart {...{ slug }} />
              <Button
                className="bg-neutral-800 hover:bg-neutral-950"
                label="Buy now"
                size="large"
                to={routes.checkout}
                onClick={() => setSelectedQuantity(selectedQuantity || 1)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
