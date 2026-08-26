import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/db';
import { getAdminFromCookies } from '../../../lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    let settings = await prisma.websiteSettings.findUnique({
      where: { id: 'default' },
    });

    if (!settings) {
      settings = await prisma.websiteSettings.create({
        data: {
          id: 'default',
          businessName: 'Sawriya Seth Properties (SS Properties)',
          ownerName: 'Ronak Khatik',
          phone: '9511397967',
          email: 'khatik.raja93@gmail.com',
          whatsapp: '9511397967',
          heroTitle: 'Find the Right Property. Build the Right Future.',
          heroSubtitle: 'Trusted local real estate consulting by Ronak Khatik across Debari, Nathdwara, Daroli, Navaniya, Dabok, and Mavli.',
          aboutHeading: 'Sawriya Seth Properties — Your Property Partner',
          aboutDescription: 'Sawriya Seth Properties (SS Properties), led by Ronak Khatik, provides transparent, expert real estate consultancy services specializing in residential plots, commercial land, agricultural parcels, and luxury properties across the Udaipur & Rajsamand region.',
          aboutPhotoUrl: '/uploads/ronak_khatik.jpg',
          footerText: 'Sawriya Seth Properties (SS Properties). All rights reserved.',
        },
      });
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const admin = await getAdminFromCookies();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    const updated = await prisma.websiteSettings.upsert({
      where: { id: 'default' },
      update: { ...body },
      create: { id: 'default', ...body },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json({ error: 'Failed to update website settings' }, { status: 500 });
  }
}
