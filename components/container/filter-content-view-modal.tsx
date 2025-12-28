"use client"

import { Button } from "@/components/ui/button"
import { FieldContentType } from "@/schema";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { CheckCheck, Copy } from "lucide-react"
import { useState } from "react"
import { Input } from "../ui/input";
import TwitterEmbed from "./tweet-component";
import Image from "next/image";

interface ContentViewModalProps {
    content: string;
    contentType: FieldContentType;
    createdAt: Date;
}

const FilterContentViewModal = ({ content, contentType, createdAt }: ContentViewModalProps) => {
    const [copy, setCopy] = useState<boolean>(false)

    const handleCopy = (content: string) => {
        setCopy(true);

        navigator.clipboard.writeText(content);

        const timer = setTimeout(() => {
            setCopy(false);
        }, 2000);

        return () => clearTimeout(timer);
    };

    function toYouTubeEmbed(url: string) {
        try {
            const u = new URL(url);

            // youtu.be short link
            if (u.hostname === "youtu.be") {
                return `https://www.youtube.com/embed/${u.pathname.slice(1)}`;
            }

            // youtube.com/watch?v=
            if (u.searchParams.get("v")) {
                return `https://www.youtube.com/embed/${u.searchParams.get("v")}`;
            }

            return url;
        } catch {
            return url;
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="bg-muted/10 aspect-video rounded-[10px] flex justify-center items-center w-full h-15 hover:bg-neutral-100 duration-200 border">
                    {contentType.toLocaleLowerCase()}
                </div>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Content View</DialogTitle>
                    <DialogDescription className="text-[13px] font-sans tracking-[-0.1px]">
                        Here's your frequent saved content.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 pt-5">
                    <div className="grid gap-3">

                        {contentType === "MISCELLANEOUS" && (
                            <>
                                <div className="w-full flex flex-col items-start justify-center gap-1">
                                    <Label className="text-[13px] font-sans font-medium">Content</Label>
                                    <div className="w-full flex justify-center items-center gap-1">
                                        <Input
                                            id="name"
                                            value={content}
                                            onChange={() => content}
                                            className="font-sans"
                                        />
                                        <div onClick={() => handleCopy(content)} className="p-2 bg-neutral-200 rounded-[6px]">
                                            {!copy ? <Copy size={15} /> : <CheckCheck size={15} />}
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full flex flex-col justify-center items-start text-[12px] font-mono tracking-tight pt-2 gap-1">
                                    <div className="px-2 py-1 bg-neutral-300 text-neutral-800 rounded-[3px]">type: {contentType.toLocaleLowerCase()}</div>
                                    <div className="px-2 py-1 bg-neutral-300 text-neutral-800 rounded-[3px]">created at: {createdAt.toDateString()}</div>
                                </div>
                            </>
                        )}

                        {contentType === "YOUTUBE" && (
                            <>
                                <div className="w-full flex flex-col items-start justify-center gap-1">
                                    <Label className="text-[13px] font-sans font-medium">Content</Label>
                                    <div className="w-full flex justify-center items-center gap-1">
                                        <iframe
                                            src={toYouTubeEmbed(content)}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            className="aspect-video"
                                        />
                                    </div>
                                    <div className="w-full flex justify-center items-center gap-1 pt-3">
                                        <Input
                                            id="name"
                                            value={content}
                                            onChange={() => content}
                                            className="font-sans"
                                        />
                                        <div onClick={() => handleCopy(content)} className="p-2 bg-neutral-200 rounded-[6px]">
                                            {!copy ? <Copy size={15} /> : <CheckCheck size={15} />}
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full flex flex-col justify-center items-start text-[12px] font-mono tracking-tight pt-2 gap-1">
                                    <div className="px-2 py-1 bg-neutral-300 text-neutral-800 rounded-[3px]">type: {contentType.toLocaleLowerCase()}</div>
                                    <div className="px-2 py-1 bg-neutral-300 text-neutral-800 rounded-[3px]">created at: {createdAt.toDateString()}</div>
                                </div>
                            </>
                        )}

                        {/* TODO */}
                        {contentType === "VIDEO" && (
                            <>
                                <div className="w-full flex flex-col items-start justify-center gap-1">
                                    <Label className="text-[13px] font-sans font-medium">Content</Label>

                                    {/* TO:CHECK */}
                                    <div className="aspect-video w-full overflow-hidden rounded-lg">
                                        <video
                                            src={content}
                                            className="w-full h-full object-cover"
                                            controls
                                        />
                                    </div>
                                </div>

                                <div className="w-full flex flex-col justify-center items-start text-[12px] font-mono tracking-tight pt-2 gap-1">
                                    <div className="px-2 py-1 bg-neutral-300 text-neutral-800 rounded-[3px]">type: {contentType.toLocaleLowerCase()}</div>
                                    <div className="px-2 py-1 bg-neutral-300 text-neutral-800 rounded-[3px]">created at: {createdAt.toDateString()}</div>
                                </div>
                            </>
                        )}

                        {/* TODO */}
                        {contentType === "IMAGE" && (
                            <>
                                <div className="w-full flex flex-col items-start justify-center gap-1">
                                    <Label className="text-[13px] font-sans font-medium">Content</Label>
                                    <div className="w-full flex justify-center items-center gap-1">
                                        <Image width={20} height={20} sizes="20" alt="content" src={content} className="w-full min-h-full" />
                                    </div>
                                </div>

                                <div className="w-full flex flex-col justify-center items-start text-[12px] font-mono tracking-tight pt-2 gap-1">
                                    <div className="px-2 py-1 bg-neutral-300 text-neutral-800 rounded-[3px]">type: {contentType.toLocaleLowerCase()}</div>
                                    <div className="px-2 py-1 bg-neutral-300 text-neutral-800 rounded-[3px]">created at: {createdAt.toDateString()}</div>
                                </div>
                            </>
                        )}

                        {/* TODO */}
                        {contentType === "INSTAGRAM" && (
                            <>
                                {/* <div className="w-full flex flex-col items-start justify-center gap-1">
                                    <Label className="text-[13px] font-sans font-medium">Content</Label>
                                    <div className="w-full flex justify-center items-center gap-1">
                                        <Input
                                            id="name"
                                            value={content}
                                            onChange={() => content}
                                            className="font-sans"
                                        />
                                        <div onClick={() => handleCopy(content)} className="p-2 bg-neutral-200 rounded-[6px]">
                                            {!copy ? <Copy size={15} /> : <CheckCheck size={15} />}
                                        </div>
                                    </div>
                                </div> */}

                                <div className="w-full flex flex-col justify-center items-start text-[12px] font-mono tracking-tight pt-2 gap-1">
                                    <div className="px-2 py-1 bg-neutral-300 text-neutral-800 rounded-[3px]">type: {contentType.toLocaleLowerCase()}</div>
                                    <div className="px-2 py-1 bg-neutral-300 text-neutral-800 rounded-[3px]">created at: {createdAt.toDateString()}</div>
                                </div>
                            </>
                        )}

                        {contentType === "TWITTER" && (
                            <>
                                <Label className="text-[13px] font-sans font-medium leading-0">Content</Label>
                                <TwitterEmbed url={content.trim()} />

                                <div className="w-full flex flex-col justify-center items-start text-[12px] font-mono tracking-tight pt-2 gap-1">
                                    <div className="px-2 py-1 bg-neutral-300 text-neutral-800 rounded-[3px]">type: {contentType.toLocaleLowerCase()}</div>
                                    <div className="px-2 py-1 bg-neutral-300 text-neutral-800 rounded-[3px]">created at: {createdAt.toDateString()}</div>
                                </div>
                            </>
                        )}

                    </div>
                </div>

                <DialogFooter className="pt-5">
                    <DialogClose asChild>
                        <Button type="button" variant="outline">Close</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default FilterContentViewModal;