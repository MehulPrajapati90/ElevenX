import ContainerContent from "@/components/container/container-content";

interface SelectedContainerProps {
    params: Promise<{
        containerId: string
    }>
}

const SelectedContainerPage = async ({ params }: SelectedContainerProps) => {
    const { containerId } = await params;

    return (
        <div className="flex flex-1 flex-col gap-4 p-4">
            <ContainerContent containerId={containerId} />
        </div>
    )
}

export default SelectedContainerPage;