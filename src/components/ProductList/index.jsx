import { useState } from "react";

import { Header, PageLoader } from "components/Commons/index";
import { useFetchProducts } from "hooks/reactQuery/useProductsApi";
import useDebouncer from "hooks/useDebounce";
import { Search } from "neetoicons";
import { Input, NoData } from "neetoui";
import { isEmpty } from "ramda";

import ProductListItem from "./ProductListItem";

const ProductList = () => {
  const [searchKey, setSearchKey] = useState(null);
  const debouncedSearchKey = useDebouncer(searchKey);
  const {
    data: { products = [] } = {},
    isLoading,
    isError,
  } = useFetchProducts({
    searchKey: debouncedSearchKey,
  });
  if (isLoading || isError) {
    return <PageLoader />;
  }

  return (
    <div className="flex flex-col">
      <div className="m-2">
        <Header
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
            <ProductListItem key={product.slug} {...product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
