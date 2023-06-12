// import { useSearchParams } from 'next/navigation';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useGetResultById } from '~/hooks/useTestQueryRequests';
import { RootLayout } from '~/layouts';

type TTestPageProps = {
    searchParams: { id: string };
};

const TestPage: NextPage<TTestPageProps> = (props) => {
    const router = useRouter();
    const { data } = useGetResultById(Number(router?.query?.id));

    console.log('result data => ', data?.result);

    return (
        <RootLayout>
            <div className='p-16'>
                <h1 className='text-lg md:text-2xl lg:text-4xl mb-6 font-semibold'>
                    {data?.result?.fullName} your score is ( {data?.result?.score} out of 10 )
                </h1>
                <h2 className='flex flex-col md:grid md:grid-cols-2 gap-4 text-2xl'>
                    Test results
                </h2>
            </div>
        </RootLayout>
    );
};

export default TestPage;

const ResultCard = () => {
    return <div className='flex'></div>;
};
