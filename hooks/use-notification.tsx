import { useEffect, useState } from "react";
import { fetchNotifications } from "@/lib/actions/Manager/DashBoard";

export function useNotification(pageCount: number) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<{ title: string; description: string }[]>([]);
  const [hasMore, setHasMore] = useState(true);

  async function fetchData() {
    try {
      setLoading(true);
      const result = await fetchNotifications(pageCount);
      console.log(result)
      setData((prevData) => prevData.concat(result));
      setHasMore(result.length === 10);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [pageCount]);

  return { loading, data, hasMore };
}
