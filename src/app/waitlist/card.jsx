import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function WaitlistCard({ waitlist }) {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{waitlist.email}</CardTitle>
        <CardDescription>{waitlist.id}</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
}
