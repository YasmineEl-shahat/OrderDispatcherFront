import { toggleElement } from "../functions/toggleElement";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import AuthContext from "../context/AuthContext";
import Link from "next/link";
import { channel } from "../pages/api/pusher";
import { assignOrder, saveOrder } from "../pages/api/orders";

const Navbar = ({ locale, translate, navTitle }) => {
  const { logoutUser, name, image } = useContext(AuthContext);
  const ISSERVER = typeof window === "undefined";
  const router = useRouter();

  const [newOrders, setNewOrders] = useState([]);

  const toggleSideBar = () => {
    let margin = 0;

    let navbar = document.querySelector(".navbar");
    let main = document.querySelector(".mainContainer");

    // change nav and main margin according to sidebar prev status
    if (document.getElementsByClassName("sideBar invisible")[0])
      margin = "25.1";
    else margin = "0";

    if (locale == "ar") {
      navbar.style.marginRight = margin + "rem";
      main.style.marginRight = margin + "rem";
    } else {
      navbar.style.marginLeft = margin + "rem";
      main.style.marginLeft = margin + "rem";
    }

    toggleElement("sideBar");
  };

  useEffect(() => {
    const menu = document.querySelector(".menu");
    const photo = document.querySelector(".photo");
    document.addEventListener("click", function (event) {
      if (!event.target.classList.contains("photo")) {
        menu.classList.remove("active");
        photo.classList.remove("active");
      }
    });
  }, []);

  const isEquivalent = (a, b) => {
    // Check if both objects have the same keys
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    if (aKeys.length !== bKeys.length) {
      return false;
    }
    // Check if the values of each key are equal
    for (const key of aKeys) {
      if (a[key] !== b[key]) {
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    channel.bind("newOrder", function (orderData) {
      try {
        saveOrder(orderData);
        assignOrder(orderData._id);
        // if (!newOrders.some((order) => isEquivalent(order, orderData)))
        setNewOrders((prevOrders) => [...prevOrders, orderData]);
      } catch (error) {
        console.error("Error:", error);
      }
    });
    // eslint-disable-next-line
  }, []);

  const changeLocale = (locale) => {
    localStorage.setItem("selectedLocale", locale);
    router
      .push(
        {
          route: router.pathname,
          query: router.query,
        },
        router.asPath,
        { locale }
      )
      .then(() => {
        router.reload();
      });
  };

  return (
    !ISSERVER && (
      <nav className="navbar navbar-expand-lg sticky-top d-flex align-items-center justify-content-between">
        <article className="title">
          {navTitle
            ? translate(navTitle)
            : translate(router.asPath.substring(1))}
        </article>
        <article className="d-flex align-items-center flex-row-reverse">
          <div className="main d-flex align-items-center flex-row gap-3">
            <div className="dropdown">
              <div data-bs-toggle="dropdown" className="dropLang ">
                <span className="d-flex justify-content-between align-items-center">
                  <h6 className="word">
                    {locale === "en"
                      ? translate("english")
                      : translate("arabic")}
                  </h6>
                  <i className="fa-solid fa-angle-down"></i>
                </span>
              </div>
              <div className="dropdown-menu collapse">
                <ul>
                  {locale === "en" ? (
                    <li onClick={() => changeLocale("ar")}>
                      <h6 className="word">{translate("arabic")}</h6>
                    </li>
                  ) : (
                    <li onClick={() => changeLocale("en")}>
                      <h6 className="word">{translate("english")}</h6>
                    </li>
                  )}
                </ul>
              </div>
            </div>
            <section className="dropdown">
              <div className="notifications" data-bs-toggle="dropdown">
                <i className="fa-solid fa-bell"></i>
                {newOrders.length > 0 && (
                  <span className="badge bg-danger notificationDot">
                    {newOrders.length}
                  </span>
                )}
              </div>
              <ul
                className="dropdown-menu dropdown-menu-end notificationDropdown "
                aria-labelledby="dropdownMenuButton1"
              >
                <li className="notificationHeader">
                  {translate("notifications")}
                </li>
                <div>
                  {newOrders.map((order) => (
                    <li
                      onClick={() => {
                        setNewOrders([]);
                        router.push("/orders");
                      }}
                      className="align-items-start d-flex"
                      key={order._id}
                    >
                      <span className="dropdownItem d-flex justify-content-between pe-2">
                        <span className="icon marginEnd"></span>
                      </span>
                      <span className="dropdownItem w-100">
                        <div className="d-flex flex-column">
                          <span className="issue">{`New order: from ${order.CustomerName}`}</span>
                        </div>
                      </span>
                    </li>
                  ))}
                </div>
              </ul>
            </section>
            <section>
              {/* eslint-disable */}
              <img
                src={image ? image : `/assets/avatar.png`}
                className="photo"
                alt="profile img"
                width={30}
                height={30}
                onClick={() => {
                  const menu = document.querySelector(".menu");
                  const photo = document.querySelector(".photo");
                  menu.classList.toggle("active");
                  photo.classList.toggle("active");
                }}
              />
              <div className="menu">
                <ul>
                  <Link href="/update-profile" passHref>
                    <div>
                      <img
                        src={image ? image : `/assets/avatar.png`}
                        alt="profile img"
                        width={30}
                        height={30}
                      />
                      <h5>{name ? name : "Name"}</h5>
                    </div>
                  </Link>

                  <li onClick={() => logoutUser()}>
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                    Log Out
                  </li>
                </ul>
              </div>
            </section>
            <div onClick={toggleSideBar} className="displayIcon">
              <i className="fa fa-bars" aria-hidden="true"></i>
            </div>
          </div>
        </article>
      </nav>
    )
  );
};

export default Navbar;
