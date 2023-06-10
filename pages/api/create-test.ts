// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '~/lib/prisma/client';

export default async function createNewTest(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { test, testset } = req.body;

        // * Same query in prisma.<table>.create()
        const createdTest = await prisma.test.create({
            data: {
                title: test.title,
                description: test.description,
                testSets: {
                    create: {
                        title: testset.title,
                    },
                },
            },
            select: {
                testSets: { select: { id: true } },
            },
        });

        // * Raw SQL attempt
        // if you'd to do it the raw SQL method you'll have to make 2 separate queries
        // to achieve the same results

        // ! The below code throws an error Raw query failed. Code: `42703`. Message: `column "testid" of relation "testset" does not exist`
        // ! But it clearly does exist 🤷🏻‍♂️
        // const createdTest: { id: number }[] = await prisma.$queryRaw`
        // INSERT INTO test (title, description)
        //     VALUES (${test.title}, ${test.description})
        //     RETURNING id
        // `;

        // const createdTestset = await prisma.$queryRaw`
        // INSERT INTO testset (title, testId)
        //         VALUES (${testset.title}, (SELECT id FROM test ORDER BY id DESC LIMIT 1))
        //         RETURNING title
        // `;

        // ! Won't work
        // await prisma.$transaction([
        //     prisma.$queryRaw`INSERT INTO test (title, description)
        //         VALUES (${test.title}, ${test.description})
        //         RETURNING title, description
        // `,
        //     prisma.$queryRaw`INSERT INTO testset (title)
        //         VALUES (${testset.title})
        //         RETURNING title
        // `,
        // ]);

        console.log('transaction data => ', createdTest);

        // res.status(200);
        // res.redirect(`/admin/new?testsetTitle=${createdTest.testSets[0]?.title}`);
        res.status(200).json({ setId: Number(createdTest.testSets[0]?.id) });
    }
}
