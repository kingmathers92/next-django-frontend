"use client";
import { useAuth } from "@/components/authProvider";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import fetcher from "@/lib/fetcher";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useSWR from "swr";

const WAITLIST_API_URL = "/api/waitlist";

export default function WaitlistTable() {
  const router = useRouter();
  const { data, error, isLoading } = useSWR(WAITLIST_API_URL, fetcher);
  const auth = useAuth();
  useEffect(() => {
    if (error?.status === 401) {
      auth.loginRequiredRedirect();
    }
  }, [auth, error]);
  console.log(error);
  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  console.log(data);
  return (
    <Table>
      <TableCaption>A list of your waitlist entries.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Email</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, idx) => (
          <TableRow
            className="hover:cursor-pointer"
            key={`item-${idx}`}
            onClick={(e) => router.push(`/waitlist/${item.id}`)}
          >
            <TableCell className="font-medium">{item.id}</TableCell>
            <TableCell className="font-medium">{item.email}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
