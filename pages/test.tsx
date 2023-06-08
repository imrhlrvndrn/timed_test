'use client';

// import { useSearchParams } from 'next/navigation';
import { NextPage } from 'next';
import { RenderTest } from '~/components';
import { RootLayout } from '~/layouts';

type TTestPageProps = {
    searchParams: { id: string };
};

const TestPage: NextPage<TTestPageProps> = (props) => {
    // const searchParams = useSearchParams();
    // const testId = searchParams.get('id');

    return (
        <RootLayout>
            <div className='p-8'>
                test page {props?.searchParams?.id}
                <RenderTest />
            </div>
        </RootLayout>
    );
};

export default TestPage;
