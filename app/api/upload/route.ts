import { NextResponse } from 'next/server';
import { getAdminFromCookies } from '../../../lib/auth';
import { isCloudinaryConfigured, uploadToCloudinary } from '../../../lib/cloudinary';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function POST(request: Request) {
  try {
    const admin = await getAdminFromCookies();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // If Cloudinary is configured (Production / Cloud), upload to Cloudinary CDN
    if (isCloudinaryConfigured) {
      try {
        const secureUrl = await uploadToCloudinary(buffer, 'ss_properties');
        return NextResponse.json({
          url: secureUrl,
          provider: 'cloudinary',
          success: true,
        });
      } catch (cloudErr: any) {
        console.error('Cloudinary upload error, falling back to local:', cloudErr);
      }
    }

    // Local fallback for offline dev environment
    const uploadDir = join(process.cwd(), 'public', 'uploads');
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    const timestamp = Date.now();
    const sanitizedFilename = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${timestamp}_${sanitizedFilename}`;
    const filePath = join(uploadDir, filename);

    await writeFile(filePath, buffer);

    const publicUrl = `/uploads/${filename}`;
    return NextResponse.json({
      url: publicUrl,
      provider: 'local',
      success: true,
    });
  } catch (error: any) {
    console.error('Upload Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to upload image' }, { status: 500 });
  }
}
