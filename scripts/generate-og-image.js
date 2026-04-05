import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';
import { statSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateOGImage() {
  const width = 1200;
  const height = 630;
  const outputPath = path.resolve(__dirname, '..', 'public', 'og-image.png');

  // Create SVG with gradient background and text
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#1E3A8A;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#0F172A;stop-opacity:1" />
        </linearGradient>
        <!-- Decorative circles gradient -->
        <radialGradient id="glow1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style="stop-color:#3B82F6;stop-opacity:0.3" />
          <stop offset="100%" style="stop-color:#3B82F6;stop-opacity:0" />
        </radialGradient>
        <radialGradient id="glow2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style="stop-color:#8B5CF6;stop-opacity:0.2" />
          <stop offset="100%" style="stop-color:#8B5CF6;stop-opacity:0" />
        </radialGradient>
      </defs>

      <!-- Background gradient -->
      <rect width="${width}" height="${height}" fill="url(#bg)" />

      <!-- Decorative glow circles -->
      <circle cx="200" cy="150" r="300" fill="url(#glow1)" />
      <circle cx="1000" cy="500" r="350" fill="url(#glow2)" />

      <!-- Subtle grid pattern -->
      <g opacity="0.05">
        <line x1="0" y1="0" x2="${width}" y2="${height}" stroke="white" stroke-width="0.5" />
        <line x1="${width}" y1="0" x2="0" y2="${height}" stroke="white" stroke-width="0.5" />
        <line x1="600" y1="0" x2="600" y2="${height}" stroke="white" stroke-width="0.5" />
        <line x1="0" y1="315" x2="${width}" y2="315" stroke="white" stroke-width="0.5" />
      </g>

      <!-- Top accent line -->
      <rect x="0" y="0" width="${width}" height="4" fill="#3B82F6" />

      <!-- AI icon / decorative element -->
      <g transform="translate(540, 140)">
        <rect x="0" y="0" width="120" height="120" rx="24" fill="none" stroke="#3B82F6" stroke-width="3" opacity="0.8" />
        <text x="60" y="80" font-family="Arial, Helvetica, sans-serif" font-size="56" font-weight="bold" fill="#60A5FA" text-anchor="middle">AI</text>
      </g>

      <!-- Main title -->
      <text x="600" y="340" font-family="Arial, Helvetica, sans-serif" font-size="64" font-weight="bold" fill="white" text-anchor="middle" letter-spacing="2">
        DreamIT AI Hub
      </text>

      <!-- Divider line -->
      <rect x="450" y="365" width="300" height="2" rx="1" fill="#3B82F6" opacity="0.8" />

      <!-- Subtitle -->
      <text x="600" y="420" font-family="Arial, Helvetica, sans-serif" font-size="28" fill="#CBD5E1" text-anchor="middle">
        AI &#xC804;&#xBB38; &#xD559;&#xC2B5;&#xC0AC;&#xC774;&#xD2B8; &#xD5C8;&#xBE0C; | 11&#xAC1C; AI &#xD559;&#xC2B5; &#xD50C;&#xB7AB;&#xD3FC;
      </text>

      <!-- Bottom accent -->
      <rect x="0" y="${height - 4}" width="${width}" height="4" fill="#3B82F6" />

      <!-- dreamit.or.kr watermark -->
      <text x="600" y="560" font-family="Arial, Helvetica, sans-serif" font-size="18" fill="#64748B" text-anchor="middle" letter-spacing="3">
        dreamit.or.kr
      </text>
    </svg>
  `;

  try {
    await sharp(Buffer.from(svg))
      .png()
      .toFile(outputPath);

    console.log('OG image generated successfully!');
    console.log('Output:', outputPath);

    // Verify file
    const stats = statSync(outputPath);
    console.log('File size:', (stats.size / 1024).toFixed(1), 'KB');
  } catch (err) {
    console.error('Error generating OG image:', err);
    process.exit(1);
  }
}

generateOGImage();
