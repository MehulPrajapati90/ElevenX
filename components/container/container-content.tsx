"use client";

import { useGetContentbyContainerId } from '@/hooks/query/container';
import { CreateContentModal } from './create-content-modal';
import ContentViewModal from './content-view-modal';
import { Link2 } from 'lucide-react';
import Link from 'next/link';

const ContainerContent = ({ containerId }: { containerId: string }) => {
    const { data: content, isPending } = useGetContentbyContainerId({ containerId });

    return (
        <div className="grid auto-rows-min gap-4 md:grid-cols-4 h-45">

            {/* Create Container */}
            <div className="rounded-xl border-2 border-dashed flex justify-center items-center hover:bg-neutral-50 transition-all ease-in-out duration-200 aspect-video">
                <CreateContentModal containerId={containerId} />
            </div>

            {
                content?.content?.map((m, idx: number) => (
                    <div key={idx} className="bg-muted/50 aspect-video rounded-xl flex justify-center items-center">
                        <Link href={`/container/content/${m.fieldType}`}>
                            <Link2 size={18} /></Link>
                        <ContentViewModal content={m.content!} contentType={m.fieldType!} createdAt={m.createdAt} />
                    </div>
                ))
            }

        </div>
    )
}

export default ContainerContent;