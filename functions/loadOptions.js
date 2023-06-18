import { getAllAreas } from "../pages/api/locations";

//sleep fun to wait before calling the api
const sleep = (ms) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });

//load job categories from api
export const loadAreas = async (search, prevOptions) => {
  await sleep(100);
  let slicedOptions = [];

  await getAllAreas()
    .then((res) => {
      slicedOptions = res.data.location.map((area) => ({
        value: area.id,
        label: area.name,
      }));
    })
    .catch((error) => {
      console.log(error);
    });

  return {
    options: slicedOptions,
    hasMore: false,
  };
};
