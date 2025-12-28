import FilterContentPage from '@/components/container/filter-content-page';

interface SelectedContentPageProps {
    params: Promise<{
        contentId: string
    }>,
}

const SelectedContentPage = async ({ params }: SelectedContentPageProps) => {
    const { contentId } = await params;
    return (
        <div className='p-4'>
            <FilterContentPage contentId={contentId} />
        </div>
    )
}

export default SelectedContentPage;