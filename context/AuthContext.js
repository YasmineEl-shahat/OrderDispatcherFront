import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import cookieCutter from "cookie-cutter";
import { useRouter } from "next/router";
import { userLogin } from "../pages/api/auth";

const AuthContext = createContext();
export default AuthContext;

const baseUrl = process.env.API_URL;

export const AuthProvider = ({ children }) => {
  const router = useRouter();

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
      ? JSON.parse(localStorage.getItem("name"))
      : ""
  );
  const [image, setImage] = useState(() =>
    typeof window !== "undefined" &&
    localStorage.getItem("image") != "undefined"
      ? JSON.parse(localStorage.getItem("image"))
      : ""
  );

  const logoutUser = () => {
    setAuth(null);
    setUser(null);
    document.cookie = "auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    localStorage.removeItem("name");
    localStorage.removeItem("image");
    router.replace("/login");
  };

  //handle Expired tokens
  const checkToken = async () => {
    let response = await fetch(baseUrl + "jwtValidate", {
      headers: {
        Authorization: "Bearer" + " " + auth,
      },
    });
    if (response.status === 200) {
      let { tokenObject } = await response.json();
      setAuth(tokenObject);
      setUser(jwt_decode(tokenObject));
      if (typeof window !== "undefined") {
        // cookieCutter.set("auth", "", { expires: new Date(0) });
        cookieCutter.set("auth", tokenObject);
      }
    } else {
      logoutUser();
    }
  };

  //renew token on every reload
  //   useEffect(() => {
  //     const path = ["/login", "/forget-password", "/reset-password"];
  //     if (!path.includes(router.asPath) && auth) checkToken();
  //     else if (!path.includes(router.asPath) && router.asPath !== "/login")
  //       router.replace("/login");
  //     let hour = 1000 * 60 * 60;
  //     let interval = setInterval(function () {
  //       if (!path.includes(router.asPath) && auth) checkToken();
  //     }, hour);
  //   }, [auth]);

  const onChangeHandler = (e) => {
    let err = { ...errors };
    let newData = { ...data };
    if (e.target.value == "")
      err[e.target.name] = e.target.name + " is required!";
    else {
      err[e.target.name] = "";
      newData[e.target.name] = e.target.value;
    }
    setBackError("");
    setErrors(err);
    setData(newData);
  };

  const validate = () => {
    if (!data["email"] || !data["password"]) {
      setBackError("Fill the required data");
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
          router.replace("/");
        })
        .catch((error) => {
          setBackError(error.response.data.message);
        });

      //   const resDes = await fetch(
      //     baseUrl + "seeker/details/view/" + user.id
      //   );
      //   const { profile_picture } = await resDes.json();
      //   setImage(profile_picture);
      //   localStorage.setItem("image", JSON.stringify(profile_picture));
      //   let response = await fetch(baseUrl + "seeker/profile/info", {
      //     headers: {
      //       Authorization: "Bearer" + " " + auth,
      //     },
      //   });
      //   const res = await response.json();
      //   if (res) {
      //     setName(`${res.fname} ${res.lname}`);
      //     localStorage.setItem(
      //       "name",
      //       JSON.stringify(`${res.fname} ${res.lname}`)
      //     );
      //   }
      //   router.replace("/");
      // }

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
    setName,
    setImage,
    image,
    logoutUser,
    onChangeHandler,
  };
  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
