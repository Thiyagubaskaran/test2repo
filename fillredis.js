import { createClient } from 'redis';

const client = createClient({
    username: 'default',
    password: 'dbC4gkYm8PKJzFa2Yg3UD76cy7eQ6NhZ',
    socket: {
        host: 'redis-13027.c264.ap-south-1-1.ec2.redns.redis-cloud.com',
        port: 13027
    }
});

client.on('error', (err) => console.error('Redis Error:', err));

await client.connect();

// 10KB JSON string
const sampleValue = JSON.stringify({
  name: 'thiyagu',
  description: 'X'.repeat(10240), // 10KB filler
});

let count = 0;
const maxKeys = 1000; // Adjust to hit ~10MB

for (let i = 0; i < maxKeys; i++) {
  const key = `test:key2232:${i}`;
  await client.set(key, sampleValue);
  count++;
  if (i % 100 === 0) console.log(`${count} keys written`);
}

console.log(`✅ Done writing ${count} keys`);
await client.quit();
