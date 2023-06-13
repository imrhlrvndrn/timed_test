// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '~/lib/prisma/client';

export default async function createNewTest(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { setId } = req.query; // /api/add-question?setId=1
        const { questions } = req.body;

        const testSetId = Number(setId);
        if (typeof testSetId !== 'number')
            return res.status(400).json({ message: 'Invalid testset id' });

        try {
            for (let question of questions) {
                await prisma.question.create({
                    data: {
                        testsetId: Number(setId),
                        title: question.title,
                        description: question.description ?? '',
                        solution: question.solution,
                        options: {
                            createMany: {
                                data: question?.options?.map((option: any) => ({
                                    content: option.content,
                                })),
                            },
                        },
                    },
                    select: { id: true },
                });
            }

            return res.status(201).json({ message: 'Added questions to the testset' });
        } catch (error) {
            console.error(error);
            res.status(500);
        }
    }
}
