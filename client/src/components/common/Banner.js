import React, { memo } from "react";

const Banner = () => {
  return (
    <div className="w-full">
      <img
        src="https://salt.tikicdn.com/ts/tmp/8c/3e/ce/5f293cd404c7d64a7385fd99cbadec35.jpg"
        alt="banner"
        className="md:h-[400px] w-full md:object-cover object-contain"
      />
    </div>
  );
};

export default memo(Banner);
