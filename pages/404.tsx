import { RootLayout } from '../layouts/RootLayout';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
    const router = useRouter();

    return (
        <RootLayout>
            <main className='p-32'>
                <div className='flex flex-col p-6 rounded-md  h-full items-center'>
                    <h1 className='text-slate-50 md:text-2xl lg:text-3xl font-semibold'>
                        Could not find a page
                    </h1>
                    <button
                        className='w-max bg-purple-600 px-6 py-4 rounded-md mt-8'
                        onClick={() => router.back()}
                    >
                        Go back to the previous page
                    </button>
                </div>
            </main>
        </RootLayout>
    );
};

export default Home;
