'use client';

import { FC, useState } from 'react';
import { useTimedTest } from '../Providers/TimedTestProvider';

export const MultistepQuestion: FC<{ question: TestQuestion }> = ({ question }) => {
    // const [questionOptions, setQuestionOptions] = useState<{
    //     options: string[];
    //     selectedOption: string;
    // }>({
    //     options: [],
    //     selectedOption: '',
    // });
    const { setAnswer } = useTimedTest();

    const dummy_options = [
        { id: 1, content: 'Option 1' },
        { id: 2, content: 'Option 2' },
    ];

    const {
        test: { answer },
    } = useTimedTest();

    return (
        <div>
            <h1 className='text-2xl mb-6 font-semibold'>{question.title}</h1>
            <div className='flex flex-col md:grid md:grid-cols-2 gap-4'>
                {question?.options?.map((option) => (
                    <div
                        key={option?.id}
                        onClick={() => setAnswer(option?.content)}
                        className={`${
                            option?.content === answer ? 'border-purple-600' : ''
                        } animate-transition hover:border-purple-600 hover:bg-purple-600 cursor-pointer flex items-center border-2 border-neutral-800 p-4 rounded-md data-[state=checked]:bg-purple-200`}
                    >
                        <p>{option?.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
