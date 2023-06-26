import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";

import AuthContext from "../context/AuthContext";

const SideBar = ({ translate }) => {
  const { permissions } = useContext(AuthContext);
  const router = useRouter();
  const [activeLink, setActiveLink] = useState(router.pathname);

  const hideSideBar = () => {
    let navbar = document.querySelector(".navbar");
    let main = document.querySelector(".mainContainer");
    document.getElementById("sideBar").classList.add("invisible");
    navbar.style.marginRight = "0rem";
    main.style.marginRight = "0rem";
    navbar.style.marginLeft = "0rem";
    main.style.marginLeft = "0rem";
  };
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    if (mediaQuery.matches) hideSideBar();
  }, []);

  return (
    <aside className="sideBar" id="sideBar">
      <div className="sideBar-title">
        <Image src={"/assets/logo.png"} width={48} height={45} alt="logo" />
        <h1>{translate("order-dispatcher")}</h1>
        <i onClick={hideSideBar} className="fa-solid fa-xmark"></i>
      </div>

      <div className="sideBar-menu">
        {permissions?.statistics?.viewAll && (
          <Link href="/" passHref>
            <div
              className={`sideItem  ${activeLink === "/" ? "selected" : ""}`}
              onClick={() => setActiveLink("/")}
            >
              <i className="fa-solid fa-house "></i>
              {translate("dashboard")}
            </div>
          </Link>
        )}
        {permissions?.users?.viewAll && (
          <Link href="/users" passHref>
            <div
              className={`sideItem  ${
                activeLink.includes("/users") ? "selected" : ""
              }`}
              onClick={() => setActiveLink("/users")}
            >
              <i className="fa-solid fa-user-group"></i>
              {translate("users")}
            </div>
          </Link>
        )}

        {permissions?.roles?.viewAll && (
          <Link href="/roles" passHref>
            <div
              className={`sideItem  ${
                activeLink.includes("/roles") ? "selected" : ""
              }`}
              onClick={() => setActiveLink("/roles")}
            >
              <i className="fa-solid fa-lock"></i> {translate("roles")}
            </div>
          </Link>
        )}

        {permissions?.orders?.viewAll && (
          <Link href="/orders" passHref>
            <div
              className={`sideItem  ${
                activeLink.includes("/orders") ? "selected" : ""
              }`}
              onClick={() => setActiveLink("/orders")}
            >
              <i className="fa-solid fa-box"></i>
              {translate("orders")}
            </div>
          </Link>
        )}

        {permissions?.drivers?.viewAll && (
          <Link href="/drivers" passHref>
            <div
              className={`sideItem  ${
                activeLink.includes("/drivers") ? "selected" : ""
              }`}
              onClick={() => setActiveLink("/drivers")}
            >
              <i className="fa-solid fa-car"></i>
              {translate("drivers")}
            </div>
          </Link>
        )}

        {permissions?.customers?.viewAll && (
          <Link href="/customers" passHref>
            <div
              className={`sideItem  ${
                activeLink.includes("/customers") ? "selected" : ""
              }`}
              onClick={() => setActiveLink("/customers")}
            >
              <i className="fa-solid fa-users"></i>
              {translate("customers")}
            </div>
          </Link>
        )}

        {permissions?.locations?.view && (
          <Link href="/locations" passHref>
            <div
              className={`sideItem  ${
                activeLink.includes("/locations") ? "selected" : ""
              }`}
              onClick={() => setActiveLink("/locations")}
            >
              <i className="fa-solid fa-map-location"></i>
              {translate("locations")}
            </div>
          </Link>
        )}

        <Link href="/reports" passHref>
          <div
            className={`sideItem  ${
              activeLink.includes("/reports") ? "selected" : ""
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
