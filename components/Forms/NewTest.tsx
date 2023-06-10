'use client';

import {
    Control,
    FieldArrayWithId,
    FieldErrors,
    SubmitHandler,
    UseFormRegister,
    useFieldArray,
    useForm,
} from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { Dispatch, SetStateAction, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { testQuestionValidator } from '~/validators/test.validators';
import { ErrorMessage } from '@hookform/error-message';
import { toast } from 'react-hot-toast';
import { useAddQuestionToTestset } from '~/hooks';
import { useRouter } from 'next/router';

type FormValues = {
    questions: TestQuestion[];
};

export const NewTestForm = () => {
    const router = useRouter();
    const {
        control,
        handleSubmit,
        formState: { errors },
        register,
    } = useForm<FormValues>({
        defaultValues: {
            questions: [
                {
                    title: '',
                    description: '',
                    options: [{ content: '' }],
                },
            ],
        },
        resolver: zodResolver(testQuestionValidator),
    });
    const {
        fields: questionFields,
        append: appendQuestion,
        remove: removeQuestion,
    } = useFieldArray({
        name: 'questions',
        control,
    });
    const { mutate: addQuestionToTestset } = useAddQuestionToTestset();
    const [trackTestQuestions, setTrackTestQuestions] = useState<{
        [key: number]: number | null;
    }>({});

    const handleFormSubmission: SubmitHandler<FormValues> = async (data) => {
        const transformedQuestions = data.questions.reduce((acc, cur, index) => {
            if (isNaN(trackTestQuestions[index] as number)) {
                toast.error(`Please select a correct answer for [Question ${index + 1}]`, {
                    duration: 3000,
                    position: 'top-right',
                });
            }
            acc.push({
                ...cur,
                solution: cur.options[trackTestQuestions[index] ?? -1]?.content,
            });

            return acc;
        }, [] as TestQuestion[]);
        if (
            transformedQuestions?.filter((question: TestQuestion) => !question.solution)?.length > 0
        )
            return;

        await addQuestionToTestset({
            setId: Number(router.query.setId),
            questions: transformedQuestions,
        });
    };

    console.log('error => ', errors);

    return (
        <div className='mt-8'>
            <DevTool control={control} placement='top-right' />
            <form onSubmit={handleSubmit(handleFormSubmission)}>
                {questionFields?.map((field, index) => (
                    <div
                        key={index}
                        className='border border-neutral-800 rounded-lg px-8 py-4 mb-4'
                    >
                        <h1 className='text-2xl mt-4'>Question {index + 1}</h1>
                        <section key={index} className='flex gap-4 my-0 py-6 '>
                            <div className='flex flex-col'>
                                <input
                                    className='hover:bg-neutral-700 h-max animate-transition focus:ring focus:ring-purple-600 outline-none px-6 py-4 rounded-md text-slate-200 bg-neutral-800'
                                    placeholder='Enter a title'
                                    defaultValue={field.title}
                                    {...register(`questions.${index}.title`)}
                                />
                                <ErrorMessage
                                    errors={errors}
                                    name={`questions.${index}.title`}
                                    render={({ message }) => (
                                        <p className='text-red-400 text-sm mt-2'>{message}</p>
                                    )}
                                />
                            </div>
                            <input
                                className='hover:bg-neutral-700 h-max animate-transition focus:ring focus:ring-purple-600 outline-none px-6 py-4 rounded-md text-slate-200 bg-neutral-800'
                                placeholder='Enter a description'
                                defaultValue={field.description}
                                {...register(`questions.${index}.description`)}
                            />
                            <button
                                className='h-max p-4 text-red-500 mx-6 rounded-md font-semibold'
                                type='button'
                                onClick={() => {
                                    removeQuestion(index);
                                    setTrackTestQuestions((prevState) => ({
                                        ...prevState,
                                        [index]: null,
                                    }));
                                }}
                            >
                                Remove Question
                            </button>
                        </section>
                        <OptionsFieldArray
                            errors={errors}
                            control={control}
                            parent={{ index, fields: questionFields }}
                            register={register}
                            tracking={{
                                trackedQuestions: trackTestQuestions,
                                updateTrackedQuestions: setTrackTestQuestions,
                            }}
                        />
                    </div>
                ))}

                <button
                    className='mt-8 p-4 bg-purple-600 hover:bg-purple-500 animate-transition mx-6 rounded-md'
                    type='button'
                    onClick={() => {
                        appendQuestion({
                            title: '',
                            description: '',
                            options: [{ content: '' }],
                            solution: '',
                        });
                    }}
                >
                    Add new Question
                </button>

                <button type='submit'>Submit form</button>
            </form>
        </div>
    );
};

export const OptionsFieldArray = ({
    errors,
    control,
    parent,
    register,
    tracking,
}: {
    errors: FieldErrors<FormValues>;
    control: Control<FormValues>;
    parent: { index: number; fields: FieldArrayWithId<FormValues, 'questions', 'id'>[] };
    register: UseFormRegister<FormValues>;
    tracking: {
        trackedQuestions: {
            [key: number]: number | null;
        };
        updateTrackedQuestions: Dispatch<
            SetStateAction<{
                [key: number]: number | null;
            }>
        >;
    };
}) => {
    const {
        fields,
        remove: removeOption,
        append: appendOption,
    } = useFieldArray({
        control,
        name: `questions.${parent?.index}.options`,
    });

    // console.log('trackedQuestions => ', tracking.trackedQuestions);

    return (
        <div className='w-max pl-8'>
            {fields?.map((field, index) => (
                <div key={index} className='mb-4 flex gap-4 items-start '>
                    <div className='flex flex-col'>
                        <input
                            className='hover:bg-neutral-700 h-max animate-transition focus:ring focus:ring-purple-600 outline-none px-6 py-4 rounded-md text-slate-200 bg-neutral-800'
                            placeholder='Enter an option'
                            {...register(`questions.${parent?.index}.options.${index}.content`)}
                        />
                        <ErrorMessage
                            errors={errors}
                            name={`questions.${parent?.index}.options.${index}.content`}
                            render={({ message }) => (
                                <p className='text-red-400 text-sm mt-2'>{message}</p>
                            )}
                        />
                    </div>

                    <span
                        onClick={() =>
                            tracking.updateTrackedQuestions((prevState) => ({
                                ...prevState,
                                [parent?.index]: index,
                            }))
                        }
                        className={`mt-4 w-7 h-7 rounded-full ${
                            index === tracking?.trackedQuestions[parent?.index]
                                ? 'bg-green-600'
                                : 'border border-neutral-800'
                        } cursor-pointer`}
                    ></span>

                    <button
                        className='p-4 bg-purple-600 hover:bg-purple-500 animate-transition rounded-md text-slate-200 font-semibold'
                        type='button'
                        onClick={() => {
                            appendOption({
                                content: '',
                            });
                        }}
                    >
                        Add option
                    </button>
                    <button
                        className='p-4 animate-transition rounded-md text-red-500 font-semibold'
                        type='button'
                        onClick={() => {
                            removeOption(index);
                            tracking.updateTrackedQuestions((prevState) => ({
                                ...prevState,
                                [parent?.index]: null,
                            }));
                        }}
                    >
                        Remove option
                    </button>
                </div>
            ))}
        </div>
    );
};
