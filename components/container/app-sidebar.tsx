"use client"

import * as React from "react"

import { SearchForm } from "@/components/container/search-form"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { GalleryVerticalEnd } from "lucide-react"
import { useGetAllContainer } from "@/hooks/query/container"
import { Spinner } from "../ui/spinner"

interface ContainerFormateType {
  title: string;
  url: string;
}

interface SideContentType {
  title: string;
  items: ContainerFormateType[];
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const { data: containers, isPending } = useGetAllContainer();
  const [containerFormate, setContainerFormate] = React.useState<SideContentType[]>([
    {
      title: "How it works",
      items: [
        {
          title: "Architecture",
          url: "/container/architecture",
        },
      ],
    }
  ]);

  React.useEffect(() => {
    if (!containers?.containers) return

    setContainerFormate([
      {
        title: "How it works",
        items: [
          {
            title: "Architecture",
            url: "/container/architecture",
          },
        ],
      },
      {
        title: "Your Containers",
        items: containers.containers.map((m) => ({
          title: m.name!,
          url: `/container/${m.id}`,
        })),
      },
    ])
  }, [containers])

  if (isPending) {
    return (
      <Sidebar {...props}>
        <SidebarHeader>
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
              <GalleryVerticalEnd className="size-4" />
            </div>
            <div className="flex flex-col gap-0.5 leading-none">
              <span className="font-medium">Reliquary</span>
            </div>
          </SidebarMenuButton>
          <SearchForm />
        </SidebarHeader>
        <SidebarContent>
          {/* We create a SidebarGroup for each parent. */}
          <div className="w-full flex justify-center items-center min-h-[50vh]">
            <Spinner />
          </div>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
    )
  }

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
            <GalleryVerticalEnd className="size-4" />
          </div>
          <div className="flex flex-col gap-0.5 leading-none">
            <span className="font-medium">Reliquary</span>
          </div>
        </SidebarMenuButton>
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {containerFormate?.map((item, idx: number) => (
          <SidebarGroup key={idx}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
