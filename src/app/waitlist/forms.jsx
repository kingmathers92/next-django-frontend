"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const WAITLIST_API_URL = "/api/waitlist";

export default function WaitlistForm() {
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    setErrors({});
    setError("");
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

    if (response.status === 201 || response.status === 200) {
      setMessage("Thank you for joining");
    } else {
      const data = await response.json();
      setErrors(data);
      if (!data.email) {
        setError("There was an error with you request. Please try again");
      }
    }
  }
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {message && (
        <div className="rounded-md text-white bg-green-500 p-3 font-semibold text-sm">
          {message}
        </div>
      )}
      {error && (
        <div className="rounded-md text-white bg-destructive p-3 font-semibold text-sm">
          {error}
        </div>
      )}
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <div
          className={
            errors?.email ? "rounded-lg p-3 border bg-destructive" : ""
          }
        >
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="Your email"
            required
          />
          {errors &&
            errors?.email &&
            errors?.email.lemgth >
              0(
                <div className="p-1 text-sm bg-destructive text-center text-white">
                  {errors?.email.map((err, idx) => {
                    return !err.message ? null : (
                      <p key={`err-${idx}`}>{err.message}</p>
                    );
                  })}
                </div>
              )}
        </div>
      </div>
      <Button type="submit" className="w-full">
        Join Waitlist
      </Button>
    </form>
  );
}
