// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '~/lib/prisma/client';

export default async function createNewTest(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        // * Same query in supabase
        // const createdTest = await prisma.test.create({
        //     data: {
        //         title: 'React JS',
        //         description: 'This is an introductory ReactJS test',
        //     },
        //     select: { id: true, title: true, description: true, createdAt: true },
        // });
        const { test, testset } = req.body;

        const createdTest: { id: number; title: string; description: string }[] =
            await prisma.$queryRaw`
        INSERT INTO test (title, description)
            VALUES (${test.title}, ${test.description})
            RETURNING id, title, description;
        `;

        res.status(200).json({ ...createdTest[0], id: Number(createdTest[0]?.id) });
    }
}
