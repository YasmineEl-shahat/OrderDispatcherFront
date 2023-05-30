import Link from "next/link";

const SideBar = () => {
  return (
    <aside className="sideBar">
      <div id="catSide">
        <Link href="/" passHref>
          <div className="categories">Dasboard</div>
        </Link>
      </div>
    </aside>
  );
};

export default SideBar;
