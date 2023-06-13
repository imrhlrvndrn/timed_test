import { RootLayout } from '~/layouts';
import { useRouter } from 'next/router';
import * as Dialog from '@radix-ui/react-dialog';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { useForm } from 'react-hook-form';
import { useCreateTestset } from '~/hooks/useTestMutationRequests';
import { zodResolver } from '@hookform/resolvers/zod';
import { newTestsetValidator } from '~/validators/test.validators';
import { useGetTestById } from '~/hooks/useTestQueryRequests';
import { Card } from '~/components';

const NewTestPage = () => {
    const router = useRouter();
    const { mutate: createTestset } = useCreateTestset();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: { title: '', duration: '' },
        resolver: zodResolver(newTestsetValidator),
    });
    const { data } = useGetTestById(Number(router?.query?.id));

    return (
        <RootLayout>
            <div className='px-6 py-8'>
                <div className='flex justify-between items-center p-6 mb-10'>
                    <div className='flex justify-center flex-col'>
                        <h1 className='text-xl md:text-2xl lg:text-3xl font-semibold'>
                            {data?.test?.title}
                        </h1>
                        <p className='opacity-50 text-sm mt-2'>{data?.test?.description}</p>
                    </div>
                    {/* New testset form modal */}
                    <Dialog.Root>
                        <Dialog.Trigger asChild>
                            <button
                                type='button'
                                className='flex items-center bg-neutral-900 hover:bg-neutral-800 animate-transition px-6 py-4 rounded-md  text-slate-200'
                            >
                                <PlusIcon className='w-4 h-4 mr-4' />
                                Create test set
                            </button>
                        </Dialog.Trigger>
                        <Dialog.Portal>
                            <Dialog.Overlay className='bg-black opacity-80 fixed inset-0 z-[1]' />
                            <Dialog.Content className='z-[2] text-slate-200 fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-md bg-neutral-800 p-10 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none'>
                                <Dialog.Title className='font-semibold text-xl'>
                                    Add a test set title
                                </Dialog.Title>
                                <Dialog.Description className='mt-1 mb-10 leading-normal opacity-50 text-sm'>
                                    {/* You&apos;re about to create a new test set for {test?.title} */}
                                    You&apos;re about to create a new test set for{' '}
                                    {'React JS Beginner'}
                                </Dialog.Description>
                                <form>
                                    {/* {renderTextInputs(newTestPreData)} */}
                                    <label htmlFor='title' className='inline-block'>
                                        Title
                                    </label>
                                    <input
                                        placeholder='Enter a title'
                                        className='mt-2 text-slate-200 border border-transparent focus:ring-2 focus:ring-purple-600 inline-flex w-full flex-1 items-center justify-center rounded-md px-4 py-2 leading-none outline-none bg-neutral-900 hover:bg-neutral-950 animate-transition'
                                        type='text'
                                        {...register('title')}
                                    />
                                    {'title' in errors && (
                                        <p className='text-red-400 mt-2'>
                                            {errors?.title?.message}
                                        </p>
                                    )}

                                    <label htmlFor='duration' className='inline-block mt-6'>
                                        Duration
                                    </label>
                                    <select
                                        {...register('duration')}
                                        className='w-full p-2 h-[45px] rounded-md bg-neutral-900 mt-2'
                                    >
                                        <option value='5'>5</option>
                                        <option value='10'>10</option>
                                        <option value='20'>20</option>
                                    </select>
                                    {'duration' in errors && (
                                        <p className='text-red-400 mt-2'>
                                            {errors?.duration?.message}
                                        </p>
                                    )}

                                    <div className='mt-6 flex justify-end'>
                                        <Dialog.Close
                                            asChild
                                            className='bg-purple-600 text-slate-200 hover:bg-purple-500 animate-transition inline-flex h-[35px] items-center justify-center rounded-md px-6 leading-none focus:bg-purple-500'
                                        >
                                            <button
                                                type='submit'
                                                onClick={handleSubmit(({ title, duration }) => {
                                                    console.log('set data [> ', {
                                                        title,
                                                        duration,
                                                    });
                                                    createTestset({
                                                        testId: Number(router?.query?.id),
                                                        title,
                                                        duration: Number(duration),
                                                    });
                                                })}
                                            >
                                                Create new set
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
                {/* {router?.query?.id &} */}
                <div className='grid grid-cols-3 gap-4 px-6'>
                    {data?.test?.testSets?.map((set: any) => (
                        <Card
                            key={set?.id}
                            test={{
                                id: set?.id,
                                title: set?.title,
                                description: data?.test?.description ?? '',
                                link: `/admin/tests?id=${router?.query?.id}`,
                            }}
                        />
                    ))}
                </div>
            </div>
        </RootLayout>
    );
};

export default NewTestPage;
