import { RootLayout } from '~/layouts';
import { NewTestForm } from '~/components';
import { useGetTestsetById } from '~/hooks';
import { useRouter } from 'next/router';

const NewTestPage = () => {
    const router = useRouter();
    const { data } = useGetTestsetById(Number(router.query.setId));

    console.log('testset page data => ', data);
    return (
        <RootLayout>
            <div className='px-16 py-8'>
                <h1 className='px-6 text-2xl mt-8'>Test Set 1</h1>
                {router?.query?.setId && <NewTestForm />}
            </div>
        </RootLayout>
    );
};

export default NewTestPage;
