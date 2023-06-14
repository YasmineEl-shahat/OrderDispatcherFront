import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

import { useContext } from "react";
import { useTranslation } from "../../util/useTranslation";
import AuthContext from "../../context/AuthContext";

import { resetPassword } from "../api/auth";

const ResetPassword = () => {
  const { t } = useTranslation();

  const router = useRouter();

  const {
    data,
    backError,
    errors,
    onChangeHandler,
    submitting,
    setSubmitting,
    setBackError,
  } = useContext(AuthContext);

  const submit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    resetPassword(JSON.stringify(data))
      .then((res) => {
        setSubmitting(false);
        router.replace("/login");
      })
      .catch((error) => {
        setBackError(error.response.data.message);
        setSubmitting(false);
      });
  };
  return (
    <>
      <Head>
        <title>
          {t("reset")} | {t("order-dispatcher")}
        </title>
      </Head>
      <main className="login-container">
        {/* eslint-disable */}
        <figure>
          <img src="/assets/logo.png" className="logo" alt="logo" />
          <figcaption>{t("order-dispatcher")}</figcaption>
        </figure>
        <div className="container" id="container">
          <div className="form-container sign-in-container">
            <form onSubmit={(e) => submit(e)}>
              <h1> {t("data")} </h1>
              <input
                type="text"
                placeholder="Code"
                name="code"
                onChange={(e) => onChangeHandler(e)}
              />
              <span className="invalid">{errors.code ? errors.code : ""}</span>
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={(e) => onChangeHandler(e)}
              />
              <span className="invalid">
                {errors.password ? errors.password : ""}
              </span>
              <input
                type="password"
                placeholder="Re Enter Password"
                name="confirmPassword"
                onChange={(e) => onChangeHandler(e)}
              />
              <span className="invalid">
                {errors.confirmPassword ? errors.confirmPassword : ""}
              </span>
              <span className="invalid">{backError}</span>
              <button> {submitting ? t("submitting") : t("reset")}</button>
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-right">
                <Image
                  width={400}
                  height={400}
                  alt="welcome"
                  src={"/assets/login.png"}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ResetPassword;
