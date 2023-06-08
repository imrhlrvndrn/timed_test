'use client';

import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import { useForm } from 'react-hook-form';
import { useMultistep } from '../../hooks';
import { MultistepQuestion } from '../';

interface IMultistepProps {}

export const Multistep = () => {
    const { nextStep, previousStep, activeStep, totalSteps } = useMultistep({
        formSteps: [
            { title: 'Step1', component: <Step1 />, order: 1 },
            { title: 'Step2', component: <Step2 />, order: 2 },
        ],
    });
    const methods = useForm({ defaultValues: { step1: 'Step1', step2: 'Step2' } });
    const { control, handleSubmit } = methods;

    const isNotFirstStep = activeStep?.order > 1;
    const isLastStep = totalSteps === activeStep?.order;

    return (
        <div className='my-8 mx-auto min-h-max lg:w-6/12 md:w-8/12 rounded-md bg-neutral-900 p-12'>
            <div>
                {activeStep?.component}
                <div className='mt-20 flex items-center justify-between'>
                    <button
                        disabled={!isNotFirstStep}
                        className='flex items-center rounded-md p-2 text-sm text-slate-50 disabled:opacity-0'
                        type='button'
                        onClick={() => previousStep()}
                    >
                        <ChevronLeftIcon className='mr-2 h-6 w-6' />
                        <p>Back</p>
                    </button>
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
                        onClick={(e) =>
                            isLastStep
                                ? handleSubmit((data) =>
                                      console.log('data from submit button => ', data)
                                  )(e)
                                : nextStep()
                        }
                    >
                        {isLastStep ? 'Submit Form' : 'Next Step'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export const Step1 = () => {
    return (
        <div>
            <MultistepQuestion />
        </div>
    );
};

export const Step2 = () => {
    return <h1>This is step 2</h1>;
};
