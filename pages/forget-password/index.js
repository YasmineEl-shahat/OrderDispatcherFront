import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

import { useContext } from "react";
import { useTranslation } from "../../util/useTranslation";
import AuthContext from "../../context/AuthContext";
import { forgetPassword } from "../api/auth";

const Forget = () => {
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
    forgetPassword(JSON.stringify(data))
      .then((res) => {
        setSubmitting(false);
        router.replace("/reset-password");
        setBackError("");
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
          {t("forget")} | {t("order-dispatcher")}
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
              <h1>{t("code")}</h1>
              <input
                name="email"
                type="email"
                placeholder="Email"
                onChange={(e) => onChangeHandler(e)}
              />
              <span className="invalid">
                {backError ? backError : errors.email ? errors.email : ""}
              </span>
              <button> {submitting ? t("submitting") : t("submit")}</button>
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

export default Forget;
