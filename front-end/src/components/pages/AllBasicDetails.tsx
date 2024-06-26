import { useEffect, useState } from "react";

interface allBasicDetailsInterface {
  id: number;
  full_name: string;
  email: string;
  address: string;
  city: string;
  zipcode: number;
}

interface responseInterface<T> {
  success: number;
  result: T[];
}

function AllBasicDetailsPage() {
  const BACKEND_URL: string | undefined = process.env.REACT_APP_BACKEND_URL;

  const [allBasicDetailsArr, setAllBasicDetailsArr] = useState<
    allBasicDetailsInterface[]
  >([]);

  let fetchedFlag: number = 0;
  useEffect(() => {
    if (fetchedFlag === 1) return;
    fetchedFlag = 1;
    const fetchNow = async (): Promise<void> => {
      const allBasicDetailsFetch: Response = await fetch(`${BACKEND_URL}/all`);

      const allBasicDetailsJson: responseInterface<allBasicDetailsInterface> =
        await allBasicDetailsFetch.json();
      if (allBasicDetailsJson && allBasicDetailsJson.result) {
        setAllBasicDetailsArr(allBasicDetailsJson.result);
      }
    };

    fetchNow();
  }, []);
  return (
    <>
      {allBasicDetailsArr &&
        allBasicDetailsArr.map((basicDetailObj) => {
          return (
            <>
              <br />
              {Object.values(basicDetailObj).map((ele) => {
                return <span className="mx-2">{ele}</span>;
              })}
            </>
          );
        })}
    </>
  );
}

export default AllBasicDetailsPage;
