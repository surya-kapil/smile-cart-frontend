import { useEffect, useState } from "react";

import productsApi from "apis/products";
import { Spinner, Typography } from "neetoui";
import { append } from "ramda";

import Carousel from "./Carousel";

const Product = () => {
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  // function waitNSec() {
  //   return new Promise(resolve => {
  //     setTimeout(resolve, 5000);
  //   });
  // }

  async function fetchProduct() {
    try {
      // await waitNSec();
      const response = await productsApi.show();
      setProduct(response);
      console.log(response);
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchProduct();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const { name, description, mrp, offerPrice, imageUrls, imageUrl } = product;
  const discountPrice = mrp - offerPrice;
  const discountPercentage = ((discountPrice / mrp) * 100).toFixed(1);

  return (
    <div className="px-6 pb-6">
      <div>
        <Typography className="py-2 text-4xl font-semibold" style="h1">
          {name}
        </Typography>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
