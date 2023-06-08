'use client';

// import { signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type AuthStatusProps = {
    image: string;
};

export const AuthStatus = ({ image }: AuthStatusProps) => {
    const [signOutState, setSignOutState] = useState(false);

    useEffect(() => {
        if (!image) setSignOutState(() => false);
    }, [image]);

    return (
        <div className='flex items-center gap-6'>
            {image ? (
                <>
                    <button
                        className='text-sm focus:bg-neutral-800 hover:bg-neutral-800 py-2 px-4 text-white rounded-md disabled:opacity-25'
                        onClick={() => {
                            // signOut();
                            setSignOutState(() => true);
                        }}
                    >
                        {signOutState ? 'Signing out...' : 'Sign out'}
                    </button>
                    <Image
                        className={`rounded-full w-9 h-9`}
                        alt='User Profile'
                        src={image}
                        width={42}
                        height={42}
                        priority
                    />
                </>
            ) : (
                <button
                    className='text-sm focus:bg-gray-800 hover:bg-neutral-800 py-2 px-4 text-white rounded-lg disabled:opacity-25'
                    // onClick={() => signIn()}
                >
                    Sign In
                </button>
            )}
        </div>
    );
};
