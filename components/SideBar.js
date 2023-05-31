import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const SideBar = ({ translate }) => {
  const [activeLink, setActiveLink] = useState("/");
  return (
    <aside className="sideBar">
      <div className="sideBar-title">
        <Image src={"/assets/logo.png"} width={48} height={45} alt="logo" />
        <h1>{translate("order-dispatcher")}</h1>
      </div>

      <div className="sideBar-menu">
        <Link href="/" passHref>
          <div
            className={`sideItem  ${activeLink === "/" ? "selected" : ""}`}
            onClick={() => setActiveLink("/")}
          >
            <i className="fa-solid fa-house "></i>
            {translate("dasboard")}
          </div>
        </Link>
        <Link href="/users" passHref>
          <div
            className={`sideItem  ${activeLink === "/users" ? "selected" : ""}`}
            onClick={() => setActiveLink("/users")}
          >
            <i className="fa-solid fa-user-group"></i>
            {translate("users")}
          </div>
        </Link>
        <Link href="/roles" passHref>
          <div
            className={`sideItem  ${activeLink === "/roles" ? "selected" : ""}`}
            onClick={() => setActiveLink("/roles")}
          >
            <i className="fa-solid fa-lock"></i> {translate("roles")}
          </div>
        </Link>
        <Link href="/orders" passHref>
          <div
            className={`sideItem  ${
              activeLink === "/orders" ? "selected" : ""
            }`}
            onClick={() => setActiveLink("/orders")}
          >
            <i className="fa-solid fa-box"></i>
            {translate("orders")}
          </div>
        </Link>
        <Link href="/on-hand-stock" passHref>
          <div
            className={`sideItem  ${
              activeLink === "/on-hand-stock" ? "selected" : ""
            }`}
            onClick={() => setActiveLink("/on-hand-stock")}
          >
            <i className="fa-solid fa-truck"></i> {translate("on-hand-stock")}
          </div>
        </Link>
        <Link href="/warehouses" passHref>
          <div
            className={`sideItem  ${
              activeLink === "/warehouses" ? "selected" : ""
            }`}
            onClick={() => setActiveLink("/warehouses")}
          >
            <i className="fa-solid fa-warehouse"></i>
            {translate("warehouses")}
          </div>
        </Link>
        <Link href="/drivers" passHref>
          <div
            className={`sideItem  ${
              activeLink === "/drivers" ? "selected" : ""
            }`}
            onClick={() => setActiveLink("/drivers")}
          >
            <i className="fa-solid fa-car"></i>
            {translate("drivers")}
          </div>
        </Link>
        <Link href="/customers" passHref>
          <div
            className={`sideItem  ${
              activeLink === "/customers" ? "selected" : ""
            }`}
            onClick={() => setActiveLink("/customers")}
          >
            <i className="fa-solid fa-users"></i>
            {translate("customers")}
          </div>
        </Link>
        <Link href="/locations" passHref>
          <div
            className={`sideItem  ${
              activeLink === "/locations" ? "selected" : ""
            }`}
            onClick={() => setActiveLink("/locations")}
          >
            <i className="fa-solid fa-map-location"></i>
            {translate("locations")}
          </div>
        </Link>
        <Link href="/reports" passHref>
          <div
            className={`sideItem  ${
              activeLink === "/reports" ? "selected" : ""
            }`}
            onClick={() => setActiveLink("/reports")}
          >
            <i
              className="fa-regular fa-chart-bar"
              style={{ transform: "rotate(270deg)" }}
            ></i>
            {translate("reports")}
          </div>
        </Link>
      </div>
    </aside>
  );
};

export default SideBar;
