// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '~/lib/prisma/client';

export type ResultQuestionMapping = {
    [key: number]: ResultScore;
};

export type ResultScore = {
    answer: string;
    solution: string;
    isCorrect: boolean;
    question: string;
};

export default async function results(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        let { id } = req.query;
        const resultId: number = Number(id);
        if (isNaN(resultId)) return res.status(400).json({ message: 'invalid result id' });

        try {
            if (typeof resultId !== 'number') throw new Error('Invalid testset id');
            const queriedResult = await prisma.result.findUnique({
                where: { id: resultId },
                select: {
                    id: true,
                    fullName: true,
                    score: true,
                    questions: true,
                },
            });

            res.status(200).json({
                result: {
                    ...queriedResult,
                    id: Number(queriedResult?.id),
                },
            });
        } catch (error) {
            console.error(error);
            res.status(500);
        }
    }

    if (req.method === 'POST') {
        const { id, setId } = req.query;
        const { score, fullName } = req.body;
        let testId = Number(id),
            testsetId = Number(setId),
            mappedScore: ResultQuestionMapping = score;

        if (!fullName || fullName.length === 0)
            return res
                .status(400)
                .json({ message: 'Please enter your name before starting the test' });
        if (isNaN(testId)) return res.status(400).json({ message: 'Invalid test id' });
        if (isNaN(testsetId)) return res.status(400).json({ message: 'Invalid testset id' });

        const scoreValues: ResultScore[] = Object.values(mappedScore);
        const calculatedScore = scoreValues.reduce((acc, cur) => {
            if (cur.isCorrect) return acc + 1;

            return acc;
        }, 0);

        const generatedResult = await prisma.result.create({
            data: {
                testsetId,
                testId,
                score: calculatedScore,
                fullName,
                questions: score,
            },
            select: { id: true },
        });

        return res.status(200).json({
            message: `Everything seems fine! ${fullName}'s score is (${calculatedScore}/${scoreValues?.length})`,
            result: {
                ...generatedResult,
                id: Number(generatedResult.id),
            },
        });
    }
}
