// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '~/lib/prisma/client';

export default async function createNewTest(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const { test, testset } = req.body;
        const { id } = req.query;
        const testId = Number(id);

        // if /api/tests?id=[number] exists then only that test will be returned
        if (testId) {
            if (isNaN(testId)) return res.status(400).json({ message: 'Invalid test id' });

            const test = await prisma.test.findUnique({
                where: { id: testId },
                select: {
                    id: true,
                    title: true,
                    description: true,
                    testSets: {
                        select: {
                            id: true,
                            title: true,
                            duration: true,
                            questions: {
                                select: {
                                    id: true,
                                    title: true,
                                    description: true,
                                    solution: true,
                                    options: {
                                        select: {
                                            id: true,
                                            content: true,
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            });
            if (!test) return res.status(404).json({ message: `Couldn't find the test` });

            return res.status(200).json({
                test: {
                    ...test,
                    id: Number(test.id),
                    testSets: test.testSets?.map((set) => ({
                        ...set,
                        id: Number(set.id),
                        questions: set.questions?.map((question) => ({
                            ...question,
                            id: Number(question.id),
                            options: question.options.map((option) => ({
                                ...option,
                                id: Number(option.id),
                            })),
                        })),
                    })),
                },
            });
        }

        // Fetch all the tests & return them
        // * Fetch all the tests created by the admin ( if auth is implemented )
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
