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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCreateContainer } from "@/hooks/query/container"
import { Plus } from "lucide-react"
import { FormEvent, useState } from "react"
import { toast } from "sonner";

export function CreateContainerModel() {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState<string>("");
    const { mutateAsync, isPending } = useCreateContainer();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!title.trim()) {
            toast.error("Container name is required")
            return
        }

        const res = await mutateAsync({ name: title });

        console.log(res)

        if (res.success) {
            toast.success(res.message);
            setTitle("")
            setOpen(false);
        } else {
            toast.error(res.message)
        }

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

                    <div className="grid gap-4 pt-5">
                        <div className="grid gap-3">
                            <Label htmlFor="name">Container Name</Label>
                            <Input
                                id="name"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="container name"
                            />
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
