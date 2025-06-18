import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif',
  'image/gif',
];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('coverImage') as File | null;
    const userId = formData.get('userId') as string | null;

    // Validate inputs
    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    if (!userId || typeof userId !== 'string') {
      return NextResponse.json(
        { error: 'Valid user ID required' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        { 
          error: 'Invalid file type',
          allowedTypes: ALLOWED_MIME_TYPES.map(t => t.replace('image/', ''))
        },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `File exceeds ${MAX_FILE_SIZE / 1024 / 1024}MB limit` },
        { status: 400 }
      );
    }

    // Process file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize filename
    const originalName = file.name.replace(/[^a-zA-Z0-9-_.]/g, '');
    const extension = originalName.split('.').pop() || 'jpg';
    const filename = `cover-${userId}-${uuidv4()}.${extension}`;
    const uploadDir = join(process.cwd(), 'public', 'uploads', 'covers');

    // Create directory if needed
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Save file
    const filePath = join(uploadDir, filename);
    await writeFile(filePath, buffer);

    // Return response
    return NextResponse.json({
      success: true,
      imageUrl: `/uploads/covers/${filename}`,
      fileName: originalName,
      fileSize: file.size,
      fileType: file.type,
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}