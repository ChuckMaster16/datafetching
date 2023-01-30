import React from "react";
import Layout from "./Layout";

const Details = () => {
  React.useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(
            `${process.env.QUINIO}/orders/v1/loyalty/bulk/export/transactions`,
            {
              headers: {
                "X-Escale-Details": process.env.HEADER || "",
              },
            }
          );
          if (res.status === 200) {
            const result = await res.json();
            console.log(result);
          }

      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);
  return <div>heelo</div>;
};

export default Details;
