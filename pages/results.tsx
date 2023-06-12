// import { useSearchParams } from 'next/navigation';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useGetResultById } from '~/hooks/useTestQueryRequests';
import { RootLayout } from '~/layouts';
import { ResultScore } from './api/results';

type TTestPageProps = {
    searchParams: { id: string };
};

const TestPage: NextPage<TTestPageProps> = (props) => {
    const router = useRouter();
    const { data } = useGetResultById(Number(router?.query?.id));
    const mappedQuestions = Object?.keys(data?.result?.questions ?? {});
    // const mappedScore = Object;

    return (
        <RootLayout>
            <div className='p-16'>
                <h1 className='text-lg md:text-2xl lg:text-4xl mb-6 font-semibold'>
                    {data?.result?.fullName} your score is ( {data?.result?.score} out of{' '}
                    {mappedQuestions?.length} )
                </h1>
                <h2 className='flex flex-col md:grid md:grid-cols-2 gap-4 text-2xl'>
                    Test results
                </h2>
                {mappedQuestions?.map((question: string) => (
                    <ResultCard key={question} result={data?.result?.questions?.[`${question}`]} />
                ))}
            </div>
        </RootLayout>
    );
};

export default TestPage;

const ResultCard = ({ result }: { result: ResultScore }) => {
    return (
        <div
            className={`flex flex-col gap-4 p-6 rounded-md ${
                result?.isCorrect ? 'bg-green-400 text-neutral-800' : 'bg-red-500 text-slate-200'
            } my-6 min-w-[400px] w-max`}
        >
            <h1 className='text-xl font-semibold'>Question : {result?.question}</h1>
            <p>
                <span className='font-semibold'>Your answer :</span> {result?.answer}
            </p>
            <p>
                <span className='font-semibold'>Correct answer :</span> {result?.solution}
            </p>
        </div>
    );
};
