import { createClient } from 'redis';

const client = createClient({
    username: 'default',
    password: 'dbC4gkYm8PKJzFa2Yg3UD76cy7eQ6NhZ',
    socket: {
        host: 'redis-13027.c264.ap-south-1-1.ec2.redns.redis-cloud.com',
        port: 13027
    }
});

client.on('error', err => console.log('Redis Client Error', err));

await client.connect();

await client.set('foo', 'bar');
const result = await client.get('foo');
console.log(result)  // >>> bar

    