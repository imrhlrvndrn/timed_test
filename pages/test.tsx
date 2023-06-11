'use client';

// import { useSearchParams } from 'next/navigation';
import { NextPage } from 'next';
import { RenderTest, TimedTestProvider } from '~/components';
import { RootLayout } from '~/layouts';

type TTestPageProps = {
    searchParams: { id: string };
};

const TestPage: NextPage<TTestPageProps> = (props) => {
    return (
        <RootLayout>
            <div className='p-8'>
                <TimedTestProvider>
                    <RenderTest />
                </TimedTestProvider>
            </div>
        </RootLayout>
    );
};

export default TestPage;
