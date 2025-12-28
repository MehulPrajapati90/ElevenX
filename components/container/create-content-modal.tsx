"use client"

import { Button } from "@/components/ui/button"
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateContainerContent } from "@/hooks/query/container";
import { Plus, Trash } from "lucide-react";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { fieldTypeEnum, FieldContentType } from "@/schema";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import Hint from "../ui/hint"
import Image from "next/image"
import { OurFileRouter, UploadDropzone } from "@/lib/uploadThings";

interface ContainerContentProps {
    containerId: string
}

export function CreateContentModal({ containerId }: ContainerContentProps) {
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState<string>("");
    const [contentCover, setContentCover] = useState<string>("");
    const [type, setType] = useState<FieldContentType | "">("");

    const { mutateAsync, isPending } = useCreateContainerContent();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!type.trim() || !content.trim()) {
            toast.error("Container name is required")
            return
        }

        const res = await mutateAsync({ containerId: containerId, content: content, type: type });

        console.log(res)

        if (res.success) {
            toast.success(res.message);
            setContent("");
            setType("");
            setOpen(false);
        } else {
            toast.error(res.message)
        }
    };

    const handleRemove = () => {
        setContentCover("");
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div className="flex justify-center items-center size-15 bg-neutral-300 rounded-full">
                    <Plus size={30} className="text-white" />
                </div>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Create Container</DialogTitle>
                        <DialogDescription className="text-[13px] font-sans tracking-[-0.1px]">
                            Make changes to your container. Click save when you&apos;re done.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 pt-8">
                        <div className="grid gap-3">
                            <Label htmlFor="name">Content Type</Label>
                            <Select value={type} onValueChange={(value) => setType(value as unknown as "")}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select type of content" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {fieldTypeEnum?.enumValues?.map((m) => (
                                            <SelectItem key={m} value={m}>
                                                {m.toLocaleLowerCase()}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        {type === "IMAGE" && (
                            <div className="grid gap-3">
                                <Label htmlFor="name">Container Cover</Label>
                                {contentCover ? (
                                    <div className="relative aspect-video rounded-xl overflow-hidden border border-white/15 bg-black/40">
                                        <div className="absolute top-2 right-2 z-10">
                                            <Hint asChild side="left" label="Remove thumbnail">
                                                <Button type="button" onClick={handleRemove} disabled={isPending} className="h-auto w-auto p-1.5 bg-white/10 hover:bg-white/20">
                                                    <Trash className="h-4 w-4" />
                                                </Button>
                                            </Hint>
                                        </div>
                                        <Image
                                            fill
                                            alt="Container Cover Image"
                                            src={contentCover}
                                            className="object-cover"
                                        />
                                    </div>
                                ) : (
                                    <div className="rounded-xl bg-white/5 outline-dashed outline-black/10 object-fill ">
                                        <UploadDropzone<OurFileRouter, "ContentImageUpload">
                                            endpoint="ContentImageUpload"
                                            appearance={{
                                                label: {
                                                    color: "#000"
                                                },
                                                allowedContent: {
                                                    color: "#c0c0c0"
                                                },
                                                button: {
                                                    backgroundColor: "#4e7bff",
                                                    padding: "8px 10px"
                                                }
                                            }}
                                            onClientUploadComplete={(res) => {
                                                setContentCover(res?.[0].url);
                                            }}
                                            onUploadError={console.error}
                                        />
                                    </div>
                                )}
                            </div>
                        )}
                        {type === "VIDEO" && (
                            <div className="grid gap-3">
                                <Label htmlFor="name">Container Cover</Label>
                                {contentCover ? (
                                    <div className="relative aspect-video rounded-xl overflow-hidden border border-white/15 bg-black/40">
                                        <div className="absolute top-2 right-2 z-10">
                                            <Hint asChild side="left" label="Remove thumbnail">
                                                <Button type="button" onClick={handleRemove} disabled={isPending} className="h-auto w-auto p-1.5 bg-white/10 hover:bg-white/20">
                                                    <Trash className="h-4 w-4" />
                                                </Button>
                                            </Hint>
                                        </div>
                                        <Image
                                            fill
                                            alt="Container Cover Image"
                                            src={contentCover}
                                            className="object-cover"
                                        />
                                    </div>
                                ) : (
                                    <div className="rounded-xl bg-white/5 outline-dashed outline-black/10 object-fill ">
                                        <UploadDropzone<OurFileRouter, "ContentVideoUpload">
                                            endpoint="ContentVideoUpload"
                                            appearance={{
                                                label: {
                                                    color: "#000"
                                                },
                                                allowedContent: {
                                                    color: "#c0c0c0"
                                                },
                                                button: {
                                                    backgroundColor: "#4e7bff",
                                                    padding: "8px 10px"
                                                }
                                            }}
                                            onClientUploadComplete={(res) => {
                                                setContentCover(res?.[0].url);
                                            }}
                                            onUploadError={console.error}
                                        />
                                    </div>
                                )}
                            </div>
                        )}
                        {type === "YOUTUBE" && (
                            <div className="grid gap-3">
                                <Label htmlFor="name">Container Content</Label>
                                <Input
                                    id="name"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder="content name"
                                />
                            </div>
                        )}
                        {type === "MISCELLANEOUS" && (
                            <div className="grid gap-3">
                                <Label htmlFor="name">Container Content</Label>
                                <Input
                                    id="name"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder="content name"
                                />
                            </div>
                        )}
                        {type === "INSTAGRAM" && (
                            <div className="grid gap-3">
                                <Label htmlFor="name">Container Content</Label>
                                <Input
                                    id="name"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder="content name"
                                />
                            </div>
                        )}
                        {type === "TWITTER" && (
                            <div className="grid gap-3">
                                <Label htmlFor="name">Container Content</Label>
                                <Input
                                    id="name"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder="content name"
                                />
                            </div>
                        )}
                    </div>

                    <DialogFooter className="pt-5">
                        <DialogClose asChild>
                            <Button type="button" variant="outline">Cancel</Button>
                        </DialogClose>

                        <Button disabled={isPending} type="submit">
                            Save changes
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
};