
"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  pckIn: {
    label: "Package In",
    color: "#4caf50", // Color for Package In
  },
  pckOut: {
    label: "Package Out",
    color: "#ff9800", // Color for Package Out
  },
} satisfies ChartConfig;

type Props = {
  date: Date; // ISO string
  pckIn: number;
  pckOut: number;
};

export default function ChartComponent({ chartData }: { chartData: Props[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Area Chart - Gradient</CardTitle>
        <CardDescription>
          Showing total visitors for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width={"100%"} height={350}>
          <ChartContainer config={chartConfig}>
            <AreaChart
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) =>
                  new Date(value).toLocaleDateString('default', { weekday: 'short' })
                }
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <defs>
                <linearGradient id="fillPckIn" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={chartConfig.pckIn.color}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor={chartConfig.pckIn.color}
                    stopOpacity={0.1}
                  />
                </linearGradient>
                <linearGradient id="fillPckOut" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={chartConfig.pckOut.color}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor={chartConfig.pckOut.color}
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <Area
                dataKey="pckIn"
                type="natural"
                fill="url(#fillPckIn)"
                fillOpacity={0.4}
                stroke={chartConfig.pckIn.color}
                stackId="a"
              />
              <Area
                dataKey="pckOut"
                type="natural"
                fill="url(#fillPckOut)"
                fillOpacity={0.4}
                stroke={chartConfig.pckOut.color}
                stackId="a"
              />
            </AreaChart>
          </ChartContainer>
        </ResponsiveContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
            <div className="flex gap-4 mt-2">
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4"
                  style={{ backgroundColor: chartConfig.pckIn.color }}
                ></div>
                <span>{chartConfig.pckIn.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4"
                  style={{ backgroundColor: chartConfig.pckOut.color }}
                ></div>
                <span>{chartConfig.pckOut.label}</span>
              </div>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
