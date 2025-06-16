import axios from "axios";

const BASE_URL = "https://dev.nmcms.ru/api";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  },
  withCredentials: true,
});

export const getData = async (url: string) => {
  const baseUrl = "https://dev.nmcms.ru/api/";

  if (!baseUrl) {
    throw new Error(
      "NEXT_PUBLIC_API_URL is not defined in the environment variables"
    );
  }

  const fullUrl = new URL(url + "/", baseUrl).toString();

  const res = await fetch(fullUrl, {
    headers: {
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
    },
    next: { revalidate: 10 },
  });

  if (!res.ok) {
    const errorDetails = await res.text();
    throw new Error(
      `Failed to fetch ${fullUrl}: ${res.status} - ${errorDetails}`
    );
  }

  const text = await res.text();

  try {
    return JSON.parse(text);
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("JSON Parse Error:", error);
    throw new Error(`Failed to parse JSON response: ${errorMessage}`);
  }
};
