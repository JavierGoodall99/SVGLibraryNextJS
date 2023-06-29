import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface Icons {
  [key: string]: string;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const queryParams = url.searchParams;
  const iconName = queryParams.get('name');

  const iconsDir = path.join(process.cwd(), 'src', 'resources', 'icons');
  const iconFiles = fs.readdirSync(iconsDir);

  const icons: Icons = {};

  console.log(iconName);

  iconFiles.forEach((file) => {
    const iconName = file.replace('.svg', '');
    const iconPath = path.join(iconsDir, file);
    const iconContent = fs.readFileSync(iconPath, 'utf-8');
    icons[iconName] = iconContent;
  });

  if (iconName && typeof iconName === 'string' && icons[iconName]) {
    const responseJSON = JSON.stringify({ icon: icons[iconName] });
    return new Response(responseJSON, {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const responseJSON = JSON.stringify({ ...icons });
  return new Response(responseJSON, {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
