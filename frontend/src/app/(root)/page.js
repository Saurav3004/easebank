import HeaderName from "@/components/reusable/HeaderName";
import Link from "next/link";
import { BsCoin } from "react-icons/bs";
import { IoCardSharp } from "react-icons/io5";
import { RiCoinLine } from "react-icons/ri";

const HomePage = () => {
  const dashboard_data = [
    {
      title:"Amount",
      "Icon":BsCoin,
      "value": `₹${0}`,
      "className": "text-4xl text-yellow-600",
      link: "/amount"
    },
    {
      title:"FD Amount",
      "Icon":RiCoinLine,
      "value": `₹${5}`,
      "className":"text-4xl text-green-600",
      link:"/fd-amount",
    },
    {
      title:"ATM Cards",
      "Icon":IoCardSharp,
      "value":2,
      "className":"text-4xl text-blue-600",
      link:"/atm-cards"
    },
  ]
  return (
    <div className="py-10 px-4 flex flex-col gap-y-4">
      <HeaderName />
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-3">
      {
        dashboard_data.map((cur,i) => {
          return (
            <DashboardCard key={i} data={cur}/>
          )
        })
      }
      </div>
    </div>
  )
}

export default HomePage;


const DashboardCard = ({data}) => {
  return <Link href={data.link} className="flex items-center justify-between border py-3 px-10">
    <data.Icon className={data.className}/>
    <div className="flex flex-col gap-y-2 justify-end">
      <p className="text-lg">{data.title}</p>
      <h3 className="text-2xl font-semibold text-end">{data.value}</h3>
    </div>
  </Link>
}