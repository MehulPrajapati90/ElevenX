import Navbar from '@/components/layout/navbar';
import React from 'react'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='min-h-screen w-full flex items-center justify-center bg-neutral-950 flex-col'>
            <div className='w-full fixed top-0 left-0'>
                <Navbar />
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}

export default RootLayout;