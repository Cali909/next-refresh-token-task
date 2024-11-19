export async function GET() {
  return new Response(
    JSON.stringify({
      accessToken: "Alireza_Refresh",
      refreshToken: "Garshasbi_Refresh",
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
