// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '~/lib/prisma/client';

export default async function testset(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        let { setId } = req.query;
        const testsetId: number = Number(setId);

        try {
            if (testsetId) {
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

                return res.status(200).json({
                    testset: {
                        ...queriedTestset,
                        id: Number(queriedTestset?.id),
                    },
                });
            }

            // const allTestsets = await prisma.testset.findMany({
            //     where:{id: test}
            // })
        } catch (error) {
            console.error(error);
            res.status(500);
        }
    }

    // Create a testset row & return id
    if (req.method === 'POST') {
        const { id } = req.query;
        const { title, duration } = req.body;
        const testId = Number(id);

        if (isNaN(testId)) return res.status(400).json({ message: 'Invalid test id' });
        if (duration && isNaN(Number(duration)))
            return res.status(400).json({ message: 'Invalid duration' });

        if (!title)
            return res.status(400).json({ message: 'Please enter a title for the testset' });

        const newTestset = await prisma.testset.create({
            data: {
                title,
                testId,
                duration: duration ?? 5,
            },
            select: { id: true },
        });

        return res.status(201).json({ testset: { ...newTestset, id: Number(newTestset.id) } });
    }
}
