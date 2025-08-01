import { createClient } from 'redis';

const client = createClient({
    username: 'default',
    password: 'dbC4gkYm8PKJzFa2Yg3UD76cy7eQ6NhZ',
    socket: {
        host: 'redis-13027.c264.ap-south-1-1.ec2.redns.redis-cloud.com',
        port: 13027
    }
});

client.on('error', err => console.error('Redis Client Error', err));
await client.connect();

function randomString(size = 10240) { // 10KB
  return Array.from({ length: size }, () => Math.random().toString(36)[2]).join('');
}

const batchSize = 100; // insert 100 keys at a time
const totalKeys = 100000; // 100,000 × 10KB = ~1GB

console.log(`🚀 Starting to insert ${totalKeys} keys (~1GB)`);

for (let i = 0; i < totalKeys; i += batchSize) {
  const pipeline = client.multi();
  for (let j = 0; j < batchSize; j++) {
    const keyNum = i + j;
    const key = `test:key:${keyNum}`;
    const value = JSON.stringify({
      id: keyNum,
      content: randomString(10240), // 10KB
    });
    pipeline.set(key, value);
  }

  await pipeline.exec();
  if (i % 1000 === 0) console.log(`✅ ${i} keys written`);
}

console.log('🎉 Done filling Redis with ~1GB data!');
await client.quit();
