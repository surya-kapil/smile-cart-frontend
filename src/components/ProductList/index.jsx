import { useEffect, useState } from "react";

import productsApi from "apis/products";
import { Header, PageLoader } from "components/Commons/index";
import useDebouncer from "hooks/useDebounce";
import { Search } from "neetoicons";
import { Input, NoData } from "neetoui";
import { isEmpty, without } from "ramda";

import ProductListItem from "./ProductListItem";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchKey, setSearchKey] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const debouncedValue = useDebouncer(searchKey);
  async function fetchProducts() {
    try {
      const response = await productsApi.fetch({ searchTerm: debouncedValue });
      console.log(response);
      setProducts(response.products);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  const toggleIsInCart = slug =>
    setCartItems(prevCartItems =>
      prevCartItems.includes(slug)
        ? without([slug], cartItems)
        : [slug, ...cartItems]
    );

  useEffect(() => {
    console.log(debouncedValue);
    fetchProducts();
  }, [debouncedValue]);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="flex flex-col">
      <div className="m-2">
        <Header
          cartItemsCount={cartItems.length}
          shouldShowBackButton={false}
          title="Smile Cart"
          actionBlock={
            <Input
              placeholder="Search products"
              prefix={<Search />}
              type="search"
              onChange={event => setSearchKey(event.target.value)}
            />
          }
        />
      </div>
      {isEmpty(products) ? (
        <NoData className="h-full w-full" title="No products to show" />
      ) : (
        <div className="grid grid-cols-2 justify-items-center gap-y-8 p-4 md:grid-cols-3 lg:grid-cols-4">
          {products.map(product => (
            <ProductListItem
              key={product.slug}
              {...product}
              isInCart={cartItems.includes(product.slug)}
              toggleIsInCart={() => toggleIsInCart(product.slug)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
