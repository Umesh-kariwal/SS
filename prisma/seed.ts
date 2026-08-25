import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Database for Sawriya Seth Properties (SS Properties)...');

  // 1. Admin User
  const adminEmail = 'khatik.raja93@gmail.com';
  const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } });

  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash('Ronak@9511397967', 10);
    await prisma.user.create({
      data: {
        name: 'Ronak Khatik',
        email: adminEmail,
        passwordHash,
        role: 'admin',
      },
    });
    console.log(`Created default admin user: ${adminEmail}`);
  }

  // 2. Default Website Settings
  await prisma.websiteSettings.upsert({
    where: { id: 'default' },
    update: {
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
      instagramUrl: 'https://www.instagram.com/ssproperties001?igsi=emJ4emtvenVieXJs',
    },
    create: {
      id: 'default',
      businessName: 'Sawriya Seth Properties (SS Properties)',
      ownerName: 'Ronak Khatik',
      phone: '9511397967',
      email: 'khatik.raja93@gmail.com',
      whatsapp: '9511397967',
      heroTitle: 'Find the Right Property. Build the Right Future.',
      heroSubtitle: 'Trusted local real estate consulting by Ronak Khatik across Debari, Nathdwara, Daroli, Navaniya, Dabok, and Mavli.',
      heroCtaText: 'Explore Properties',
      aboutHeading: 'Sawriya Seth Properties — Your Property Partner',
      aboutDescription: 'Sawriya Seth Properties (SS Properties), led by Ronak Khatik, provides transparent, expert real estate consultancy services specializing in residential plots, commercial land, agricultural parcels, and luxury properties across the Udaipur & Rajsamand region.',
      aboutPhotoUrl: '/uploads/ronak_khatik.jpg',
      footerText: 'Sawriya Seth Properties (SS Properties). All rights reserved.',
      instagramUrl: 'https://www.instagram.com/ssproperties001?igsi=emJ4emtvenVieXJs',
    },
  });

  // 3. Cohesive Property Multi-Photo Sets (Matching Images for Every Parcel)
  const propertiesData = [
    {
      title: 'Premium Highway Residential Plot',
      slug: 'premium-highway-residential-plot-debari',
      propertyType: 'Plot',
      location: 'Debari',
      address: 'Near Debari Bypass Highway, Debari, Udaipur, Rajasthan',
      price: 3500000,
      priceDisplay: '₹ 35 Lakhs',
      area: 2400,
      areaUnit: 'sq.ft',
      shortDescription: 'Prime 40x60 ft residential plot right off the national highway with 30ft wide internal road access.',
      description: 'An exceptional investment opportunity presented by Sawriya Seth Properties in Debari. This east-facing residential plot sits in a rapidly growing corridor near Debari bypass. Verified by Ronak Khatik with clear title registry, direct 30-foot wide asphalt road frontage, and immediate electrical line access.',
      status: 'Available',
      isFeatured: true,
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      features: ['Road Access', 'Corner Plot', 'Electricity Available', 'Water Line Connected', 'Clear Title Registry', 'Residential Area'],
      images: [
        'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      ],
    },
    {
      title: 'Temple Corridor Commercial Land',
      slug: 'temple-corridor-commercial-land-nathdwara',
      propertyType: 'Commercial',
      location: 'Nathdwara',
      address: 'Main Shrinathji Temple Highway Road, Nathdwara, Rajasthan',
      price: 9500000,
      priceDisplay: '₹ 95 Lakhs',
      area: 4500,
      areaUnit: 'sq.ft',
      shortDescription: 'High-footfall commercial plot ideal for hotel, guest house, or retail showroom project near Nathdwara.',
      description: 'Strategic commercial plot situated along the primary access route to Shrinathji Temple, Nathdwara. High tourist movement and continuous traffic make this parcel ideal for developing a boutique hotel, restaurant, or retail arcade. Fully verified title with complete Sub-Registrar documentation.',
      status: 'Available',
      isFeatured: true,
      features: ['Commercial Potential', 'Highway Frontage', 'Gated Area', 'Electricity Available', 'Corner Plot', 'High Footfall Zone'],
      images: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      ],
    },
    {
      title: 'Scenic Agricultural & Farmhouse Plot',
      slug: 'scenic-agricultural-farmhouse-plot-daroli',
      propertyType: 'Land',
      location: 'Daroli',
      address: 'Daroli Village Belt, Near Daroli Mines, Udaipur Region',
      price: 2800000,
      priceDisplay: '₹ 28 Lakhs',
      area: 2.5,
      areaUnit: 'Bigha',
      shortDescription: 'Fertile 2.5 Bigha agricultural parcel with tubewell water and serene countryside landscape.',
      description: 'Peaceful and fertile land parcel in Daroli. Equipped with active tubewell water pump, borewell connection, and electricity line. Soil is highly fertile and suitable for organic farming, fruit orchards, or building a private getaway weekend farmhouse.',
      status: 'Available',
      isFeatured: false,
      features: ['Tubewell Water', 'Electricity Line', 'Fertile Soil', 'Farmhouse Suitable', 'Peaceful Environs'],
      images: [
        'https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80',
      ],
    },
    {
      title: 'Airport Proximity Gated Residential Plot',
      slug: 'airport-proximity-gated-plot-dabok',
      propertyType: 'Plot',
      location: 'Dabok',
      address: 'Near Maharana Pratap Airport, Dabok, Udaipur, Rajasthan',
      price: 4800000,
      priceDisplay: '₹ 48 Lakhs',
      area: 3200,
      areaUnit: 'sq.ft',
      shortDescription: 'Modern gated township plot located 5 minutes from Dabok Airport with luxury amenities.',
      description: 'Situated inside a premium approved gated residential society in Dabok. Located just 5 minutes drive from Maharana Pratap Airport. The township includes paved wide roads, underground wiring, landscaped streetlights, 24/7 security guard, and water supply pipeline.',
      status: 'Available',
      isFeatured: true,
      features: ['Gated Township', 'Near Airport', 'Underground Wiring', 'Street Lighting', 'Security 24/7', 'Paved Roads'],
      images: [
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      ],
    },
    {
      title: 'Navaniya Township Corner Plot',
      slug: 'navaniya-township-corner-plot',
      propertyType: 'Plot',
      location: 'Navaniya',
      address: 'Central Circle, Navaniya, Udaipur Region, Rajasthan',
      price: 2200000,
      priceDisplay: '₹ 22 Lakhs',
      area: 1800,
      areaUnit: 'sq.ft',
      shortDescription: 'Affordable corner plot with double side road frontage in growing Navaniya residential sector.',
      description: 'Excellent budget-friendly residential option in Navaniya. Featuring dual 25ft and 30ft road access on both sides, allowing flexible architectural elevation.',
      status: 'Reserved',
      isFeatured: false,
      features: ['Corner Plot', 'Double Road', 'Clear Title', 'Immediate Registry', 'Water Supply'],
      images: [
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      ],
    },
    {
      title: 'Mavli Junction Commercial Warehouse Parcel',
      slug: 'mavli-junction-commercial-warehouse-parcel',
      propertyType: 'Commercial',
      location: 'Mavli',
      address: 'Mavli Railway Station Road, Mavli, Rajasthan',
      price: 12500000,
      priceDisplay: '₹ 1.25 Cr',
      area: 12000,
      areaUnit: 'sq.ft',
      shortDescription: 'Expansive 12,000 sq.ft commercial plot near Mavli Junction with heavy truck access.',
      description: 'Ideal logistics, cold storage, or industrial warehouse plot situated strategically close to Mavli Railway Junction and main state highway.',
      status: 'Available',
      isFeatured: false,
      features: ['Heavy Vehicle Access', 'Industrial Utility', '3-Phase Power', 'Railway Proximity', 'Level Plot'],
      images: [
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      ],
    },
  ];

  for (const prop of propertiesData) {
    let existing = await prisma.property.findUnique({ where: { slug: prop.slug } });
    if (!existing) {
      existing = await prisma.property.create({
        data: {
          title: prop.title,
          slug: prop.slug,
          propertyType: prop.propertyType,
          location: prop.location,
          address: prop.address,
          price: prop.price,
          priceDisplay: prop.priceDisplay,
          area: prop.area,
          areaUnit: prop.areaUnit,
          shortDescription: prop.shortDescription,
          description: prop.description,
          status: prop.status,
          isFeatured: prop.isFeatured,
          videoUrl: prop.videoUrl || null,
          features: {
            create: prop.features.map((f) => ({ feature: f })),
          },
        },
      });
    }

    // Replace images with cohesive matching photo sets
    await prisma.propertyImage.deleteMany({ where: { propertyId: existing.id } });
    await prisma.propertyImage.createMany({
      data: prop.images.map((imgUrl, idx) => ({
        propertyId: existing.id,
        imageUrl: imgUrl,
        isCover: idx === 0,
        sortOrder: idx,
      })),
    });
  }

  console.log('Database seeding finished successfully with cohesive property multi-photos!');
}

main()
  .catch((e) => {
    console.error('Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
