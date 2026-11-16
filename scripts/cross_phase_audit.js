// Cross-phase integration verification script for TripJugaadu
const http = require('http');

async function get(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, text: data });
        }
      });
    }).on('error', reject);
  });
}

async function runAudit() {
  console.log('🚀 RUNNING TRIPJUGAADU CROSS-PHASE INTEGRATION AUDIT...\n');
  const results = {};

  // 1. Phase 0 + Phase 2/3 Data Integrity
  try {
    const dest = await get('http://localhost:4000/api/v1/destinations');
    const adv = await get('http://localhost:4000/api/v1/adventures');
    const stays = await get('http://localhost:4000/api/v1/stays');
    const exp = await get('http://localhost:4000/api/v1/experiences');

    results.phase3Catalog = {
      destinations: dest.data?.count || 0,
      adventures: adv.data?.count || 0,
      stays: stays.data?.count || 0,
      experiences: exp.data?.count || 0,
      ok: dest.status === 200 && adv.status === 200 && stays.status === 200 && exp.status === 200
    };
    console.log('✅ Phase 3 Catalog: Destinations:', results.phase3Catalog.destinations, 'Adventures:', results.phase3Catalog.adventures, 'Stays:', results.phase3Catalog.stays, 'Experiences:', results.phase3Catalog.experiences);
  } catch (err) {
    console.error('❌ Phase 3 Catalog Error:', err.message);
  }

  // 2. Phase 3 Search Engine
  try {
    const searchRes = await get('http://localhost:4000/api/v1/search?query=Rishikesh');
    results.phase3Search = {
      status: searchRes.status,
      count: searchRes.data?.count || 0,
      ok: searchRes.status === 200 && (searchRes.data?.count || 0) > 0
    };
    console.log('✅ Phase 3 Search Engine: query "Rishikesh" ->', results.phase3Search.count, 'results');
  } catch (err) {
    console.error('❌ Phase 3 Search Error:', err.message);
  }

  // 3. Phase 4 Provider & Admin Marketplace Operations
  try {
    const adminDash = await get('http://localhost:4000/api/v1/admin/dashboard');
    const auditLogs = await get('http://localhost:4000/api/v1/admin/audit-logs');
    results.phase4Operations = {
      adminStatus: adminDash.status,
      metrics: adminDash.data?.data?.metrics || adminDash.data?.data,
      auditLogsCount: auditLogs.data?.data?.length || 0,
      ok: adminDash.status === 200 && auditLogs.status === 200
    };
    console.log('✅ Phase 4 Admin & Operations: Status =', adminDash.status, '| Audit Logs count =', results.phase4Operations.auditLogsCount);
  } catch (err) {
    console.error('❌ Phase 4 Operations Error:', err.message);
  }

  console.log('📊 AUDIT SUMMARY STATUS:');
  console.log(JSON.stringify(results, null, 2));
  console.log('=======================================');
}

runAudit();
