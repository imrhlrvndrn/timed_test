import { z } from 'zod';

export const testWith = z.object({
    id: z.string(),
    user_id: z.string(),
    title: z.string().min(5),
    description: z.string().min(5),
    questions: z.array(
        z.object({
            id: z.string(),
            content: z.string().min(5),
            options: z.array(
                z.object({
                    id: z.string(),
                    content: z.string().min(5),
                })
            ),
        })
    ),
});

export const test_schema = z.object({
    id: z.string(),
    title: z.string().min(5),
    description: z.string().min(5),
});

type ITest = z.infer<typeof test_schema>;
