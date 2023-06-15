import Layout from "../../components/Layout";
import Spinner from "../../components/Spinner";
import Table from "../../src/sharedui/Table";
import { getAllRoles } from "../api/roles";
import { useState, useEffect } from "react";

const Roles = () => {
  const [loading, setLoading] = useState(true);
  const [Roles, setRoles] = useState([]);
  const [columnNames, setColumnNames] = useState([]);
  const [totalRoles, setTotalRoles] = useState(0);
  const [userNum, setUserNum] = useState(7);
  const [searchKey, setSearchKey] = useState("");

  useEffect(() => {
    getAllRoles(userNum, searchKey)
      .then((res) => {
        let RolesArray = [];
        if (userNum > res.data.count) setUserNum(res.data.count);
        res.data.data.forEach((user) => {
          RolesArray.push({
            id: user._id,
            name: user.firstName + " " + user.lastName,
            email: user.email,
            "phone number": user.phoneNumber,
            active: user.active ? (
              <i className="fa-solid fa-check" style={{ color: "green" }}></i>
            ) : (
              <i className="fa-solid fa-x" style={{ color: "red" }}></i>
            ),
            role: user.roleName,
          });
        });
        setTotalRoles(res.data.count);
        setColumnNames([
          "Id",
          "Name",
          "Email",
          "Phone Number",
          "Active",
          "Role",
        ]);
        setRoles(RolesArray);
        setLoading(false);
      })
      .catch((error) => {
        // console.log(error.response.data.message);
        console.log(error);

        setLoading(false);
      });
  }, [userNum, searchKey]);

  return (
    <main
      className={
        loading
          ? `mainContainer d-flex justify-content-center align-items-center`
          : `mainContainer`
      }
    >
      {loading ? (
        <Spinner />
      ) : (
        <Table
          columnNames={columnNames}
          tableContent={Roles}
          total={totalRoles}
          num={userNum}
          searchKey={searchKey}
          setSearchKey={setSearchKey}
          setNum={setUserNum}
        />
      )}
    </main>
  );
};
Roles.getLayout = function getLayout(page) {
  return <Layout title="Roles">{page}</Layout>;
};

export default Roles;
