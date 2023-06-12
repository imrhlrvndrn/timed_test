import Head from 'next/head';
import Image from 'next/image';
import { RootLayout } from '../layouts/RootLayout';
import { Card } from '../components';
import { NextPage } from 'next';
import { useGetAllTests } from '~/hooks';

type TTest = {
    id: number;
    title: string;
    description: string;
    // created_by: string; // !Remove this if not using AUTH
    link: string;
    set?: {
        title: string;
        questions?: TestQuestion[];
    };
};

// const dummy_tests: TTest[] = [
//     {
//         id: 1,
//         title: 'ReactJS Test v0',
//         description:
//             'This is an introductory ReactJS test. You can test your knowledge on ReactJS & start prepping for your interviews',
//         created_by: 'Rahul Ravindran', // ! Remove this property if not using AUTH
//         set: {
//             title: 'ReactJS set 1',
//             questions: [
//                 {
//                     id: 1,
//                     title: 'Which type of library is ReactJS?',
//                     solution: 'Expressive',
//                     options: [
//                         {
//                             id: 1,
//                             content: 'Declarative',
//                         },
//                         {
//                             id: 2,
//                             content: 'Expressive',
//                         },
//                         {
//                             id: 3,
//                             content: 'None of the above',
//                         },
//                     ],
//                 },
//             ],
//         },
//         link: '/test?id=1',
//     },
//     {
//         id: 2,
//         title: 'ReactJS Test v1',
//         description:
//             'This is an intermediate ReactJS test. Once you feel comfortable with this one. You can start scheduling interviews',
//         created_by: 'Rahul Ravindran', // ! Remove this property if not using AUTH
//         link: '/test?id=2',
//     },
//     {
//         id: 3,
//         title: 'ReactJS Test v2',
//         description:
//             'This is an intermediate ReactJS test. Once you feel comfortable with this one. You can start scheduling interviews',
//         created_by: 'Rahul Ravindran', // ! Remove this property if not using AUTH
//         link: '/test?id=3',
//     },
//     {
//         id: 4,
//         title: 'ReactJS Test v3',
//         description:
//             'This is an intermediate ReactJS test. Once you feel comfortable with this one. You can start scheduling interviews',
//         created_by: 'Rahul Ravindran', // ! Remove this property if not using AUTH
//         link: '/test?id=4',
//     },
//     {
//         id: 5,
//         title: 'ReactJS Test v4',
//         description:
//             'This is an intermediate ReactJS test. Once you feel comfortable with this one. You can start scheduling interviews',
//         created_by: 'Rahul Ravindran', // ! Remove this property if not using AUTH
//         link: '/test?id=5',
//     },
// ];

// export const getStaticProps = async () => {
//     return {
//         props: {
//             tests: dummy_tests,
//         },
//     };
// };

const Home: NextPage = () => {
    const { data } = useGetAllTests();

    console.log('all tests data => ', data?.tests);

    return (
        <RootLayout>
            <main className='p-8'>
                <div className='flex p-6 rounded-md border border-neutral-800'>
                    <p className='text-slate-50 md:text-2xl lg:text-3xl'>
                        Welcome Back, Rahul Ravindran
                    </p>
                </div>

                <div className='my-6 flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {data?.tests?.length > 0 &&
                        data?.tests?.map((test: TTest) => (
                            <Card test={{ ...test, link: `/test?id=${test?.id}` }} key={test?.id} />
                        ))}
                </div>
            </main>
        </RootLayout>
    );
};

export default Home;
