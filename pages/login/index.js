import Head from "next/head";
import { useTranslation } from "../../util/useTranslation";
import Image from "next/image";
const Login = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>
          {t("login")} | {t("order-dispatcher")}
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
            <form action="#">
              <h1>{t("signin")}</h1>
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <a href="#">{t("forget")}</a>
              <button>{t("signin")}</button>
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-right">
                {/* <h1>{t("welcome")} !</h1> */}
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

export default Login;
