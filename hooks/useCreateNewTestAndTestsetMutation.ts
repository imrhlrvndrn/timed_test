import { useMutation, useQuery } from '@tanstack/react-query';
import { createTest } from '~/lib/axios/test.requests';

export const useCreateNewTestAndTestsetMutation = ({ test, testset }: TNewTestApiRequest) => {
    const { mutate, data } = useMutation({
        mutationFn: async () => await createTest({ test, testset }),
        mutationKey: ['TEST'],
    });

    return { createNewTestMutation: mutate, testData: data };
};
