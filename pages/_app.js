import '../styles/globals.css';
import { QueryWrapper } from '~/components';

function MyApp({ Component, pageProps }) {
    return (
        <QueryWrapper>
            <Component {...pageProps} />
        </QueryWrapper>
    );
}

export default MyApp;
