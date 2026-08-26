import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/db';
import { getAdminFromCookies } from '../../../../lib/auth';
import { slugify } from '../../../../lib/utils';

export const dynamic = 'force-dynamic';


export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Search by ID or slug
    const property = await prisma.property.findFirst({
      where: {
        OR: [{ id: id }, { slug: id }],
      },
      include: {
        images: {
          orderBy: { sortOrder: 'asc' },
        },
        features: true,
      },
    });

    if (!property) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }

    return NextResponse.json(property);
  } catch (error) {
    console.error('Error fetching property detail:', error);
    return NextResponse.json({ error: 'Failed to fetch property details' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const admin = await getAdminFromCookies();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    const body = await request.json();

    const existingProperty = await prisma.property.findUnique({ where: { id } });
    if (!existingProperty) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }

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
      images = [],
    } = body;

    // Check slug update if title changed
    let slug = existingProperty.slug;
    if (title && title !== existingProperty.title) {
      let baseSlug = slugify(title);
      slug = baseSlug;
      let counter = 1;
      while (
        await prisma.property.findFirst({
          where: { slug, NOT: { id } },
        })
      ) {
        slug = `${baseSlug}-${counter}`;
        counter++;
      }
    }

    // Delete existing features and images to replace with updated list
    await prisma.propertyFeature.deleteMany({ where: { propertyId: id } });
    await prisma.propertyImage.deleteMany({ where: { propertyId: id } });

    const updatedProperty = await prisma.property.update({
      where: { id },
      data: {
        title: title !== undefined ? title : existingProperty.title,
        slug,
        propertyType: propertyType !== undefined ? propertyType : existingProperty.propertyType,
        location: location !== undefined ? location : existingProperty.location,
        address: address !== undefined ? address : existingProperty.address,
        price: price !== undefined ? parseFloat(price) : existingProperty.price,
        priceDisplay: priceDisplay !== undefined ? priceDisplay : existingProperty.priceDisplay,
        area: area !== undefined ? parseFloat(area) : existingProperty.area,
        areaUnit: areaUnit !== undefined ? areaUnit : existingProperty.areaUnit,
        shortDescription: shortDescription !== undefined ? shortDescription : existingProperty.shortDescription,
        description: description !== undefined ? description : existingProperty.description,
        status: status !== undefined ? status : existingProperty.status,
        isFeatured: isFeatured !== undefined ? Boolean(isFeatured) : existingProperty.isFeatured,
        videoUrl: videoUrl !== undefined ? videoUrl : existingProperty.videoUrl,
        virtualTourUrl: virtualTourUrl !== undefined ? virtualTourUrl : existingProperty.virtualTourUrl,
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
        images: { orderBy: { sortOrder: 'asc' } },
        features: true,
      },
    });

    return NextResponse.json(updatedProperty);
  } catch (error) {
    console.error('Error updating property:', error);
    return NextResponse.json({ error: 'Failed to update property' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const admin = await getAdminFromCookies();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    const existing = await prisma.property.findUnique({ where: { id } });

    if (!existing) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }

    await prisma.property.delete({ where: { id } });
    return NextResponse.json({ success: true, message: 'Property deleted successfully' });
  } catch (error) {
    console.error('Error deleting property:', error);
    return NextResponse.json({ error: 'Failed to delete property' }, { status: 500 });
  }
}
