"use client";

import { useGetallContent } from "@/hooks/query/container";
import FilterContentViewModal from "./filter-content-view-modal";
import { CreateFilterContentModal } from "./create-filter-content-modal";
import { FieldContentType } from "@/schema";

interface FilterContentPageProps {
    contentId: string
}

const FilterContentPage = ({ contentId }: FilterContentPageProps) => {
    const { data: content, isPending } = useGetallContent();

    return (
        <div className="w-full min-h-auto">
            <div className="rounded-xl border-2 border-dashed flex justify-center items-center hover:bg-neutral-50 transition-all ease-in-out duration-200 aspect-video p-4 max-w-100">
                <CreateFilterContentModal contentType={contentId as unknown as FieldContentType} />
            </div>
            <div className="grid auto-rows-min gap-3 md:grid-row h-45 py-4">
                {content?.content?.filter((v) => v.fieldType === contentId.toUpperCase())?.map((m, idx: number) => (
                    <FilterContentViewModal key={idx} content={m.content!} contentType={m.fieldType} createdAt={m.createdAt} />
                ))}
            </div>
        </div>
    )
}

export default FilterContentPage;