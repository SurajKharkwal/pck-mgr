"use client"
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { getUserEntriesToday } from "@/lib/actions/Manager/DashBoard";
import { useEffect, useState } from "react";

const Card = ({ maxEntries, totalEntries }: { maxEntries: number; totalEntries: number }) => (
  <div className="aspect-video rounded-xl flex p-8 flex-col bg-neutral-900/20 shadow-inner border-2">
    <h1 className="text-xl font-semibold">User Entry</h1>
    <h3>
      {totalEntries} <span className="text-neutral-400">out of {maxEntries}</span>
    </h3>
    <Progress value={(totalEntries / maxEntries) * 100} className="w-full mt-auto" />
  </div>
);

const Loading = () => (
  <div className="aspect-video rounded-xl flex p-8 flex-col bg-neutral-900/20 shadow-inner border-2">
    <h1 className="text-xl font-semibold">Package In</h1>
    <Skeleton className="h-2 w-12 rounded-md m-2" />
    <Skeleton className="h-3 w-full rounded-md mt-auto" />
  </div>
);

export default function UserCard() {
  const [data, setData] = useState<{
    maxUserEntries: number;
    totalUserEntries: number;
  }>();
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await getUserEntriesToday();
      console.log(result)
      setData(result);
    } catch (error) {
      console.error("Error fetching user entries:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <Card maxEntries={data?.maxUserEntries || 0} totalEntries={data?.totalUserEntries || 0} />
      )}
    </div>
  );
}
