import { createContext, useContext, useState } from 'react';
import { ResultQuestionMapping } from '~/pages/api/results';

type TTimedTestContextValue = {
    test: ITimedTest;
    updateScore: (questionId: number, answer: string) => void;
    setAnswer: (answer: string | null) => void;
    startTest: (test: ITimedTest) => void;
    saveUsername: (name: string) => void;
};

const TimedTestContext = createContext({} as TTimedTestContextValue);

export const useTimedTest = () => {
    const context = useContext(TimedTestContext);
    if (context === undefined) {
        throw new Error('useTimedTest must be used within a TimedTestProvider');
    }
    return context;
};

const initialState: ITimedTest = {
    title: '',
    description: '',
    set: {
        duration: 0,
        title: '',
        questions: [{ title: '', solution: '', id: 0, options: [{ content: '' }] }],
    },
    fullName: '',
    answer: null,
    score: {},
};

export type ITimedTest = {
    title: string;
    description?: string;
    set: TestSet | TestSet[];
    answer: string | null;
    score: ResultQuestionMapping;
    fullName: string;
};

export const TimedTestProvider = ({ children }: { children: React.ReactNode }) => {
    const [test, setTest] = useState(initialState);

    const updateScore = (questionId: number, answer: string) => {
        let isCorrect = false,
            question: TestQuestion | undefined;

        if (!(test.set instanceof Array)) {
            question = test?.set?.questions?.find((question) => question?.id === questionId);
            if (!question) throw new Error('Invalid questionId');

            if (question?.solution === answer) isCorrect = true;

            // Build an object of all the questions that were answered correctly
            setTest((prevState) => ({
                ...prevState,
                answer,
                score: {
                    ...prevState.score,
                    [questionId]: {
                        isCorrect,
                        question: question?.title ?? '',
                        answer: answer ?? '',
                        solution: question?.solution ?? '',
                    },
                },
            }));
            // Set the answer to null. Avoiding any clashes with the next question
        }
    };

    const startTest = (test: ITimedTest) => {
        setTest(() => test);
    };

    const setAnswer = (answer: string | null) => {
        setTest((prevState) => ({ ...prevState, answer }));
    };

    const saveUsername = (name: string) => {
        setTest((prevState) => ({ ...prevState, fullName: name }));
    };

    return (
        <TimedTestContext.Provider
            value={{ test, updateScore, startTest, setAnswer, saveUsername }}
        >
            {children}
        </TimedTestContext.Provider>
    );
};