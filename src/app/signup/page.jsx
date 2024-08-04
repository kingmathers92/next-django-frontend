"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useState } from "react";

export default function Page() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    setErrors({});
    const response = await fetch("/signup/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    let data;
    try {
      data = await response.json();
    } catch (error) {
      data = { message: "Invalid JSON response from server" };
    }

    if (response.ok) {
      setMessage("Registration successful!");
    } else {
      setErrors(data.errors || { general: data.message });
    }
  }

  return (
    <div className="w-full lg:grid lg:min-h-[85vh]  lg:grid-cols-2 xl:min-h-[90vh]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Signup</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email and password below to sign up
            </p>
          </div>
          <div className="grid gap-4">
            <form onSubmit={handleSubmit}>
              <div>
                <label>Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                {errors.username && <p>{errors.username.join(", ")}</p>}
              </div>
              <div>
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <p>{errors.email.join(", ")}</p>}
              </div>
              <div>
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              Don&apos;t have an account? <button type="submit">Sign up</button>
              {message && <p>{message}</p>}
            </form>
          </div>
          <div className="mt-4 text-center text-sm"></div>
        </div>
      </div>
    </div>
  );
}
