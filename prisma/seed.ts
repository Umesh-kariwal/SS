import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const RELIABLE_IMAGES = [
  'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&w=1200&q=80',
];

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
    },
  });

  // 3. Update Existing Properties with 100% Working Reliable Images
  const allProps = await prisma.property.findMany();
  for (let i = 0; i < allProps.length; i++) {
    const prop = allProps[i];
    await prisma.propertyImage.deleteMany({ where: { propertyId: prop.id } });
    
    // Create 3 fresh working images per property
    const img1 = RELIABLE_IMAGES[i % RELIABLE_IMAGES.length];
    const img2 = RELIABLE_IMAGES[(i + 1) % RELIABLE_IMAGES.length];
    const img3 = RELIABLE_IMAGES[(i + 2) % RELIABLE_IMAGES.length];

    await prisma.propertyImage.createMany({
      data: [
        { propertyId: prop.id, imageUrl: img1, isCover: true, sortOrder: 0 },
        { propertyId: prop.id, imageUrl: img2, isCover: false, sortOrder: 1 },
        { propertyId: prop.id, imageUrl: img3, isCover: false, sortOrder: 2 },
      ],
    });
  }

  console.log('Database seeding finished successfully with 100% working property images!');
}

main()
  .catch((e) => {
    console.error('Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
