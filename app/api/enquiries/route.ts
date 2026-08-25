import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getAdminFromCookies } from '@/lib/auth';

export const dynamic = 'force-dynamic';


export async function GET() {
  try {
    const admin = await getAdminFromCookies();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const enquiries = await prisma.enquiry.findMany({
      include: {
        property: {
          select: {
            id: true,
            title: true,
            location: true,
            slug: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(enquiries);
  } catch (error) {
    console.error('Error fetching enquiries:', error);
    return NextResponse.json({ error: 'Failed to fetch enquiries' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, propertyId, requirement, preferredLocation, budget, message } = body;

    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: 'Name, Phone number, and Message are required' },
        { status: 400 }
      );
    }

    const enquiry = await prisma.enquiry.create({
      data: {
        name,
        phone,
        email: email || null,
        propertyId: propertyId || null,
        requirement: requirement || null,
        preferredLocation: preferredLocation || null,
        budget: budget || null,
        message,
        status: 'New',
      },
    });

    return NextResponse.json({ success: true, enquiry }, { status: 201 });
  } catch (error) {
    console.error('Error submitting enquiry:', error);
    return NextResponse.json({ error: 'Failed to submit enquiry' }, { status: 500 });
  }
}
