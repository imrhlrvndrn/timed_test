// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '~/lib/prisma/client';

export default async function createNewTest(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { setId } = req.query;
        const { questions } = req.body;

        const testSetId = Number(setId);

        // console.log('questions => ', questions);

        // * Same query in prisma.<table>.create()
        try {
            if (typeof testSetId !== 'number') throw new Error('Invalid testset id');

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
                });
            }

            return res.status(201).json({ message: 'Added questions to the testset' });
        } catch (error) {
            console.error(error);
            res.status(500);
        }

        // res.status(200).json({ setId: Number(addedQuestion?.id) });
    }
}
