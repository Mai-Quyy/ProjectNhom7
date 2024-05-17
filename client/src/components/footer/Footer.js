import React, { memo } from "react";
import icons from "ultils/icons";

const { MdEmail } = icons;
const Footer = () => {
  return (
    <div className="w-full">
      <div className="h-[103px] w-full bg-main flex items-center justify-center">
        <div className="w-main flex items-center justify-between">
          <div className="flex flex-col flex-1">
            <span className="text-[20px] text-gray-100">
              SIGN UP TO NEWSLETTER
            </span>
            <small className="text-[13px] text-gray-300">
              Subcribe now and receive weekly newsletter
            </small>
          </div>
          <div className="flex-1 flex items-center">
            <input
              className="p-4 rounded-l-full  w-full bg-[#C1CDC1] outline-none text-black-100 placeholder:text-sm
               placeholder:text-gray-900 placeholder:italic placeholder:opacity-50"
              type="text"
              name=""
              id=""
              placeholder="Email Adress"
            />
            <div className="h-[56px] w-[56px] bg-[#C1CDC1] rounded-r-full flex items-center justify-center text-black text-[13px]">
              <MdEmail size={18} />
            </div>
          </div>
        </div>
      </div>
      <div className="h-[406px] w-full bg-gray-900 flex items-center justify-center text-white text-[13px]">
        <div className="w-main flex ">
          <div className="flex-2 flex flex-col gap-2">
            {" "}
            <h3 className="mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]">
              ABOUT US
            </h3>
            <span>
              <span>Address:</span>
              <span className="opacity-70">Ton Duc Thang, Da Nang</span>
            </span>
            <span>
              <span>Phone: </span>
              <span className="opacity-70">(+1234)56789xxx</span>
            </span>
            <span>
              <span>Mail: </span>
              <span className="opacity-70">abcxyz@gmail.com</span>
            </span>
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <h3 className="mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]">
              INFOMATION
            </h3>
            <span>Tyography</span>
            <span>Store location</span>
            <span>Today's Deal</span>
            <span>Contacts</span>
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <h3 className="mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]">
              WHO WE ARE
            </h3>
            <span>Help</span>
            <span>Free Shipping</span>
            <span>Return & Exchange</span>
            <span>Testtimonials</span>
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <h3 className="mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]">
              #MILKSTORE
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Footer);
