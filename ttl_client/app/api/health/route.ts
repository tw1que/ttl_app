export async function GET(_req: Request) {
  return new Response(JSON.stringify({ status: 'ok' }), {
    headers: { 'content-type': 'application/json' },
    status: 200,
  });
}
