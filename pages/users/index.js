import Layout from "../../components/Layout";
import Spinner from "../../components/Spinner";
import Table from "../../src/sharedui/Table";
import { getAllUsers } from "../api/users";
import { useState, useEffect } from "react";

const Users = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [columnNames, setColumnNames] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [userNum, setUserNum] = useState(7);
  const [searchKey, setSearchKey] = useState("");

  useEffect(() => {
    getAllUsers(userNum, searchKey)
      .then((res) => {
        let usersArray = [];
        if (userNum > res.data.count) setUserNum(res.data.count);
        res.data.data.forEach((user) => {
          usersArray.push({
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
        setTotalUsers(res.data.count);
        setColumnNames([
          "Id",
          "Name",
          "Email",
          "Phone Number",
          "Active",
          "Role",
        ]);
        setUsers(usersArray);
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
          tableContent={users}
          total={totalUsers}
          num={userNum}
          searchKey={searchKey}
          setSearchKey={setSearchKey}
          setNum={setUserNum}
        />
      )}
    </main>
  );
};
Users.getLayout = function getLayout(page) {
  return <Layout title="Users">{page}</Layout>;
};

export default Users;
