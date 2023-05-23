import Head from "next/head";
import { useRouter } from "next/router";

import SideBar from "./SideBar";
import { useTranslation } from "../util/useTranslation";

const Layout = ({ title, children }) => {
  const router = useRouter();
  const { locale } = router;
  const { t } = useTranslation();

  return (
    <div className={locale == "ar" ? "arabicContainer" : ""}>
      <Head>
        <title>
          {title
            ? `${t(title)}  | ${t("Order Dispatcher")}`
            : t("Order Dispatcher")}
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SideBar />
      {children}
    </div>
  );
};

export default Layout;
