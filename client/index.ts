import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../server/index';

const trpc = createTRPCProxyClient<AppRouter>({
    links: [
        httpBatchLink({
            url: 'http://localhost:3000',
        }),
    ],
});

async function main() {
    const users = await trpc.userList.query();
    console.log('Listing users...');
    console.table(users);

    const createdUser = await trpc.userCreate.mutate({ name: 'Person One'});

    console.warn(`Created user: ${JSON.stringify(createdUser)}`);

    const user = await trpc.userById.query('1');

    console.warn(`User 1: ${JSON.stringify(user)}`);

    const users2 = await trpc.userList.query();
    console.log('Listing users...');
    console.table(users2);
}

main().catch(console.error);

