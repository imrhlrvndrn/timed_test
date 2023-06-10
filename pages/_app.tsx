import { AppProps } from 'next/app';
import '../styles/globals.css';
import { QueryWrapper } from '~/components';

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <QueryWrapper>
            <Component {...pageProps} />
        </QueryWrapper>
    );
};

export default MyApp;
