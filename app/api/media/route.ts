import { NextResponse } from 'next/server';
import { getAdminFromCookies } from '@/lib/auth';
import { readdir, stat } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const admin = await getAdminFromCookies();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const uploadDir = join(process.cwd(), 'public', 'uploads');

    if (!existsSync(uploadDir)) {
      return NextResponse.json([]);
    }

    const files = await readdir(uploadDir);
    const mediaItems = [];

    for (const fileName of files) {
      if (fileName.startsWith('.')) continue;

      const filePath = join(uploadDir, fileName);
      const fileStat = await stat(filePath);

      if (fileStat.isFile()) {
        mediaItems.push({
          name: fileName,
          url: `/uploads/${fileName}`,
          size: fileStat.size,
          createdAt: fileStat.birthtime,
        });
      }
    }

    mediaItems.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json(mediaItems);
  } catch (error) {
    console.error('Error fetching media:', error);
    return NextResponse.json({ error: 'Failed to fetch media' }, { status: 500 });
  }
}
