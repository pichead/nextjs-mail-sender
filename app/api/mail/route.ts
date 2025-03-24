import { MAIL } from '@/utils/email';
import { NextResponse } from 'next/server';

interface RequestBody {
    email: string;
    text: string;
    emailSender: string;
    emailPassword: string;
}

export async function POST(request: Request) {
    try {
        const body: RequestBody = await request.json();
        const { email, text, emailSender, emailPassword } = body;

        if (!email || !text) {
            return NextResponse.json({ error: 'text and email are required' }, { status: 400 });
        }

        const sendResult = await MAIL.sendAdsCustom(email, text, emailSender, emailPassword);
     
        return NextResponse.json(
            { message: 'Data received successfully', data: { sendResult }, statusCode: 200 },
            { status: 200 }
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
