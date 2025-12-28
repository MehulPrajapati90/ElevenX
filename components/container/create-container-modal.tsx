"use client"

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateContainer } from "@/hooks/query/container";
import { Plus, Trash } from "lucide-react";
import { FormEvent, useState } from "react";
import { OurFileRouter, UploadDropzone } from "@/lib/uploadThings";
import { toast } from "sonner";
import Image from "next/image";
import Hint from "../ui/hint";

export function CreateContainerModel() {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState<string>("");
    const [containerCover, setContainerCover] = useState<string>("");
    const { mutateAsync, isPending } = useCreateContainer();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!title.trim()) {
            toast.error("Container field are required")
            return
        }

        const res = await mutateAsync({ name: title, image: containerCover });

        console.log(res)

        if (res.success) {
            toast.success(res.message);
            setTitle("")
            setOpen(false);
        } else {
            toast.error(res.message)
        }
    }

    const handleRemove = () => {
        setContainerCover("");
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
                            <Label htmlFor="name">Container Name</Label>
                            <Input
                                id="name"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="container name"
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="name">Container Cover</Label>
                            {containerCover ? (
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
                                        src={containerCover}
                                        className="object-cover"
                                    />
                                </div>
                            ) : (
                                <div className="rounded-xl bg-white/5 outline-dashed outline-black/10 object-fill ">
                                    <UploadDropzone<OurFileRouter, "ContainerCoverImgUpload">
                                        endpoint="ContainerCoverImgUpload"
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
                                            setContainerCover(res?.[0].url);
                                        }}
                                        onUploadError={console.error}
                                    />
                                </div>
                            )}
                        </div>
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
}
