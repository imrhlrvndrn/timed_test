'use client';

import { useState } from 'react';

export const MultistepQuestion = () => {
    const [questionOptions, setQuestionOptions] = useState<{
        options: string[];
        selectedOption: string;
    }>({
        options: [],
        selectedOption: '',
    });

    const dummy_options = [
        { id: 1, content: 'Option 1' },
        { id: 2, content: 'Option 2' },
    ];

    return (
        <div>
            <h1 className='text-2xl mb-6 font-semibold'>Question 1?</h1>
            <div className='flex flex-col md:grid md:grid-cols-2 gap-4'>
                {dummy_options?.map((option) => (
                    <div
                        key={option?.id}
                        // onClick={}
                        className='animate-transition hover:border-purple-600 hover:bg-purple-600 cursor-pointer flex items-center border-2 border-neutral-800 p-4 rounded-md data-[state=checked]:bg-purple-200'
                    >
                        <p>{option?.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
