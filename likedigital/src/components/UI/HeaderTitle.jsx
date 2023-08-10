import React, { useState } from "react";
import { BiBell, BiSearch } from "react-icons/bi";
import "../../App.css";
function HeaderTitle() {
  const [active, setActive] = useState(false);
  return (
    <section className="flex px-[20px] py-2 border-b-2 border-textGray">
      <div className="logo_title text-primary flex-[0.8] tracking-wider text-[20px]">
        MOAMOA
      </div>
      <div className="flex justify-around items-center text-2xl flex-[0.2]">
        <BiBell className={`${active ? "text-primary" : null}`} />
        <BiSearch />
      </div>
    </section>
  );
}

export default HeaderTitle;
