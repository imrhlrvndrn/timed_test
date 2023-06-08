import axios from '.';

export const createTest = async ({ test, testset }: TNewTestApiRequest) =>
    (await axios.post<TNewTestApiResponse>(`/api/create-test`, { test, testset })).data;
