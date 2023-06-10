// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '~/lib/prisma/client';

export default async function createNewTest(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        let { setId } = req.query;
        const testsetId: number = Number(setId);

        try {
            if (typeof testsetId !== 'number') throw new Error('Invalid testset id');
            const queriedTestset = await prisma.testset.findUnique({
                where: { id: testsetId },
                select: {
                    id: true,
                    title: true,
                    // test: { select: { title: true, description: true } },
                    questions: {
                        select: {
                            title: true,
                            solution: true,
                            options: {
                                select: {
                                    content: true,
                                },
                            },
                        },
                    },
                },
            });

            res.status(200).json({
                testset: {
                    ...queriedTestset,
                    id: Number(queriedTestset?.id),
                },
            });
        } catch (error) {
            console.error(error);
            res.status(500);
        }
    }
}
