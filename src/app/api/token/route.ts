export async function GET() {
  return new Response(
    JSON.stringify({
      accessToken: "Alireza",
      refreshToken: "Garshasbi",
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
