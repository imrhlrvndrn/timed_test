type TNewTestApiRequest = {
    test: { title: string; description: string };
    testset: { title: string };
};

type TNewTestApiResponse = { testset_title: string };
