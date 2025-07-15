const http = require('http');

const endpoints = [
  { method: 'GET', path: '/api/health', description: 'Health Check' },
  { method: 'GET', path: '/api/dashboard/stats', description: 'Dashboard Stats' },
  { method: 'GET', path: '/api/projects', description: 'Get Projects' },
  { method: 'GET', path: '/api/skills', description: 'Get Skills' },
  { method: 'GET', path: '/api/experiences', description: 'Get Experiences' },
  { method: 'GET', path: '/api/biodata', description: 'Get Biodata' },
  { method: 'GET', path: '/api/contact', description: 'Get Contacts' },
  { method: 'GET', path: '/api/contact/stats', description: 'Contact Stats' }
];

async function testEndpoint(method, path) {
  return new Promise((resolve) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: path,
      method: method
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          success: res.statusCode >= 200 && res.statusCode < 300
        });
      });
    });

    req.on('error', () => {
      resolve({ status: 'ERROR', success: false });
    });

    req.setTimeout(5000, () => {
      req.destroy();
      resolve({ status: 'TIMEOUT', success: false });
    });

    req.end();
  });
}

async function runTests() {
  console.log('🚀 Testing Portfolio Backend API Integration...');
  console.log('================================================');
  
  let passed = 0;
  let failed = 0;

  for (const endpoint of endpoints) {
    process.stdout.write(`Testing ${endpoint.description.padEnd(20)} ... `);
    
    const result = await testEndpoint(endpoint.method, endpoint.path);
    
    if (result.success) {
      console.log(`✅ PASS (${result.status})`);
      passed++;
    } else {
      console.log(`❌ FAIL (${result.status})`);
      failed++;
    }
  }

  console.log('================================================');
  console.log(`📊 Test Results: ${passed} passed, ${failed} failed`);
  
  if (failed === 0) {
    console.log('🎉 All API endpoints are working correctly!');
    console.log('✅ Frontend-Backend integration is successful!');
  } else {
    console.log('⚠️  Some endpoints failed. Check server logs.');
  }
  
  console.log('================================================');
}

runTests();
