"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const WAITLIST_API_URL = "/api/waitlist";

export default function WaitlistForm() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const objectFromForm = Object.fromEntries(formData);
    const jsonData = JSON.stringify(objectFromForm);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    };
    const response = await fetch(WAITLIST_API_URL, requestOptions);
    if (response.ok) {
      setMessage("Thank you for joining");
    } else {
      setError("There was an error with you request. Please try again");
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>{message && message}</div>
      <div>{error && error}</div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          name="email"
          placeholder="Your email"
          required
        />
      </div>
      <Button type="submit" className="w-full">
        Join Waitlist
      </Button>
    </form>
  );
}
