import { PiggyBankIcon } from "lucide-react";

const HomePage = () => {
  return (
    <div className="py-3 flex flex-col gap-y-4">
      <div className="" >
        <h1 className="text-2xl font-bold">Welcome Back, Saurav</h1>
      </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-3">
      {
        Array(3).fill(null).map((cur,i) => {
          return (
            <DashboardCard key={i}/>
          )
        })
      }
      </div>
    </div>
  )
}

export default HomePage;


const DashboardCard = () => {
  return <div className="flex items-center justify-between border py-3">
    <PiggyBankIcon />
  </div>
}