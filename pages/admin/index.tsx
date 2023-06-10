'use client';

import { useRouter } from 'next/router';
import * as Dialog from '@radix-ui/react-dialog';
import { RootLayout } from '~/layouts';
import { zodResolver } from '@hookform/resolvers/zod';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { newTestPreData } from '~/constants/forms/newTest/newTest.constants';
import { useForm } from 'react-hook-form';
import { useCreateNewTestAndTestsetMutation, useGetAdminTests } from '~/hooks';
import { newTestValidator } from '~/validators/test.validators';
import { Card } from '~/components';

export type TTextInput = {
    id?: string;
    type: string;
    name: string;
    label: string;
    placeholder: string;
    isOptional?: boolean;
    value?: string;
};

type TNewTestFieldValues = {
    title: string;
    description: string;
    testsetTitle: string;
};

const AdminPage = () => {
    const router = useRouter();
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: '',
            description: '',
            testsetTitle: '',
        },
        resolver: zodResolver(newTestValidator),
    });
    const { mutate: createNewTestMutation, data: testData } = useCreateNewTestAndTestsetMutation();
    const { data: testsData } = useGetAdminTests();

    console.log('tests data => ', testsData);

    const renderTextInputs = (inputs: TTextInput[]) =>
        inputs?.map(({ name, placeholder, type, label, id, isOptional }) => (
            <fieldset className='mb-6 flex flex-col gap-2' key={name}>
                <label className='text-[15px] opacity-50' htmlFor={name}>
                    {label} {isOptional && '(Optional)'}
                </label>
                <input
                    className='text-slate-200 border border-transparent focus:ring-2 focus:ring-purple-600 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-md px-4 py-2 leading-none outline-none bg-neutral-900'
                    id={id}
                    type={type}
                    required={!isOptional}
                    {...register(name as keyof TNewTestFieldValues)}
                    placeholder={placeholder}
                />
                {name in errors && (
                    <p className='text-red-400 my-2 text-sm'>
                        {errors[name as keyof TNewTestFieldValues]?.message}
                    </p>
                )}
            </fieldset>
        ));

    return (
        <RootLayout>
            <div className='flex'>
                <div className='flex-shrink-0 w-[300px] h-screen bg-neutral-900 p-6'>
                    <Dialog.Root>
                        <Dialog.Trigger asChild>
                            <button
                                type='button'
                                className='bg-neutral-800 hover:bg-neutral-700 animate-transition p-4 rounded-md w-full text-slate-200'
                            >
                                Create new test
                            </button>
                        </Dialog.Trigger>
                        <Dialog.Portal>
                            <Dialog.Overlay className='bg-black opacity-80 fixed inset-0 z-[1]' />
                            <Dialog.Content className='z-[2] text-slate-200 fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-md bg-neutral-800 p-10 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none'>
                                <Dialog.Title className='font-semibold text-xl'>
                                    Let&apos;s start with the test title & description
                                </Dialog.Title>
                                <Dialog.Description className='mt-1 mb-10 leading-normal opacity-50 text-sm'>
                                    A short description will help the students learn more about the
                                    test 😇
                                </Dialog.Description>
                                <form>
                                    {renderTextInputs(newTestPreData)}
                                    <div className='mt-6 flex justify-end'>
                                        <Dialog.Close
                                            asChild
                                            className='bg-purple-600 text-slate-200 hover:bg-purple-500 animate-transition inline-flex h-[35px] items-center justify-center rounded-md px-6 leading-none focus:bg-purple-500'
                                        >
                                            <button
                                                type='submit'
                                                onClick={handleSubmit(
                                                    ({ title, description, testsetTitle }) =>
                                                        createNewTestMutation({
                                                            test: {
                                                                title: title,
                                                                description: description,
                                                            },
                                                            testset: {
                                                                title: testsetTitle,
                                                            },
                                                        })
                                                )}
                                            >
                                                Save & Start Test
                                            </button>
                                        </Dialog.Close>
                                    </div>
                                </form>
                                <Dialog.Close asChild>
                                    <button
                                        className='text-slate-50 absolute top-[10px] right-[10px] inline-flex h-9 w-9 appearance-none items-center justify-center rounded-md cursor-pointer hover:bg-neutral-900 p-2 focus:outline-none'
                                        aria-label='Close'
                                    >
                                        <XMarkIcon />
                                    </button>
                                </Dialog.Close>
                            </Dialog.Content>
                        </Dialog.Portal>
                    </Dialog.Root>
                </div>
                <div className='flex flex-col p-6 md:grid md:grid-cols-3 w-full h-max'>
                    {testsData?.tests?.map((test: any) => (
                        <Card
                            key={test.id}
                            test={{ ...test, link: `/admin/tests?id=${test.id}` }}
                        />
                    ))}
                </div>
            </div>
        </RootLayout>
    );
};

export default AdminPage;
