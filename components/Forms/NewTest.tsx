'use client';

import {
    Control,
    FieldArrayWithId,
    UseFormRegister,
    useFieldArray,
    useForm,
} from 'react-hook-form';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { Dispatch, SetStateAction, useState } from 'react';

type FormValues = {
    questions: {
        title: string;
        description: string;
        options: { content: string; isSelected: boolean }[];
    }[];
};

export const NewTestForm = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
        register,
    } = useForm<FormValues>({
        defaultValues: {
            questions: [
                {
                    title: 'Question',
                    description: 'Description',
                    options: [{ content: 'Option', isSelected: false }],
                },
            ],
        },
    });
    const {
        fields: questionFields,
        append: appendQuestion,
        remove: removeQuestion,
    } = useFieldArray({
        name: 'questions',
        control,
    });
    const [trackTestQuestions, setTrackTestQuestions] = useState<{
        [key: number]: number | null;
    }>({});

    return (
        <div className=''>
            <form
                onSubmit={handleSubmit((data) =>
                    console.log('Submitted form data => ', { formData: data, trackTestQuestions })
                )}
            >
                {questionFields?.map((field, index) => (
                    <section key={index} className='flex gap-4 my-8 p-6 '>
                        <input
                            className='hover:bg-neutral-700 h-max animate-transition focus:ring focus:ring-purple-600 outline-none px-6 py-4 rounded-md text-slate-200 bg-neutral-800'
                            placeholder='Question Title'
                            defaultValue={field.title}
                            {...register(`questions.${index}.title`)}
                        />
                        <input
                            className='hover:bg-neutral-700 h-max animate-transition focus:ring focus:ring-purple-600 outline-none px-6 py-4 rounded-md text-slate-200 bg-neutral-800'
                            placeholder='Question Description'
                            defaultValue={field.description}
                            {...register(`questions.${index}.description`)}
                        />
                        <OptionsFieldArray
                            control={control}
                            parent={{ index, fields: questionFields }}
                            register={register}
                            tracking={{
                                trackedQuestions: trackTestQuestions,
                                updateTrackedQuestions: setTrackTestQuestions,
                            }}
                        />
                        <button
                            className='h-max p-4 text-red-600 mx-6 rounded-md font-semibold'
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
                ))}
                <button
                    className='p-4 bg-purple-600 hover:bg-purple-500 animate-transition mx-6 rounded-md'
                    type='button'
                    onClick={() => {
                        appendQuestion({
                            title: 'Question',
                            description: 'Description',
                            options: [{ content: 'Option', isSelected: false }],
                        });
                    }}
                >
                    Add new Question
                </button>

                <button>Submit form</button>
            </form>
        </div>
    );
};

export const OptionsFieldArray = ({
    control,
    parent,
    register,
    tracking,
}: {
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

    console.log('trackedQuestions => ', tracking.trackedQuestions);

    return (
        <div>
            {fields?.map((field, index) => (
                <div key={index} className='mb-4 flex gap-4 items-center'>
                    <input
                        className='hover:bg-neutral-700 h-max animate-transition focus:ring focus:ring-purple-600 outline-none px-6 py-4 rounded-md text-slate-200 bg-neutral-800'
                        placeholder='Enter an option'
                        {...register(`questions.${parent?.index}.options.${index}.content`)}
                    />

                    <span
                        onClick={() =>
                            tracking.updateTrackedQuestions((prevState) => ({
                                ...prevState,
                                [parent?.index]: index,
                            }))
                        }
                        className={`w-7 h-7 rounded-full ${
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
                                content: 'Option',
                                isSelected: false,
                            });
                        }}
                    >
                        Add option
                    </button>
                    <button
                        className='p-4 animate-transition rounded-md text-red-600 font-semibold'
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
