import { AcademicCapIcon } from '@heroicons/react/24/solid';
// import * as Avatar from '@radix-ui/react-avatar';
import Link from 'next/link';
import { AuthStatus } from '../../components';

export const NavigationBar = () => {
    return (
        <div className='sticky left-0 top-0 z-20 flex justify-between bg-neutral-900 px-6 py-4'>
            <Link href='/'>
                <div className='cursor-pointer animate-transition flex items-center  hover:px-4 focus:px-4 py-1 rounded-md outline-none hover:bg-neutral-800 focus:bg-neutral-800'>
                    <AcademicCapIcon className='h-8 w-8 text-orange-600' />{' '}
                    <p className='ml-4 font-bold'>Invact</p>
                </div>
            </Link>
            <div className='flex items-center text-sm'>
                {/*// ! Show the admin link if the user is an admin */}
                <Link href='/admin'>
                    <p className='animate-transition rounded-md px-4 py-2 outline-none hover:bg-neutral-800 focus:bg-neutral-800 cursor-pointer'>
                        Admin Dashboard
                    </p>
                </Link>
                {/* {session?.user && <AuthStatus image={session?.user?.image ?? ''} />} */}
                {/* <div className=' rounded-md px-4 py-2 cursor-default'>
                    Rahul Ravindran
                    <Avatar.Root className='ml-2'>
                        <Avatar.Image src={session?.user?.image} />
                        <Avatar.Fallback className='p-2 bg-purple-600 text-neutral-950 rounded-full '>
                            RR
                        </Avatar.Fallback>
                    </Avatar.Root>
                </div> */}
            </div>
        </div>
    );
};
