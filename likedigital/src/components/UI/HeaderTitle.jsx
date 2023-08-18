import { useState } from "react";
import { BiBell, BiSearch } from "react-icons/bi";
import "../../App.css";
import { Link } from "react-router-dom";
function HeaderTitle() {
  const [active, setActive] = useState(false);
  return (
    <section className="flex px-6 py-4 border-b-2 shadow-sm border-emerald-300 shadow-primary rounded-b-2xl">
      <Link
        to={"/home"}
        className="logo_title text-primary flex-[0.8] tracking-wider text-xl"
      >
        MOAMOA
      </Link>
      <div className="flex justify-around items-center gap-4 text-2xl flex-[0.2]">
        <BiBell className={`${active ? "text-primary" : null}`} />
        <BiSearch />
      </div>
    </section>
  );
}

export default HeaderTitle;
