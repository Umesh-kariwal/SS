import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getAdminFromCookies } from '@/lib/auth';
import { slugify } from '@/lib/utils';

export const dynamic = 'force-dynamic';


export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const location = searchParams.get('location');
    const type = searchParams.get('type');
    const status = searchParams.get('status');
    const featured = searchParams.get('featured');
    const search = searchParams.get('search');
    const includeDrafts = searchParams.get('includeDrafts') === 'true';

    const admin = await getAdminFromCookies();

    const where: any = {};

    // Unless admin requests drafts explicitly, only show published properties (non-draft)
    if (!admin || !includeDrafts) {
      if (status && status !== 'all') {
        where.status = status;
      } else {
        where.status = { not: 'Draft' };
      }
    } else if (status && status !== 'all') {
      where.status = status;
    }

    if (location && location !== 'all') {
      where.location = { equals: location };
    }

    if (type && type !== 'all') {
      where.propertyType = { equals: type };
    }

    if (featured === 'true') {
      where.isFeatured = true;
    }

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { location: { contains: search } },
        { address: { contains: search } },
        { shortDescription: { contains: search } },
        { description: { contains: search } },
      ];
    }

    const properties = await prisma.property.findMany({
      where,
      include: {
        images: {
          orderBy: { sortOrder: 'asc' },
        },
        features: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(properties);
  } catch (error) {
    console.error('Error fetching properties:', error);
    return NextResponse.json({ error: 'Failed to fetch properties' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const admin = await getAdminFromCookies();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      title,
      propertyType,
      location,
      address,
      price,
      priceDisplay,
      area,
      areaUnit,
      shortDescription,
      description,
      status,
      isFeatured,
      videoUrl,
      virtualTourUrl,
      features = [],
      images = [], // Array of imageUrl strings or { imageUrl, isCover, sortOrder }
    } = body;

    if (!title || !propertyType || !location || !price || !area) {
      return NextResponse.json({ error: 'Missing required property fields' }, { status: 400 });
    }

    // Generate unique slug
    let baseSlug = slugify(title);
    let slug = baseSlug;
    let counter = 1;
    while (await prisma.property.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    const property = await prisma.property.create({
      data: {
        title,
        slug,
        propertyType,
        location,
        address: address || '',
        price: parseFloat(price),
        priceDisplay: priceDisplay || `₹ ${price}`,
        area: parseFloat(area),
        areaUnit: areaUnit || 'sq.ft',
        shortDescription: shortDescription || '',
        description: description || '',
        status: status || 'Available',
        isFeatured: Boolean(isFeatured),
        videoUrl: videoUrl || null,
        virtualTourUrl: virtualTourUrl || null,
        features: {
          create: features.map((f: string) => ({ feature: f })),
        },
        images: {
          create: images.map((img: any, idx: number) => {
            const imageUrl = typeof img === 'string' ? img : img.imageUrl;
            const isCover = typeof img === 'object' ? Boolean(img.isCover) : idx === 0;
            return {
              imageUrl,
              isCover,
              sortOrder: idx,
            };
          }),
        },
      },
      include: {
        images: true,
        features: true,
      },
    });

    return NextResponse.json(property, { status: 201 });
  } catch (error) {
    console.error('Error creating property:', error);
    return NextResponse.json({ error: 'Failed to create property' }, { status: 500 });
  }
}
