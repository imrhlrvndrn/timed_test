interface TestQuestion {
    id?: number;
    title: string;
    description?: string;
    options: TestOption[];
    solution: string;
}

interface TestOption {
    id?: number;
    content: string;
}

interface TestSet {
    id?: number;
    duration: number;
    title: string;
    questions: TestQuestion[];
}
