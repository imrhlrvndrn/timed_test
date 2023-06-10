import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import { addQuestionToTestset, createTest } from '~/lib/axios/test.requests';

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
            toast.success(`Add new testset questions!! 🎉`, { duration: 3000 });
            router.push(`/admin`);
        },
    onSettled: () => queryClient.invalidateQueries(['TESTS.TESTSETS']),
    });
};
