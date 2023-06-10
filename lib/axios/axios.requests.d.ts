type TNewTestApiRequest = {
    test: { title: string; description: string };
    testset: { title: string };
};

type TNewTestApiResponse = { setId: number };

type TAddQuestionRequest = {
    setId: number;
    questions: TestQuestion[];
};

// type TAddQuestionResponse = {

// }
