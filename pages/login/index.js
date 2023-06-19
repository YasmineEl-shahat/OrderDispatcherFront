import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { useTranslation } from "../../util/useTranslation";
import AuthContext from "../../context/AuthContext";

const Login = () => {
  const { t } = useTranslation();
  const {
    login,
    backError,
    errors,
    onChangeHandler,
    submitting,
    setData,
    setErrors,
    setBackError,
  } = useContext(AuthContext);

  const router = useRouter();
  const { locale } = router;

  useEffect(() => {
    setData({});
    setErrors({});
    setBackError("");
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Head>
        <title>
          {t("login")} | {t("order-dispatcher")}
        </title>
      </Head>
      <div className={locale == "ar" ? "arabicContainer" : ""}>
        <main className="login-container">
          {/* eslint-disable */}
          <figure>
            <img src="/assets/logo.png" className="logo" alt="logo" />
            <figcaption>{t("order-dispatcher")}</figcaption>
          </figure>

          <div className="container" id="container">
            <div className="form-container sign-in-container">
              <form onSubmit={(e) => login(e)}>
                <h1>{t("signin")}</h1>
                <input
                  name="email"
                  type="email"
                  placeholder={t("email")}
                  onChange={(e) => onChangeHandler(e)}
                />
                <span className="invalid">
                  {errors.email ? errors.email : ""}
                </span>
                <input
                  name="password"
                  type="password"
                  placeholder={t("password")}
                  onChange={(e) => onChangeHandler(e)}
                />
                <span className="invalid">
                  {errors.password ? errors.password : ""}
                </span>
                <span className="invalid">{backError}</span>
                <Link href="/forget-password" passHref>
                  {t("forget")}
                </Link>
                <button type="submit">
                  {submitting ? t("submitting") : t("signin")}
                </button>
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
      </div>
    </>
  );
};

export default Login;
