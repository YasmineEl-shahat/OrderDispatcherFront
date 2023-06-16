import Link from "next/link";
import Layout from "../../components/Layout";
import Spinner from "../../components/Spinner";
import Table from "../../src/sharedui/Table";
import { getAllRoles } from "../api/roles";
import { getAllUsers } from "../api/users";
import { useState, useEffect } from "react";

const Users = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [columnNames, setColumnNames] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [userNum, setUserNum] = useState(7);
  const [searchKey, setSearchKey] = useState("");
  const [roles, setRoles] = useState([]);
  const [role, setRole] = useState("");
  const [roleNum, setRoleNum] = useState(2);
  const [active, setActive] = useState(null);

  function handleSetActive(e) {
    setActive(e.target.value === "active");
  }

  useEffect(() => {
    getAllUsers(userNum, searchKey, role, active)
      .then((res) => {
        setLoading(true);
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

        setColumnNames(Object.keys(usersArray[0]));
        setUsers(usersArray);

        getAllRoles(roleNum)
          .then((res) => {
            let RolesArray = [];
            if (roleNum !== res.data.rolesCount)
              setRoleNum(res.data.rolesCount);
            res.data.roles.forEach((role) => {
              RolesArray.push(role.name);
            });

            setRoles(RolesArray);
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
          });
      })
      .catch((error) => {
        console.log(error);

        setLoading(false);
      });
  }, [userNum, searchKey, role, active, roleNum]);

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
        <>
          <article className="addWrapper">
            <div className="radio-buttons">
              <label>
                <input
                  type="radio"
                  name="active"
                  value="all"
                  checked={active === null}
                  onChange={() => setActive(null)}
                />
                All
              </label>
              <label>
                <input
                  type="radio"
                  name="active"
                  value="active"
                  checked={active}
                  onChange={handleSetActive}
                />
                active
              </label>
              <label>
                <input
                  type="radio"
                  name="active"
                  value="inactive"
                  checked={active === false}
                  onChange={handleSetActive}
                />
                inactive
              </label>
            </div>
            <Link href="/users?operation=add" passHref>
              <button className="btn--global ">Add New User</button>
            </Link>
          </article>
          <Table
            columnNames={columnNames}
            tableContent={users}
            total={totalUsers}
            num={userNum}
            searchKey={searchKey}
            setSearchKey={setSearchKey}
            setNum={setUserNum}
            filter1_list={roles}
            filter1={role}
            setFilter1={setRole}
            filter1_placeholder={"Role"}
          />
        </>
      )}
    </main>
  );
};
Users.getLayout = function getLayout(page) {
  return <Layout title="Users">{page}</Layout>;
};

export default Users;
