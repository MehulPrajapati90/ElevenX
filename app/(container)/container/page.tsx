"use client";

import { CreateContainerModel } from "@/components/container/create-container-modal";
import { useGetAllContainer } from "@/hooks/query/container";
import Link from "next/link";

export default function Page() {
  const { data: containers, isPending } = useGetAllContainer();

  console.log(containers)

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="grid auto-rows-min gap-4 md:grid-cols-4">

        {/* Create Container */}
        <div className="rounded-xl border-2 border-dashed flex justify-center items-center hover:bg-neutral-50 transition-all ease-in-out duration-200 aspect-video">
          <CreateContainerModel />
        </div>
        {
          containers?.containers?.map((m) => (
            <Link key={m.id} href={`/container/${m?.id}`} className="bg-muted/50 aspect-video rounded-xl flex justify-center items-center">
              {m.name}
            </Link>
          ))
        }
      </div>
    </div>
  )
};