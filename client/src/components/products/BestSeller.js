import React, { useState, useEffect, memo } from "react";
import { apiGetProducts } from "apis/product";
import { CustomSlider } from "components";
import { getNewProducts } from "store/products/asynsActions";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";

const tabs = [
  { id: 1, name: "best sellers" },
  { id: 2, name: "new arrivals" },
];

const BestSeller = () => {
  const [bestSellers, setBestSellers] = useState(null);
  const [activedTab, setActivedTab] = useState(1);
  const [products, setProducts] = useState(null);
  const dispatch = useDispatch();
  const { newProducts } = useSelector((state) => state.products);
  const { isShowModal } = useSelector((state) => state.app);

  const fetchProducts = async () => {
    const response = await apiGetProducts({ sort: "-sold" });
    if (response.success) {
      setBestSellers(response.products);
      setProducts(response.products);
    }
  };
  useEffect(() => {
    fetchProducts();
    dispatch(getNewProducts());
  }, []);
  useEffect(() => {
    if (activedTab === 1) setProducts(bestSellers);
    if (activedTab === 2) setProducts(newProducts);
  }, [activedTab]);
  return (
    <div className={clsx(isShowModal ? "hidden" : "")}>
      <div className="flex text-[20px] ml-[-32px]">
        {tabs.map((el) => (
          <span
            key={el.id}
            className={`font-semibold text-center md:text-start uppercase px-8 border-r cursor-pointer text-gray-400 ${
              activedTab === el.id ? "text-gray-900" : ""
            }`}
            onClick={() => setActivedTab(el.id)}
          >
            {el.name}
          </span>
        ))}
      </div>
      <div className="mt-4 hidden md:block mx-[-10px] border-t-2 border-main pt-4">
        <CustomSlider products={products} activedTab={activedTab} />
      </div>
      <div className="mt-4 md:hidden block mx-[-10px] border-t-2 border-main pt-4">
        <CustomSlider
          products={products}
          slidesToShow={1}
          activedTab={activedTab}
        />
      </div>
      <div className="w-full flex gap-4 mt-4">
        <img
          src="https://img.websosanh.vn/v10/users/review/images/f5hn6wdmwh2o8/1439264742-168199676155c96fe66d121.jpg?compress=85"
          alt="banner"
          className="flex-1 object-contain w-[200px]"
        />
        <img
          src="https://images.foody.vn/res/g90/892190/prof/s640x400/foody-upload-api-foody-mobile-a-200108172452.jpg"
          alt="banner"
          className="flex-1 object-contain w-[200px]"
        />
      </div>
    </div>
  );
};

export default memo(BestSeller);
