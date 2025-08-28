import type { NextRequest } from 'next/server';

export async function GET(_req: NextRequest) {
  return new Response(JSON.stringify({ status: 'ok' }), {
    status: 200,
    headers: {
      'content-type': 'application/json'
    }
  });
}

