import { useQuery } from '@tanstack/react-query';
import axios from '~/lib/axios';
import { getAllTests, getTestsetById } from '~/lib/axios/test.requests';

export const useGetAllTests = () => {
    return useQuery({ queryFn: async () => await getAllTests(), queryKey: ['TEST'] });
};

export const useGetTestsetById = (setId: number) => {
    return useQuery({
        queryFn: async () => await getTestsetById(setId),
        queryKey: ['TESTSET', `${setId}`],
    });
};

export const useGetTestById = (id: number) => {
    return useQuery({
        queryFn: async () => (await axios.get(`/api/tests?id=${id}`)).data,
        queryKey: ['TEST', id],
    });
};

export const useGetResultById = (id: number) => {
    return useQuery({
        queryFn: async () => (await axios.get(`/api/results?id=${id}`)).data,
        queryKey: ['RESULTS', id],
    });
};
