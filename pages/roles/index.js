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
  const [roleNum, setRoleNum] = useState(7);

  // handler
  const getPermissionList = (permissions) => {
    const ul = document.createElement("ul");

    for (const key in permissions) {
      const innerValues = Object.values(permissions[key]);
      if (innerValues.includes(true)) {
        const li = document.createElement("li");
        li.textContent = `${key}: `;
        const innerUl = document.createElement("ul");

        for (const innerKey in permissions[key]) {
          if (permissions[key][innerKey] === true) {
            const innerLi = document.createElement("li");
            innerLi.textContent = innerKey;
            innerUl.appendChild(innerLi);
          }
        }

        li.appendChild(innerUl);
        ul.appendChild(li);
      }
    }

    return (
      <ul
        className="permissionsWrapper"
        dangerouslySetInnerHTML={{ __html: ul.innerHTML }}
      />
    );
  };

  useEffect(() => {
    getAllRoles(roleNum)
      .then((res) => {
        let rolesArray = [];
        if (roleNum > res.data.rolesCount) setRoleNum(res.data.rolesCount);
        res.data.roles.forEach((role) => {
          rolesArray.push({
            id: role._id,
            name: role.name,
            permissions: getPermissionList(role.permissions),
          });
        });
        setTotalRoles(res.data.rolesCount);
        setColumnNames(Object.keys(rolesArray[0]));
        setRoles(rolesArray);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [roleNum]);

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
          num={roleNum}
          setNum={setRoleNum}
        />
      )}
    </main>
  );
};
Roles.getLayout = function getLayout(page) {
  return <Layout title="Roles">{page}</Layout>;
};

export default Roles;
