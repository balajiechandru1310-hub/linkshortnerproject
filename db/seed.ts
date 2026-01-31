import 'dotenv/config';
import { db } from './index';
import { links } from './schema';

async function seed() {
    const userId = 'user_390eFw3JodbqaczEQhlnljaZWk9';

    const sampleLinks = [
        {
            id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
            userId,
            url: 'https://www.github.com/trending',
            shortCode: 'gh-trend',
            title: 'GitHub Trending Repositories',
            clicks: 42,
        },
        {
            id: 'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
            userId,
            url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            shortCode: 'yt-music',
            title: 'Awesome Music Video',
            clicks: 156,
        },
        {
            id: 'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a33',
            userId,
            url: 'https://www.reddit.com/r/programming',
            shortCode: 'r-prog',
            title: 'Programming Subreddit',
            clicks: 89,
        },
        {
            id: 'd3eebc99-9c0b-4ef8-bb6d-6bb9bd380a44',
            userId,
            url: 'https://stackoverflow.com/questions/tagged/typescript',
            shortCode: 'so-ts',
            title: 'TypeScript Questions on Stack Overflow',
            clicks: 234,
        },
        {
            id: 'e4eebc99-9c0b-4ef8-bb6d-6bb9bd380a55',
            userId,
            url: 'https://www.linkedin.com/jobs/software-engineer-jobs',
            shortCode: 'li-jobs',
            title: 'Software Engineer Jobs',
            clicks: 67,
        },
        {
            id: 'f5eebc99-9c0b-4ef8-bb6d-6bb9bd380a66',
            userId,
            url: 'https://dev.to/t/javascript',
            shortCode: 'dev-js',
            title: 'JavaScript Articles on DEV',
            clicks: 123,
        },
        {
            id: '06eebc99-9c0b-4ef8-bb6d-6bb9bd380a77',
            userId,
            url: 'https://www.npmjs.com/package/react',
            shortCode: 'npm-react',
            title: 'React on NPM',
            clicks: 178,
        },
        {
            id: '17eebc99-9c0b-4ef8-bb6d-6bb9bd380a88',
            userId,
            url: 'https://vercel.com/docs',
            shortCode: 'v-docs',
            title: 'Vercel Documentation',
            clicks: 45,
        },
        {
            id: '28eebc99-9c0b-4ef8-bb6d-6bb9bd380a99',
            userId,
            url: 'https://www.typescriptlang.org/docs/',
            shortCode: 'ts-docs',
            title: 'TypeScript Official Docs',
            clicks: 201,
        },
        {
            id: '39eebc99-9c0b-4ef8-bb6d-6bb9bd380aaa',
            userId,
            url: 'https://nextjs.org/docs',
            shortCode: 'next-docs',
            title: 'Next.js Documentation',
            clicks: 312,
        },
    ];

    try {
        console.log('Seeding database with 10 sample links...');

        const inserted = await db.insert(links).values(sampleLinks).returning();

        console.log(`✅ Successfully inserted ${inserted.length} sample links`);
        console.log('\nInserted records:');
        inserted.forEach((link, index) => {
            console.log(`${index + 1}. ${link.title} (${link.shortCode}) - ${link.clicks} clicks`);
        });
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        throw error;
    }
}

seed()
    .then(() => {
        console.log('\n✅ Seeding completed successfully');
        process.exit(0);
    })
    .catch((error) => {
        console.error('\n❌ Seeding failed:', error);
        process.exit(1);
    });
