"use client";
import NotificatonCard from '@/components/Manager-Ui/Notification';
import { useNotification } from '@/hooks/use-notification';
import { useState, useEffect, useRef } from 'react';
import Loading from '@/components/loadingCircle';

export default function Notifications() {
  const [pageCount, setPageCount] = useState(1);
  const endOfPageRef = useRef(null);
  const { data, loading, hasMore } = useNotification(pageCount);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore) {
          setPageCount((prevCount) => prevCount + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (endOfPageRef.current) observer.observe(endOfPageRef.current);

    return () => {
      if (endOfPageRef.current) observer.unobserve(endOfPageRef.current);
    };
  }, [hasMore]);

  return (
    <div>
      {data.map((item) => (
        NotificatonCard(item)
      ))}
      {loading && <Loading />}
      <div ref={endOfPageRef} style={{ height: '50px' }} />
    </div>
  );
}
