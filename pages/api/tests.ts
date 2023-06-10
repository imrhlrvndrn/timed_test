// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '~/lib/prisma/client';

export default async function createNewTest(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const { test, testset } = req.body;

        // * Same query in prisma.<table>.create()
        const tests = await prisma.test.findMany({
            select: {
                id: true,
                title: true,
                description: true,
                testSets: { select: { id: true, title: true } },
            },
        });

        // res.status(200);
        res.status(200).json({
            tests: tests?.map((test) => ({
                ...test,
                id: Number(test.id),
                testSets: test.testSets?.map((set) => ({ ...set, id: Number(set.id) })),
            })),
        });
    }
}
