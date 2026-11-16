// scripts/verify_hero_animation.js
const fs = require('fs');
const path = require('path');
const http = require('http');

function fetchStatus(urlPath) {
  return new Promise((resolve) => {
    http.get('http://localhost:3000' + urlPath, (res) => {
      resolve({ status: res.statusCode, headers: res.headers });
    }).on('error', (err) => {
      resolve({ status: 500, error: err.message });
    });
  });
}

function fetchBody(urlPath) {
  return new Promise((resolve) => {
    http.get('http://localhost:3000' + urlPath, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    }).on('error', (err) => {
      resolve({ status: 500, error: err.message, body: '' });
    });
  });
}

async function runAudit() {
  console.log('============================================================');
  console.log('CINEMATIC HERO SCROLL ANIMATION — ACCEPTANCE CRITERIA AUDIT');
  console.log('============================================================\n');

  let passed = 0;
  let total = 0;

  function assert(condition, message) {
    total++;
    if (condition) {
      console.log(`[PASS] ${message}`);
      passed++;
    } else {
      console.error(`[FAIL] ${message}`);
    }
  }

  // 1. Files & Directory Verification
  const framesDir = path.join(__dirname, '..', 'public', 'frames');
  const frameFiles = fs.readdirSync(framesDir).filter(f => f.endsWith('.jpg'));
  assert(frameFiles.length >= 150, `High-definition frame files in public/frames/ (found ${frameFiles.length})`);
  assert(fs.existsSync(path.join(framesDir, 'frame_001.jpg')), 'Frame 001 exists');
  assert(fs.existsSync(path.join(framesDir, 'frame_150.jpg')), 'Frame 150 exists');

  // 2. Check HTTP Serving of Frames
  const frame001 = await fetchStatus('/frames/frame_001.jpg');
  const frame150 = await fetchStatus('/frames/frame_150.jpg');
  assert(frame001.status === 200, 'Frame 001 asset serves HTTP 200');
  assert(frame150.status === 200, 'Frame 150 asset serves HTTP 200');

  // 3. Check Homepage HTML
  const home = await fetchBody('/');
  assert(home.status === 200, 'Homepage returns HTTP 200');
  assert(home.body.includes('<canvas'), 'Homepage includes HTML5 <canvas>');
  assert(home.body.includes('TripJugaadu Presents'), 'Homepage preserves "TripJugaadu Presents" text');
  assert(home.body.includes('Your Next') && home.body.includes('Adventure') && home.body.includes('Starts Here'), 'Homepage preserves "Your Next Adventure Starts Here" heading');
  assert(home.body.includes('Explore India'), 'Homepage preserves "Explore India" action');
  assert(home.body.includes('search-panel'), 'Homepage preserves SearchPanel UI in hero');

  // 4. Code Quality & Requirements Verification in CinematicHeroCanvas.tsx
  const canvasCode = fs.readFileSync(path.join(__dirname, '..', 'src', 'components', 'CinematicHeroCanvas.tsx'), 'utf8');
  assert(canvasCode.includes('TOTAL_FRAMES = 150'), 'TOTAL_FRAMES = 150 configured');
  assert(canvasCode.includes('requestAnimationFrame'), 'Uses requestAnimationFrame');
  assert(canvasCode.includes('LERP_FACTOR') || canvasCode.includes('lerp'), 'Uses lerp interpolation');
  assert(canvasCode.includes('prefers-reduced-motion'), 'Respects prefers-reduced-motion');
  assert(canvasCode.includes('devicePixelRatio'), 'Accounts for Retina / DPR screens');
  assert(canvasCode.includes('getClosestLoadedFrame') || canvasCode.includes('getClosestLoadedImage'), 'Implements nearest-loaded-frame fallback');
  assert(canvasCode.includes('Math.max(canvasWidth / imageWidth, canvasHeight / imageHeight)'), 'Implements cover-style scaling algorithm');

  // 5. CSS pointer-events
  const layoutCss = fs.readFileSync(path.join(__dirname, '..', 'src', 'styles', 'layout.css'), 'utf8');
  assert(layoutCss.includes('pointer-events: none'), 'Canvas surface has pointer-events: none in layout.css');

  // 6. Hero Scroll Track in page.tsx
  const pageCode = fs.readFileSync(path.join(__dirname, '..', 'src', 'app', 'page.tsx'), 'utf8');
  assert(pageCode.includes("height: '400vh'"), 'Hero section provides ~400vh scrollable distance');
  assert(pageCode.includes("position: 'sticky'") && pageCode.includes("height: '100vh'"), 'Hero section is sticky 100vh container');

  console.log('\n============================================================');
  console.log(`RESULTS: ${passed}/${total} AUDIT CHECKS PASSED (${Math.round((passed / total) * 100)}%)`);
  console.log('============================================================\n');

  if (passed === total) {
    process.exit(0);
  } else {
    process.exit(1);
  }
}

runAudit();
