const http = require('http');

async function askAI(prompt, history = []) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({ prompt, locale: "derja", history });
    const req = http.request({
      hostname: 'localhost',
      port: 3000,
      path: '/api/copilot',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const data = JSON.parse(body);
          resolve(data.result?.content || data);
        } catch(e) {
          resolve(body);
        }
      });
    });
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function run() {
  console.log("--- TEST 1: User asks: 'fama concours mouhandsin fi wizaret al ta3lim?' ---");
  const res1 = await askAI("fama concours mouhandsin fi wizaret al ta3lim?");
  console.log(res1);

  console.log("\n--- TEST 2: User asks: 'chnou' ---");
  const res2 = await askAI("chnou", [
    { role: 'user', content: 'fama concours mouhandsin fi wizaret al ta3lim?' },
    { role: 'assistant', content: res1 }
  ]);
  console.log(res2);
}

run();
