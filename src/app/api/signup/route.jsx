"use server";

import { NextResponse } from "next/server";
import { DJANGO_AUTH_ENDPOINT } from "@/config/defaults";

const DJANGO_API_SIGNUP_URL = `${DJANGO_AUTH_ENDPOINT}/signup`;

export async function POST(request) {
  const requestData = await request.json();
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  };

  const response = await fetch(DJANGO_API_SIGNUP_URL, requestOptions);

  let data;
  try {
    data = await response.json();
  } catch (error) {
    data = { message: "Invalid JSON response from server" };
  }

  if (response.ok) {
    return NextResponse.json({ registered: true, ...data }, { status: 200 });
  }

  return NextResponse.json({ registered: false, ...data }, { status: 400 });
}
