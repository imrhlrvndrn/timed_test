import axios from '.';

export const createTest = async ({ test, testset }: TNewTestApiRequest) =>
    (await axios.post<TNewTestApiResponse>(`/api/create-test`, { test, testset })).data;

export const addQuestionToTestset = async ({ setId, questions }: TAddQuestionRequest) =>
    (await axios.post(`/api/add-question?setId=${setId}`, { questions })).data;

export const getTestsetById = async (setId: number) =>
    !isNaN(setId) && (await axios.get(`/api/testset?setId=${setId}`)).data;

export const getAllTests = async () => (await axios.get('/api/tests')).data;
