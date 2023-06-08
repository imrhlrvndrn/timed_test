import { NavigationBar } from '../components';
import { QueryWrapper } from '../components/Providers/ReactQueryWrapper';

export const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang='en'>
            <body className={`bg-neutral-950 min-h-screen`}>
                <NavigationBar />
                {children}
            </body>
        </html>
    );
};
