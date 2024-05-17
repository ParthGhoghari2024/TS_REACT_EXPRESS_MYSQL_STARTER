import { useEffect, useState } from "react";

function AllBasicDetailsPage() {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  const [allBasicDetailsArr, setAllBasicDetailsArr] = useState([]);

  let fetchedFlag = 0;
  useEffect(() => {
    if (fetchedFlag === 1) return;
    fetchedFlag = 1;
    const fetchNow = async () => {
      const allBasicDetailsFetch = await fetch(`${BACKEND_URL}/all`);

      const allBasicDetailsJson = await allBasicDetailsFetch.json();
      if (allBasicDetailsJson && allBasicDetailsJson.result) {
        setAllBasicDetailsArr(allBasicDetailsJson.result);
      }
    };

    fetchNow();
  }, []);
  return (
    <>
      {/* {console.log(allBasicDetailsArr)} */}
      {allBasicDetailsArr &&
        allBasicDetailsArr.map((basicDetailObj) => {
          console.log(basicDetailObj);
        })}
    </>
  );
}

export default AllBasicDetailsPage;
