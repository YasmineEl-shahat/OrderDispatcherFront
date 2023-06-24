import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import cookieCutter from "cookie-cutter";
import { useRouter } from "next/router";
import { userLogin } from "../pages/api/auth";
import { useTranslation } from "../util/useTranslation";
import { viewRole } from "../pages/api/roles";
import { getNavData } from "../pages/api/users";

const AuthContext = createContext();
export default AuthContext;

const baseUrl = process.env.API_URL;

export const AuthProvider = ({ children }) => {
  const router = useRouter();

  const { locale } = router;
  const { t } = useTranslation();

  //state
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});
  const [backError, setBackError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  let [auth, setAuth] = useState(() =>
    typeof window !== "undefined" && cookieCutter.get("auth")
      ? cookieCutter.get("auth")
      : null
  );
  let [user, setUser] = useState(() =>
    typeof window !== "undefined" && cookieCutter.get("auth")
      ? jwt_decode(cookieCutter.get("auth"))
      : null
  );
  const [name, setName] = useState(() =>
    typeof window !== "undefined" && localStorage.getItem("name") != "undefined"
      ? localStorage.getItem("name")
      : ""
  );
  const [image, setImage] = useState(() =>
    typeof window !== "undefined" &&
    localStorage.getItem("image") != "undefined"
      ? localStorage.getItem("image")
      : ""
  );

  const [permissions, setPermissions] = useState(() =>
    typeof window !== "undefined" &&
    localStorage.getItem("permissions") != "undefined"
      ? JSON.parse(localStorage.getItem("permissions"))
      : ""
  );

  const logoutUser = () => {
    setAuth(null);
    setUser(null);
    document.cookie = "auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    localStorage.removeItem("name");
    localStorage.removeItem("image");
    localStorage.removeItem("permissions");
    if (locale == "ar") router.replace("/ar/login");
    else router.replace("/login");
  };

  //handle Expired tokens
  const checkToken = async () => {
    let response = await fetch(baseUrl + "/validToken", {
      headers: {
        Authorization: auth,
      },
    });

    if (response.status !== 200) {
      logoutUser();
    }
  };

  useEffect(() => {
    const path = ["/login", "/forget-password", "/reset-password"];
    if (!path.includes(router.asPath) && auth) checkToken();
    else if (!path.includes(router.asPath) && router.asPath !== "/login")
      logoutUser();
    else if (path.includes(router.asPath) && auth && checkToken())
      router.replace("/");

    let hour = 3000 * 60 * 60;

    let interval = setInterval(function () {
      if (!path.includes(router.asPath) && auth) checkToken();
    }, hour);

    return () => {
      clearInterval(interval);
    };
    //eslint-disable-next-line
  }, [auth]);

  const onChangeHandler = (e) => {
    let err = { ...errors };
    let newData = { ...data };

    // setting errors
    if (e.target.value == "")
      err[e.target.name] =
        t(e.target.name) +
        " " +
        (t(e.target.name).split(" ")[0].endsWith("ة")
          ? t("female-required")
          : t("required"));
    else err[e.target.name] = "";

    // setting data
    if (e.target.name === "image") {
      const reader = new FileReader(e.target.files[0]);
      reader.addEventListener("load", () => {
        newData[e.target.name] = e.target.files[0];
        setImage(URL.createObjectURL(e.target.files[0]));
      });
      reader.readAsDataURL(e.target.files[0]);
    } else newData[e.target.name] = e.target.value;

    setBackError("");
    setErrors(err);
    setData(newData);
  };

  const validate = () => {
    if (!data["email"] || !data["password"]) {
      setBackError(t("fill-data"));
      return false;
    }

    if (errors["email"] || errors["password"]) return false;
    else return true;
  };

  //login
  const login = (e) => {
    e.preventDefault();
    if (validate()) {
      setSubmitting(true);

      userLogin(JSON.stringify(data))
        .then((res) => {
          const token = res.data.token;
          cookieCutter.set("auth", token);
          setUser(jwt_decode(token));
          setBackError("");

          viewRole(jwt_decode(token).roleId)
            .then((response) => {
              localStorage.setItem(
                "permissions",
                JSON.stringify(response.data.permissions)
              );
              setPermissions(response.data.permissions);

              getNavData(jwt_decode(token).id)
                .then((userRes) => {
                  setName(userRes.data.name);
                  localStorage.setItem("name", userRes.data.name);

                  setImage(baseUrl + "/images/" + userRes.data.image);
                  localStorage.setItem(
                    "image",
                    baseUrl + "/images/" + userRes.data.image
                  );
                  let allPermissions = response.data.permissions;
                  if (!allPermissions.statistics?.viewAll) {
                    let firstTrueKey;

                    for (const outerKey in allPermissions) {
                      const innerObj = allPermissions[outerKey];
                      for (const innerKey in innerObj) {
                        if (innerObj[innerKey]) {
                          firstTrueKey = outerKey;
                          break;
                        }

                        if (firstTrueKey) {
                          break;
                        }
                      }
                    }
                    console.log(firstTrueKey);
                    router.replace("/" + firstTrueKey);
                  } else router.replace("/");
                })
                .catch((error) => {
                  console.log(error);
                });
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          setBackError(error.response.data.message);
        });

      setSubmitting(false);
    }
  };

  let contextData = {
    login,
    backError,
    errors,
    submitting,
    auth,
    user,
    name,
    image,
    data,
    setData,
    setName,
    setImage,
    setBackError,
    setErrors,
    setSubmitting,
    logoutUser,
    onChangeHandler,
    permissions,
  };
  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
