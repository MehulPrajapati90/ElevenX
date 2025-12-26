import React from 'react'

interface SelectedContentPageProps {
    params: Promise<{
        contentId: string
    }>
}

const SelectedContentPage = async ({ params }: SelectedContentPageProps) => {
    const { contentId } = await params;
    return (
        <div className='p-4'>{contentId}</div>
    )
}

export default SelectedContentPage;