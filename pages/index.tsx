import Head from 'next/head';
import Image from 'next/image';
import { RootLayout } from '../layouts/RootLayout';
import { Card } from '../components';
import { NextPage } from 'next';

type TTest = {
    id: number;
    title: string;
    description: string;
    created_by: string; // !Remove this if not using AUTH
    link: string;
};

const dummy_tests: TTest[] = [
    {
        id: 1,
        title: 'ReactJS Test v0',
        description:
            'This is an introductory ReactJS test. You can test your knowledge on ReactJS & start prepping for your interviews',
        created_by: 'Rahul Ravindran', // ! Remove this property if not using AUTH
        link: '/test?id=1',
    },
    {
        id: 2,
        title: 'ReactJS Test v1',
        description:
            'This is an intermediate ReactJS test. Once you feel comfortable with this one. You can start scheduling interviews',
        created_by: 'Rahul Ravindran', // ! Remove this property if not using AUTH
        link: '/test?id=2',
    },
    {
        id: 3,
        title: 'ReactJS Test v2',
        description:
            'This is an intermediate ReactJS test. Once you feel comfortable with this one. You can start scheduling interviews',
        created_by: 'Rahul Ravindran', // ! Remove this property if not using AUTH
        link: '/test?id=3',
    },
    {
        id: 4,
        title: 'ReactJS Test v3',
        description:
            'This is an intermediate ReactJS test. Once you feel comfortable with this one. You can start scheduling interviews',
        created_by: 'Rahul Ravindran', // ! Remove this property if not using AUTH
        link: '/test?id=4',
    },
    {
        id: 5,
        title: 'ReactJS Test v4',
        description:
            'This is an intermediate ReactJS test. Once you feel comfortable with this one. You can start scheduling interviews',
        created_by: 'Rahul Ravindran', // ! Remove this property if not using AUTH
        link: '/test?id=5',
    },
];

export const getStaticProps = async () => {
    return {
        props: {
            tests: dummy_tests,
        },
    };
};

const Home: NextPage<{ tests: TTest[] }> = ({ tests }) => {
    return (
        <RootLayout>
            <main className='p-8'>
                <div className='flex p-6 rounded-md border border-neutral-900'>
                    <p className='text-slate-50 md:text-2xl lg:text-3xl'>
                        Welcome Back, Rahul Ravindran
                    </p>
                </div>

                <div className='my-6 flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {tests?.length > 0 && tests?.map((test) => <Card test={test} key={test?.id} />)}
                </div>
            </main>
        </RootLayout>
    );
};

export default Home;
