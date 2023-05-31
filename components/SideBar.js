import Link from "next/link";
import { useState } from "react";

const SideBar = () => {
  const [activeLink, setActiveLink] = useState("/");
  return (
    <aside className="sideBar">
      <div className="sideBar-menu">
        <Link href="/" passHref>
          <div
            className={`sideItem  ${activeLink === "/" ? "selected" : ""}`}
            onClick={() => setActiveLink("/")}
          >
            <i className="fa-solid fa-house "></i>Dasboard
          </div>
        </Link>
        <Link href="/users" passHref>
          <div
            className={`sideItem  ${activeLink === "/users" ? "selected" : ""}`}
            onClick={() => setActiveLink("/users")}
          >
            <i className="fa-solid fa-house"></i>users
          </div>
        </Link>
        <Link href="/roles" passHref>
          <div
            className={`sideItem  ${activeLink === "/roles" ? "selected" : ""}`}
            onClick={() => setActiveLink("/roles")}
          >
            <i className="fa-solid fa-lock"></i>roles & permissions
          </div>
        </Link>
        <Link href="/orders" passHref>
          <div
            className={`sideItem  ${
              activeLink === "/orders" ? "selected" : ""
            }`}
            onClick={() => setActiveLink("/orders")}
          >
            <i className="fa-solid fa-box"></i>orders
          </div>
        </Link>
        <Link href="/on-hand-stock" passHref>
          <div
            className={`sideItem  ${
              activeLink === "/on-hand-stock" ? "selected" : ""
            }`}
            onClick={() => setActiveLink("/on-hand-stock")}
          >
            <i className="fa-solid fa-box"></i>on hand stock
          </div>
        </Link>
        <Link href="/warehouses" passHref>
          <div
            className={`sideItem  ${
              activeLink === "/warehouses" ? "selected" : ""
            }`}
            onClick={() => setActiveLink("/warehouses")}
          >
            <i className="fa-solid fa-box"></i>warehouses
          </div>
        </Link>
      </div>
    </aside>
  );
};

export default SideBar;
