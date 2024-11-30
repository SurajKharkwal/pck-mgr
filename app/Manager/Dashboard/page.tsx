import ChartComponent from "@/components/Manager-Ui/DashBoard/Chart";
import PackageCard from "@/components/Manager-Ui/DashBoard/PackageCard";
import UserCard from "@/components/Manager-Ui/DashBoard/UserCard";
import { chartData } from "@/lib/actions/Manager/DashBoard";

export default async function DashBoard() {
  const data = await chartData();
  console.log("Data: ", data)
  return (
    <div className="flex-1 flex-col gap-4 p-4 pt-0 flex">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <PackageCard />
        <UserCard />
      </div>
      <ChartComponent chartData={data} />
    </div>
  )
}
