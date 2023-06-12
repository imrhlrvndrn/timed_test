'use client';

import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import { useForm } from 'react-hook-form';
import { useMultistep } from '../../hooks';
import { MultistepQuestion, useTimedTest } from '../';
import { FC, useEffect } from 'react';
import { useGetTestsetById } from '~/hooks/useTestQueryRequests';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import { useGenerateResult } from '~/hooks/useTestMutationRequests';

interface IMultistepProps {
    canGoBack?: boolean;
}

export const Multistep: FC<IMultistepProps> = ({ canGoBack = true }) => {
    const { test, setAnswer } = useTimedTest();
    const router = useRouter();
    const { mutate: generateResult } = useGenerateResult();
    console.log('multistep => ', test);
    const { nextStep, previousStep, activeStep, totalSteps } = useMultistep({
        steps: !(test.set instanceof Array)
            ? test.set.questions?.map((question, index) => ({
                  id: question?.id!,
                  title: question?.title,
                  component: <MultistepQuestion question={question} />,
                  order: index + 1,
              }))
            : [],
    });

    const isNotFirstStep = activeStep?.order > 1;
    const isLastStep = totalSteps === activeStep?.order;

    return (
        <div className='my-8 mx-auto min-h-max lg:w-6/12 md:w-8/12 rounded-md bg-neutral-900 p-12'>
            <div>
                {activeStep?.component}
                <div className='mt-20 flex items-center justify-between'>
                    {canGoBack && (
                        <button
                            disabled={!isNotFirstStep}
                            className='flex items-center rounded-md p-2 text-sm text-slate-50 disabled:opacity-0'
                            type='button'
                            onClick={() => previousStep()}
                        >
                            <ChevronLeftIcon className='mr-2 h-6 w-6' />
                            <p>Back</p>
                        </button>
                    )}
                    <div className='flex items-center gap-1'>
                        {Array(totalSteps)
                            ?.fill(true)
                            ?.map((step, index) => (
                                <div
                                    key={index + 1}
                                    className={`h-2 w-2 cursor-pointer rounded-full ${
                                        index + 1 === activeStep?.order
                                            ? '!w-4 bg-blue-600'
                                            : 'bg-neutral-950'
                                    } transition-all duration-300 ease-in-out`}
                                ></div>
                            ))}
                    </div>
                    <button
                        className='rounded-md bg-purple-600 p-2 px-6 text-sm font-bold text-slate-50'
                        type='button'
                        onClick={async (e) => {
                            if (!test.answer)
                                return toast.error('Please select an option', { duration: 2000 });
                            setAnswer(null);
                            if (isLastStep) {
                                // * Make a backend call with all the relevant data
                                await generateResult({
                                    testId: Number(router?.query?.id),
                                    testsetId: Number(
                                        !(test?.set instanceof Array) && test?.set?.id
                                    ),
                                    fullName: test?.fullName,
                                    score: test?.score,
                                });
                            } else nextStep();
                        }}
                    >
                        {isLastStep ? 'Submit Form' : 'Next Step'}
                    </button>
                </div>
            </div>
        </div>
    );
};
