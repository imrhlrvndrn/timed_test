import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import axios from '~/lib/axios';
import { addQuestionToTestset, createTest } from '~/lib/axios/test.requests';
import { ResultQuestionMapping } from '~/pages/api/results';

export const useCreateNewTestAndTestsetMutation = () => {
    const router = useRouter();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ test, testset }: TNewTestApiRequest) =>
            await createTest({ test, testset }),
        mutationKey: ['TESTS'],
        onSuccess: (data) => {
            toast.success(`New test & a testset was created successfully 🔥`, { duration: 5000 });
            queryClient.invalidateQueries(['TEST', 'TEST.TESTSETS']);
            router.push(`/admin/new?setId=${data?.setId}`);
        },
    });
};

export const useAddQuestionToTestset = () => {
    const router = useRouter();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ setId, questions }: TAddQuestionRequest) =>
            await addQuestionToTestset({ setId, questions }),
        // mutationKey: ['TESTSETS', `${setId}`],
        onSuccess: () => {
            toast.success(`Add new questions to the testset!! 🎉`, { duration: 2000 });
            router.push(`/admin`);
        },
        onSettled: () => queryClient.invalidateQueries(['TESTS.TESTSETS']),
    });
};

export const useGenerateResult = () => {
    const router = useRouter();

    return useMutation({
        mutationFn: async ({
            testId,
            testsetId,
            score,
            fullName,
        }: {
            testId: number;
            testsetId: number;
            score: ResultQuestionMapping;
            fullName: string;
        }) =>
            (
                await axios.post(`/api/results?id=${testId}&setId=${testsetId}`, {
                    score,
                    fullName,
                })
            ).data,
        mutationKey: ['RESULTS'],
        onSuccess: (data) => {
            router.push(`/results?id=${data?.result?.id}`);
            toast.success('Submitted your test 🔥', { duration: 2000 });
        },
    });
};

export const useCreateTestset = () => {
    const router = useRouter();

    return useMutation({
        mutationFn: async ({ testId, title }: { testId: number; title: string }) =>
            (await axios.post(`/api/testsets?id=${testId}`, { title })).data,
        onSuccess: (data) => {
            router.push(`/admin/new?setId=${data?.id}`);
            toast.success('New test set was created 🔥', { duration: 2000 });
        },
    });
};
