// scripts/ensure-frames.js
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const framesDir = path.join(__dirname, '..', 'public', 'frames');
const zipPath = path.join(__dirname, '..', 'public', '150_frames_8K_JPEG.zip');
const totalFrames = 150;

function frameName(index) {
  return `frame_${String(index).padStart(3, '0')}.jpg`;
}

function ensureFrames() {
  const expectedFrames = Array.from({ length: totalFrames }, (_, index) =>
    path.join(framesDir, frameName(index + 1))
  );

  if (expectedFrames.every((file) => fs.existsSync(file))) {
    console.log('[Frames] All 150 frames (frame_001.jpg .. frame_150.jpg) are verified in public/frames.');
    return;
  }

  console.log('[Frames] Frames missing. Extracting from 150_frames_8K_JPEG.zip...');
  if (!fs.existsSync(framesDir)) {
    fs.mkdirSync(framesDir, { recursive: true });
  }

  if (process.platform === 'win32') {
    execSync(`powershell -Command "Expand-Archive -Path '${zipPath}' -DestinationPath '${framesDir}' -Force"`, {
      stdio: 'inherit',
    });
  } else {
    execSync(`unzip -o "${zipPath}" -d "${framesDir}"`, {
      stdio: 'inherit',
    });
  }
  console.log('[Frames] Extraction complete.');
}

ensureFrames();
