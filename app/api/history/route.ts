// app/api/history/route.ts
import { type NextRequest, NextResponse } from 'next/server';

const { BITTE_API_KEY, BITTE_API_URL = 'https://wallet.bitte.ai/api/v1' } = process.env;

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export async function GET(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const url = `${BITTE_API_URL}/history?id=${id}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${BITTE_API_KEY}`,
    },
  });

  const result = await response.json();
  return NextResponse.json(result);
}