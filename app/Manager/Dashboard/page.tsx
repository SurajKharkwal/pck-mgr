import ChartComponent from "@/components/Manager-Ui/Chart";
import { Progress } from "@/components/ui/progress";
import { chartData } from "@/lib/actions/Manager/DashBoard";

export default async function DashBoard() {
  const data = await chartData();
  console.log("Data: ", data)
  return (
    <div className="flex-1 flex-col gap-4 p-4 pt-0 flex">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl flex p-8 flex-col bg-muted/50" >
          <h1 className="text-xl font-semibold">Package In </h1>
          <h3>3 <span className="text-neutral-400">out of 20</span></h3>
          <Progress value={100} className="w-full mt-auto" />
        </div>

        <div className="aspect-video rounded-xl flex p-8 flex-col bg-muted/50" >
          <h1 className="text-xl font-semibold">Package In </h1>
          <h3>3 <span className="text-neutral-400">out of 20</span></h3>
          <Progress value={100} className="w-full mt-auto" />
        </div>

        <div className="aspect-video rounded-xl flex p-8 flex-col bg-muted/50" >
          <h1 className="text-xl font-semibold">Package In </h1>
          <h3>3 <span className="text-neutral-400">out of 20</span></h3>
          <Progress value={100} className="w-full mt-auto" />
        </div>
      </div>
      <ChartComponent chartData={data} />
    </div>
  )
}
