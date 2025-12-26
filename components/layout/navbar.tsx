import { currentUser } from '@/actions/auth';
import UserButton from './user-button';
import { Button } from '../ui/button';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Ratio } from 'lucide-react';

interface NavItemsType {
    name: string
}

const Navbar = async () => {
    const { user } = await currentUser();

    const NavItems: NavItemsType[] = [
        { name: "Docs" },
        { name: "Company" },
        { name: "Download" },
        { name: "Consumers" },
        { name: "Partners" },
        { name: "Pricing" },
    ];

    return (
        <div className='border-b border-neutral-800 w-full min-h-22 text-white flex justify-between items-center px-50'>
            <Link href={'/'} className='flex justify-center items-center gap-1'>
                <Ratio className='' fill='' strokeWidth={"2px"} size={28} />
                <div className='hidden md:block'>
                    <h1 className='text-2xl font-sans font-semibold tracking-[-0.3px] mt-1'>Reliquary</h1>
                </div>
            </Link>

            <div className='flex gap-8 font-sans text-[15px]'>
                {NavItems.map(({ name }, idx) => (
                    <div key={idx} className='flex hover:underline cursor-pointer'>
                        {name}
                    </div>
                ))}
            </div>

            <div className='flex items-center justify-center gap-3'>
                {!user && (
                    <div className='flex justify-center items-center gap-2'>
                        <Link href={'/sign-in'} className='bg-foreground font-sans font-normal text-[15px] tracking-tight px-4 py-1.5 rounded-[6px] hover:underline transition-all ease-in-out px-5'>
                            Sign in
                        </Link>
                    </div>
                )}
                <UserButton user={user!} />
                <Button className='bg-white text-neutral-900 font-sans font-semibold tracking-[-0.5px] hover:bg-white/80 py-5' >
                    Try for free
                </Button>
                <Button variant={"outline"} className='bg-foreground text-white font-sans font-normal px-10 tracking-[-0.5px] hover:bg-neutral-800/80 hover:text-white flex p-5'>
                    <p>Get Started</p>
                    <ArrowRight />
                </Button>
            </div>
        </div>
    )
}

export default Navbar;