import Link from 'next/link';
import { FunctionComponent } from 'react';

type TCardProps = {
    test: {
        id: number;
        title: string;
        link: string;
        description: string;
        created_by: string;
    };
};

export const Card: FunctionComponent<TCardProps> = ({ test }) => {
    return (
        <Link href={test?.link}>
            <div className='cursor-pointer group focus:ring-1 hover:ring-1 hover:ring-purple-600 focus:ring-purple-600 outline-none flex flex-col text-slate-200 p-4 border border-neutral-800 rounded-md md:max-w-full animate-transition'>
                <h1 className='text-lg mb-1 group-hover:text-purple-600 group-focus:text-purple-600 animate-transition'>
                    {test?.title}
                </h1>
                <p className='opacity-60 text-sm'>{test?.description}</p>

                <p className='flex text-xs mt-6'>
                    <span className='mr-1 opacity-60'>Created by</span> {test?.created_by}
                </p>
            </div>
        </Link>
    );
};

// export const Test.Card = Card;
