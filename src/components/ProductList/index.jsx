import { useEffect, useState } from "react";

import productsApi from "apis/products";
import { Header, PageLoader } from "components/Commons/index";

import ProductListItem from "./ProductListItem";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  async function fetchProducts() {
    try {
      const response = await productsApi.fetch();
      console.log(response);
      setProducts(response.products);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="flex flex-col">
      <div className="m-2">
        <Header shouldShowBackButton={false} title="Smile Cart" />
      </div>
      <div className="grid grid-cols-2 justify-items-center gap-y-8 p-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map(product => (
          <ProductListItem key={product.slug} {...product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
