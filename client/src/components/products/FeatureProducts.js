import React, { useState, useEffect, memo } from "react";
import { ProductCard } from "components";
import { apiGetProducts } from "apis";

const FeatureProducts = () => {
  const [products, setProducts] = useState(null);

  const fetchProducts = async () => {
    const response = await apiGetProducts({ limit: 9, sort: "-totalRatings" });
    if (response.success) setProducts(response.products);
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="w-full">
      <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">
        FEATURED PRODUCTS
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
        {products?.map((el) => (
          <ProductCard key={el._id} pid={el._id} image={el.thumb} {...el} />
        ))}
      </div>
      <div className="grid-cols-4 hidden lg:grid grid-rows-2 gap-4">
        <img
          src="https://www.dutchlady.com.vn/sites/default/files/2022-05/mb_banner_Homepage01072020%20%281%29_0.jpg"
          alt=""
          className="w-full h-full object-cover col-span-2 row-span-2"
        />
        <img
          src="https://seotrends.com.vn/wp-content/uploads/2023/06/banner-sale-3d.jpg"
          alt=""
          className="w-full h-full object-cover col-span-1 row-span-1"
        />
        <img
          src="https://www.vinamilk.com.vn/sua-tuoi-vinamilk/wp-content/themes/suanuoc/tpl/fm100-revamp/images/intro/bg-mo.jpg"
          alt=""
          className="w-full h-full object-cover col-span-1 row-span-2"
        />

        <img
          src="https://batos.vn/images/upload/images/a84324172caa98035b6e117a55ce8a0d.jpg"
          alt=""
          className="w-full h-full object-cover col-span-1 row-span-1"
        />
      </div>
    </div>
  );
};

export default memo(FeatureProducts);
