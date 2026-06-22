import { useEffect, useState } from "react";

import productsApi from "apis/products";
import AddToCart from "components/Commons/AddToCart";
import { Header, PageLoader, PageNotFound } from "components/Commons/index";
import { Typography } from "neetoui";
import { append } from "ramda";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

import Carousel from "./Carousel";

const Product = () => {
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { slug } = useParams();
  const [isError, setIsError] = useState(false);
  // function waitNSec() {
  //   return new Promise(resolve => {
  //     setTimeout(resolve, 5000);
  //   });
  // }

  async function fetchProduct() {
    try {
      // await waitNSec();
      const response = await productsApi.show(slug);
      setProduct(response);
      //console.log(response);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchProduct();
  }, []);

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) return <PageNotFound />;

  const {
    name,
    description,
    mrp,
    offerPrice,
    imageUrls,
    imageUrl,
    availableQuantity,
  } = product;
  const discountPrice = mrp - offerPrice;
  const discountPercentage = ((discountPrice / mrp) * 100).toFixed(1);

  return (
    <div className="px-6 pb-6">
      <div>
        <Header shouldShowBackButton title={name} />
        <div className="mt-16 flex gap-4">
          <div className="w-2/5">
            <div className="flex justify-center gap-16">
              <Carousel imageUrls={append(imageUrl, imageUrls)} title={name} />
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
            <AddToCart {...{ availableQuantity, slug }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
