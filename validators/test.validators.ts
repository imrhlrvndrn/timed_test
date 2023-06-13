import { z } from 'zod';

// export const testWith = z.object({
//     id: z.string(),
//     user_id: z.string(),
//     title: z.string().min(5),
//     description: z.string().min(5),
//     questions: z.array(
//         z.object({
//             id: z.string(),
//             content: z.string().min(5),
//             options: z.array(
//                 z.object({
//                     id: z.string(),
//                     content: z.string().min(5),
//                 })
//             ),
//         })
//     ),
// });

export const newTestValidator = z.object({
    title: z
        .string()
        .nonempty('Test title is required')
        .min(3, 'Test title must be atleast 3 characters long'),
    description: z.string().optional(),
    testsetTitle: z
        .string()
        .nonempty('Testset title is required')
        .min(3, 'Testset title must be atleast 3 characters long'),
});

export const newTestsetValidator = z.object({
    title: z
        .string()
        .nonempty('Testset title is required')
        .min(3, 'Testset title must be atleast 3 characters long'),
    duration: z.string().nonempty('Testset duration is required'),
});

export const testQuestionValidator = z.object({
    questions: z.array(
        z.object({
            title: z.string().min(1),
            description: z.string().optional(),
            // solution: z.string().min(1),
            options: z.array(
                z.object({
                    content: z.string().min(1),
                })
            ),
        })
    ),
});

export type TestQuestion = z.infer<typeof testQuestionValidator>;

// type ITest = z.infer<typeof test_schema>;
