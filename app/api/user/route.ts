import { getServerSession } from 'next-auth';
import { OPTIONS as authOptions } from '../auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);

  const currentUserEmail = session?.user?.email;

  const data = await req.json();
  data.age = Number(data.age);

  if (currentUserEmail) {
    const user = await prisma.user.update({
      where: {
        email: currentUserEmail,
      },
      // in a production app we should validate the data before saving it
      data,
    });

    return NextResponse.json(user);
  }

  return NextResponse.json({ status: 400 });
}
