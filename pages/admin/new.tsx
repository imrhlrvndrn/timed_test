import { RootLayout } from '~/layouts';
import { NewTestForm } from '~/components';

const NewTestPage = () => {
    return (
        <RootLayout>
            <h1 className='px-6 text-2xl mt-8'>Test Set 1</h1>
            <NewTestForm />
        </RootLayout>
    );
};

export default NewTestPage;
