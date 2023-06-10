interface TestQuestion {
    title: string;
    description?: string;
    options: TestOption[];
    solution: string;
}

interface TestOption {
    content: string;
}

interface TestQuestionResponse extends TestQuestion {
    id: number;
}

interface TestOptionResponse extends TestQuestion {
    id: number;
}
