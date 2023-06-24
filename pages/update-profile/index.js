import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

import Layout from "../../components/Layout";
import AuthContext from "../../context/AuthContext";
import { useTranslation } from "../../util/useTranslation";
import { updateUser, viewUser } from "../api/users";
import Spinner from "../../components/Spinner";
import UserForm from "../../src/sharedui/forms/userForm";

const baseUrl = process.env.API_URL;
const UpdateUser = () => {
  const router = useRouter();

  const {
    data,
    backError,
    errors,
    onChangeHandler,
    submitting,
    setSubmitting,
    setBackError,
    setData,
    user,
    image,
    setImage,
  } = useContext(AuthContext);

  const { t } = useTranslation();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // get user data
    viewUser(user.id)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });

    // eslint-disable-next-line
  }, []);

  const removeImage = () => {
    let newData = { ...data };
    newData["image"] = "";
    setData(newData);
    setImage("");
    document.getElementById("image").value = "";
  };

  const submit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    let formData = new FormData();
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        if (key === "image") {
          if (data[key]) {
            formData.append(key, data[key]);
          }
        } else if (data[key] !== "" && data[key] !== null) {
          formData.append(key, data[key]);
        }
      }
    }

    updateUser(user.id, formData)
      .then((res) => {
        if (data["image"]) {
          localStorage.setItem(
            "image",
            baseUrl + "/images/" + user.id + ".jpg"
          );
          setImage(baseUrl + "/images/" + user.id + ".jpg");
        } else {
          localStorage.setItem("image", baseUrl + "/images/default.jpg");
          setImage(baseUrl + "/images/default.jpg");
        }
        setSubmitting(false);
        setData({});
        setBackError("");
        router.replace("/");
      })
      .catch((error) => {
        setBackError(error.response.data.message);
        setSubmitting(false);
      });
  };
  return (
    <main
      className={
        loading
          ? `mainContainer d-flex justify-content-center align-items-center`
          : `mainContainer formContainer`
      }
    >
      {loading ? (
        <Spinner />
      ) : (
        <UserForm
          data={data}
          errors={errors}
          backError={backError}
          onChangeHandler={onChangeHandler}
          submit={submit}
          submitting={submitting}
          t={t}
          isProfile={true}
          image={image}
          removeImage={removeImage}
        />
      )}
    </main>
  );
};

UpdateUser.getLayout = function getLayout(page) {
  return (
    <Layout title="profile" navTitle="profile">
      {page}
    </Layout>
  );
};
export default UpdateUser;
