// app/api/example/route.ts
import { MAIL } from '@/utils/email';
import { NextResponse } from 'next/server';

// กำหนดประเภทของข้อมูลที่เราคาดหวังจาก request body
interface RequestBody {
    email: string;
    text: string;
    emailSender: string;
    emailPassword: string;
}

export async function POST(request: Request) {
    try {
        // รับข้อมูลจาก request body
        const body: RequestBody = await request.json();
        const { email, text, emailSender, emailPassword } = body;

        // ตรวจสอบข้อมูล
        if (!email || !text) {
            return NextResponse.json({ error: 'text and email are required' }, { status: 400 });
        }

        const sendResult = await MAIL.sendAdsCustom(email, text, emailSender, emailPassword);
        // ทำบางอย่างกับข้อมูล (เช่น บันทึกลงฐานข้อมูล)
        // ในตัวอย่างนี้เราจะแค่ส่งข้อมูลกลับไป

        // ส่ง response กลับไปยัง client
        return NextResponse.json(
            { message: 'Data received successfully', data: { sendResult }, statusCode: 200 },
            { status: 200 }
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}