// Full-colour dithered portrait (Atkinson error diffusion per RGB channel).
// Edit the values below, then run: bun scripts/create-portrait-color.ts
import sharp from 'sharp';
import { join } from 'node:path';

const PHOTO = 'temp/Profile.jpeg';

// Pixels in the ORIGINAL photo (1130x1280). Keep it square.
const CROP = { left: 60, top: 120, size: 900 }; // smaller size = zoom in

const SIZE = 192;   // dither resolution; higher = finer detail
const SCALE = 3;    // output is SIZE * SCALE pixels
const LEVELS = 4;   // shades per colour channel: 2 = 8 colours (harsh), 4 = 64, 6 = 216 (subtle)

const { data } = await sharp(PHOTO)
  .rotate()
  .extract({ left: CROP.left, top: CROP.top, width: CROP.size, height: CROP.size })
  .resize(SIZE, SIZE)
  .removeAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const NEIGHBORS = [[1, 0], [2, 0], [-1, 1], [0, 1], [1, 1], [0, 2]];
const values = Float32Array.from(data);
const out = new Uint8Array(SIZE * SIZE * 3);
const step = 255 / (LEVELS - 1);

for (let y = 0; y < SIZE; y++) {
  for (let x = 0; x < SIZE; x++) {
    for (let c = 0; c < 3; c++) {
      const i = (y * SIZE + x) * 3 + c;
      const old = Math.min(255, Math.max(0, values[i]));
      const quant = Math.round(old / step) * step;
      out[i] = quant;
      const error = (old - quant) / 8;
      for (const [dx, dy] of NEIGHBORS) {
        const nx = x + dx, ny = y + dy;
        if (nx >= 0 && nx < SIZE && ny < SIZE) values[(ny * SIZE + nx) * 3 + c] += error;
      }
    }
  }
}

const file = join(import.meta.dir, '..', 'public', 'portrait-color.webp');
await sharp(out, { raw: { width: SIZE, height: SIZE, channels: 3 } })
  .resize(SIZE * SCALE, SIZE * SCALE, { kernel: 'nearest' })
  .webp({ lossless: true })
  .toFile(file);
console.log('Created public/portrait-color.webp');
