import Head from "next/head";
import { useRouter } from "next/router";

import SideBar from "./SideBar";
import { useTranslation } from "../util/useTranslation";
import Navbar from "./Navbar";

const Layout = ({ title, children, navTitle }) => {
  const router = useRouter();
  const { locale } = router;
  const { t } = useTranslation();

  return (
    <div className={locale == "ar" ? "arabicContainer" : ""}>
      <Head>
        <title>
          {title
            ? `${t(title)}  | ${t("order-dispatcher")}`
            : t("order-dispatcher")}
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar locale={locale} translate={t} navTitle={navTitle} />
      <SideBar translate={t} />
      {children}
    </div>
  );
};

export default Layout;
