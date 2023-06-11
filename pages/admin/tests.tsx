import { RootLayout } from '~/layouts';
import { NewTestForm } from '~/components';
import { useGetTestsetById } from '~/hooks';
import { useRouter } from 'next/router';

const NewTestPage = () => {
    const router = useRouter();
    // const { data } = useGetTestsetById(Number(router.query.setId));

    return (
        <RootLayout>
            <div className='px-6 py-8'>
                <h1 className='text-xl md:text-2xl lg:text-3xl font-semibold'>Test Edit Page</h1>
                {/* {router?.query?.id &} */}
            </div>
        </RootLayout>
    );
};

export default NewTestPage;
