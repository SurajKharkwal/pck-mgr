import ChartComponent from "@/components/Manager-Ui/Chart";
import { Progress } from "@/components/ui/progress";
import { chartData } from "@/lib/actions/Manager/DashBoard";

export default async function DashBoard() {
  const data = await chartData();
  console.log("Data: ", data)
  return (
    <div className="flex-1 flex-col gap-4 p-4 pt-0 flex">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-muted/50" >
          <Progress value={100} className="w-full" />
        </div>
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
      </div>
      <ChartComponent chartData={data} />
    </div>
  )
}
