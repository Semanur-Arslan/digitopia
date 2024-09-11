import axios from 'axios';
import { NextResponse } from 'next/server';
import { parse } from 'cookie';

export async function GET(request) {

  const url = new URL(request.url);

    const params = new URLSearchParams(url.search);
    const paramValue = params.get('organizationId');

    const cookies = request.headers.get('cookie') || '';
    const parsedCookies = parse(cookies);
    const accessToken = parsedCookies.accessToken;

  try {
    const response = await axios.get(
      `http://ec2-3-123-161-240.eu-central-1.compute.amazonaws.com:8181/organization/${paramValue}/detail`,
      {
        headers: { Authorization: `Bearer ${accessToken}` }
      }
    );
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('API isteği sırasında bir hata oluştu:', error);

    return NextResponse.json(
      {
        message: error.response?.data?.message || 'Bir hata oluştu',
      },
      { status: error.response?.status || 500 }
    );
  }
}
