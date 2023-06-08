'use client';

import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/solid';
import * as Dialog from '@radix-ui/react-dialog';
import { Dispatch, SetStateAction, useState } from 'react';

export const Rules = ({
    setTestStatus,
}: {
    setTestStatus: Dispatch<
        SetStateAction<{
            status: boolean;
            fullName: string;
        }>
    >;
}) => {
    const [fullname, setFullname] = useState('');
    const dummy_rules = [
        {
            id: 1,
            content: `Once you select an option & move on to the next question. You can't go BackspaceIcon.`,
        },
        {
            id: 2,
            content: `This is a timed test. Please keep an 👀 on the timer`,
        },
        {
            id: 3,
            content: `Once you start the test. Please don't reload the page or go back.`,
        },
    ];

    return (
        <div className='flex flex-col mx-auto mt-8 rounded-md bg-neutral-900 p-6 '>
            <h1 className='text-xl md:text-2xl lg:text-4xl font-bold'>Test instructions</h1>
            <div className='mt-8'>
                {dummy_rules?.map((rule) => (
                    <div key={rule?.id} className='flex items-center mb-4'>
                        <CheckCircleIcon className='w-8 h-8 mr-4 text-purple-300 flex-shrink-0' />
                        <p>{rule?.content}</p>
                    </div>
                ))}
            </div>

            
            {/* Popup Dialog box to collect user's name in case the user isn't logged in */}
            <Dialog.Root>
                <Dialog.Trigger asChild>
                    <button className='w-max py-2 px-4 bg-purple-600 hover:bg-purple-500 animate-transition rounded-md ml-auto mt-8'>
                        Attempt Test
                    </button>
                </Dialog.Trigger>
                <Dialog.Portal>
                    <Dialog.Overlay className='bg-black opacity-80 fixed inset-0' />
                    <Dialog.Content className='text-slate-200 fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-md bg-neutral-800 p-8 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none'>
                        <Dialog.Title className='m-0 font-semibold text-xl'>
                            Enter your name
                        </Dialog.Title>
                        <Dialog.Description className='mt-1 mb-5 leading-normal opacity-50'>
                            Your name helps the admin see who took the test
                        </Dialog.Description>
                        <fieldset className='mb-6 flex flex-col gap-2'>
                            <label className='text-[15px]' htmlFor='name'>
                                Fullname
                            </label>
                            <input
                                className='text-slate-200 border border-transparent focus:ring-2 focus:ring-purple-600 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-md px-4 py-2 leading-none outline-none bg-neutral-900'
                                id='name'
                                value={fullname}
                                onChange={(e) => setFullname(e.target.value)}
                                // defaultValue='Adarsh Balika'
                            />
                        </fieldset>
                        <div className='mt-6 flex justify-end'>
                            <Dialog.Close asChild>
                                <button
                                    onClick={() => {
                                        if (fullname.length === 0) {
                                            alert('Please enter your full name');
                                            return;
                                        }
                                        if (fullname?.length > 0)
                                            setTestStatus((prevState) => ({
                                                ...prevState,
                                                status: !prevState?.status,
                                            }));
                                    }}
                                    className='bg-purple-600 text-slate-200 hover:bg-purple-500 animate-transition inline-flex h-[35px] items-center justify-center rounded-md px-6 leading-none focus:bg-purple-500'
                                >
                                    Save & Start Test
                                </button>
                            </Dialog.Close>
                        </div>
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
    );
};
