'use client';

import { useRouter } from 'next/router';
import { RootLayout } from '~/layouts';

const AdminPage = () => {
    const router = useRouter();

    return (
        <RootLayout>
            <div className='flex'>
                <div className='flex-shrink-0 w-[300px] h-screen bg-neutral-900 p-6'>
                    <button
                        onClick={() => router.push(`/admin/new`)}
                        className='bg-neutral-800 hover:bg-neutral-700 animate-transition p-4 rounded-md w-full text-slate-200'
                    >
                        Create new test
                    </button>
                </div>
            </div>
        </RootLayout>
    );
};

export default AdminPage;
