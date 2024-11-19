import { ResponseStatusType } from "@/auth/hooks/useAuth";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status") as ResponseStatusType;

  if (status === "OK") {
    return new Response(
      JSON.stringify({
        data: "OK Response",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } else {
    return new Response(
      JSON.stringify({
        data: "Forbidden Response",
      }),
      {
        status: 403,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
