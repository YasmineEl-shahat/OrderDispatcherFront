import Link from "next/link";
import Layout from "../../components/Layout";
import Spinner from "../../components/Spinner";
import Table from "../../src/sharedui/Table";
import { getAllRoles } from "../api/roles";
import { deleteUser, getAllUsers, banUser } from "../api/users";
import { useState, useEffect, useContext } from "react";
import CustomModal from "../../src/sharedui/modal";
import AuthContext from "../../context/AuthContext";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});

  const { permissions } = useContext(AuthContext);

  // handlers
  const handleSetActive = (e) => {
    if (e.target.value === "all") setActive(null);
    else setActive(e.target.value === "active");
  };

  const handleDelete = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteUser(selectedUser.id);
    setIsModalOpen(false);
    let newUsers = users.filter((user) => user.id != selectedUser.id);
    setUsers(newUsers);
    setUserNum(userNum - 1);
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
  };

  let canActivate = permissions?.users?.activateDeactivate;

  const handleCanActivate = async (e, id) => {
    const response = await banUser(id);
    let newUsers = users.map((u) => {
      if (u.id === id) {
        return {
          ...u,
          status: response.data,
        };
      } else {
        return u;
      }
    });

    if (e.target.tagName == "I") e.target = e.target.parentElement;

    if (response.data === "active")
      e.target.firstChild.classList.value = "fa-solid fa-toggle-on";
    else e.target.firstChild.classList.value = "fa-solid fa-toggle-off";
    setUsers(newUsers);
  };

  useEffect(() => {
    getAllUsers(userNum, searchKey, role, active)
      .then((res) => {
        let usersArray = [];
        if (userNum > res.data.count) setUserNum(res.data.count);
        setTotalUsers(res.data.count);

        res.data.data.forEach((user) => {
          usersArray.push({
            id: user._id,
            name: user.firstName + " " + user.lastName,
            email: user.email,
            "phone number": user.phoneNumber,
            role: user.roleName,
            status: user.active ? "active" : "not active",
          });
        });

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
    <>
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
                {/* <label>
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
                </label> */}
              </div>
              {permissions?.users?.add && (
                <Link href="/users/add" passHref>
                  <button className="btn--global ">Add New User</button>
                </Link>
              )}
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
              filter2_list={["all", "active", "inactive"]}
              handleSetFilter2={handleSetActive}
              filter2_placeholder={"Status"}
              canEdit={permissions?.users?.edit}
              handleDelete={permissions?.users?.delete ? handleDelete : false}
              setSelectedItem={setSelectedUser}
              canActivate={canActivate}
              handleCanActivate={handleCanActivate}
            />
          </>
        )}
      </main>
      <CustomModal
        isModalOpen={isModalOpen}
        handleCancelDelete={handleCancelDelete}
        handleConfirmDelete={handleConfirmDelete}
        name={selectedUser.name}
      />
    </>
  );
};
Users.getLayout = function getLayout(page) {
  return <Layout title="users">{page}</Layout>;
};

export default Users;
