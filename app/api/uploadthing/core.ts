import { currentUser } from "@/actions/auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
    ContainerCoverImgUpload: f({
        image: {
            maxFileSize: "4MB",
            maxFileCount: 1
        }
    })
        .middleware(async () => {
            const { user } = await currentUser();
            if (!user) throw new UploadThingError("Unauthorized");
            return { user: user }
        })
        .onUploadComplete(async ({ file }) => {
            return { fileUrl: file.url }
        }),

    ContentImageUpload: f({
        image: {
            maxFileSize: "4MB",
            maxFileCount: 1
        }
    })
        .middleware(async () => {
            const { user } = await currentUser();
            if (!user) throw new UploadThingError("Unauthorized");
            return { user: user }
        })
        .onUploadComplete(async ({ file }) => {
            return { fileUrl: file.url }
        }),

    ContentVideoUpload: f({
        video: {
            maxFileSize: "64MB",
            maxFileCount: 1
        }
    })
        .middleware(async () => {
            const { user } = await currentUser();
            if (!user) throw new UploadThingError("Unauthorized");
            return { user: user }
        })
        .onUploadComplete(async ({ file }) => {
            return { fileUrl: file.url }
        }),


} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;