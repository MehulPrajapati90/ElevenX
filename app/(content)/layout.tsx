import AppHeader from '@/components/container/app-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { ContentSidebar } from '@/components/container/content-sidebar';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

const ContentLayout = async ({ children }: { children: React.ReactNode }) => {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) {
        redirect('/sign-in');
    }
    return (
        <SidebarProvider>
            <ContentSidebar />
            <SidebarInset>
                <AppHeader />
                {children}
            </SidebarInset>
        </SidebarProvider>
    )
}

export default ContentLayout;