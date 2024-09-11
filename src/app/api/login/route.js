import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const requestBody = await request.json();

    const apiResponse = await axios.post(
      'https://dev.digitopia.co/api/a2/signIn',
      requestBody
    );

    return NextResponse.json(apiResponse.data);
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