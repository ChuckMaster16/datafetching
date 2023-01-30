import { Layout } from "@/components";
import React from "react";
import { useRouter } from "next/router";




export const getServerSideProps = async (context: {
  query: { page?: 0 | undefined; size?: 20 | undefined };
}) => {
  const { page = 0, size = 20 } = context.query;
  const res = await fetch(
    `${process.env.QUINIO}/orders/v1/loyalty/bulk/export/transactions?page=${page}&size=${size}`,
    {
      headers: {
        "X-Escale-Details": process.env.HEADER || "",
      },
    }
  );
  const data = await res.json();
  return { props: { data } };
};


const index = ({ data }: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  const getWeekNumber = (date: Date) => {
    const d = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    );
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const diff = d.getTime() - yearStart.getTime();
    return Math.ceil(((diff) / 86400000 + 1) / 7);
  };

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const handleDownload = () => {
      const csvData = data.content.map((item: any) => [
        item.createdAt.slice(0, 10),
        getWeekNumber(new Date(item.createdAt)),
        item.originDetails?.details.map((detail: { qty: any; }) => detail.qty || 0).reduce((acc: any, qty: any) => acc + qty, 0),
        item.saleAmount || 0,
        item.rewardAmount || 0,
        item.amountUsed,
        item.amountUsed,
        item.expirationDate ? item.expirationDate.slice(0, 10) : "no expiration"
      ]);
    
      const header = ["Start date", "Week Year", "# of transactions", "Total sales", "Bonus amount", "# of redemption", "Amount redeemed", "Amount Expired", "Account Ballance"];
      csvData.unshift(header);
    
      const csv = csvData.map((row: any[]) => row.join(",")).join("\n");
      const blob = new Blob([csv], { type: "text/csv" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "data.csv";
      link.click();
    };
  return (
    <Layout>
      <div className="w-screen h-screen px-10 py-20">
        <div className="flex w-full justify-between pr-20 my-5 font-bold ">
          <button className=" border rounded-3xl py-2 px-4 flex gap-3 items-center"
          onClick={()=>router.back()}
          >Back</button>
          <button className=" border rounded-3xl py-2 px-4 flex gap-3 items-center"
          onClick={handleDownload}
          >
            <svg
              className="fill-current w-4 h-4 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
            </svg>{" "}
            Download CSV
          </button>
        </div>

        <table className="">
          <thead className="w-full border px-4">
            <tr className="grid grid-cols-9 py-5">
              <th>Start date</th>
              <th>Week Year</th>
              <th># of transactions</th>
              <th>Total sales</th>
              <th>Bonus amount</th>
              <th># of redemption</th>
              <th>Amount redeemed</th>
              <th>Amount Expired</th>
              <th>Account Ballance</th>
            </tr>
          </thead>
          <tbody>
            {data.content.map((item:any, index:any) => (
              <tr className="grid grid-cols-9 pt-4 pl-6" key={index}>
                <td>{item.createdAt.slice(0, 10)}</td>
                <td>{getWeekNumber(new Date(item.createdAt))}</td>

                <td>
                  {item.originDetails?.details
                    ?.map((detail: { qty: any; }) => detail.qty || 0)
                    .reduce((acc: any, qty: any) => acc + qty, 0)}
                </td>
                <td>{item.saleAmount ? item.saleAmount : "0"}</td>
                <td>{item.rewardAmount ? item.rewardAmount : "0"}</td>
                <td>{item.amountUsed}</td>
                <td>{item.amountUsed}</td>
                <td>
                  {" "}
                  {item.expirationDate
                    ? item.expirationDate.slice(0, 10)
                    : "no exparation"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default index;
