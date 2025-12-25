"use server";

import { currentUser } from "./auth";
import { client } from "@/lib/db/pg-db";
import { containers, containerfields } from "@/schema";
import { CreateContainerContentType, CreateContainerType, DeleteContainer, DeleteContainerContent, UpdateContainerContentType, UpdateContainerType } from "@/types";
import { and, eq } from "drizzle-orm";

// import {client} from "@/lib/db/neon-db";

export const createContainer = async ({ image, name }: CreateContainerType) => {
    try {
        const { user } = await currentUser();

        await client
            .insert(containers)
            .values({
                name: name,
                image: image,
                userId: user?.id!,

            })
            .returning()

        return {
            success: true,
            message: "Container created successfully"
        }
    } catch (e) {
        return {
            success: false,
            message: "failed to create container",
        }
    }
};

export const deleteContainer = async ({ containerId }: DeleteContainer) => {
    try {
        const { user } = await currentUser();

        await client
            .delete(containers)
            .where(
                and(
                    eq(containers.id, containerId),
                    eq(containers.userId, user?.id!)
                )
            );

        return {
            success: true,
            message: "Container deleted successfully"
        }
    } catch (e) {
        return {
            success: false,
            message: "failed to delete container",
        }
    }
};

export const getAllContainers = async () => {
    try {
        const { user } = await currentUser();

        const getContainers = await client.query.containers.findMany({
            where: eq(containers.userId, user!.id),
            orderBy: (containers, { desc }) => [desc(containers.createdAt)],
            columns: {
                name: true,
                image: true,
                createdAt: true
            },
            with: {
                containerfields: {
                    columns: {
                        updatedAt: false,
                        userId: false
                    }
                },
            }
        });

        return {
            success: true,
            message: "Container deleted successfully",
            containers: getContainers
        }
    } catch (e) {
        return {
            success: false,
            message: "failed to fetch container",
        }
    }
};

export const updateContainer = async ({ image, name, containerId }: UpdateContainerType) => {
    try {
        const { user } = await currentUser();

        await client
            .update(containers)
            .set({
                name: name,
                image: image
            })
            .where(
                and(
                    eq(containers.id, containerId),
                    eq(containers.userId, user?.id!)
                )
            )
            .returning();

        return {
            success: true,
            message: "Container updated successfully"
        }
    } catch (e) {
        return {
            success: false,
            message: "failed to update container",
        }
    }
};

// Container - Fields

export const updateContainerContent = async ({ type, content, containerContentId }: UpdateContainerContentType) => {
    try {
        const { user } = await currentUser();

        await client
            .update(containerfields)
            .set({
                content: content,
                fieldType: type
            })
            .where(
                and(
                    eq(containerfields.id, containerContentId),
                    eq(containerfields.userId, user?.id!)
                )
            )
            .returning();

        return {
            success: true,
            message: "Content updated successfully"
        };
    } catch (e) {
        return {
            success: false,
            message: "failed to delete container",
        }
    }
};

export const deleteContainerContent = async ({ containerContentId }: DeleteContainerContent) => {
    try {
        const { user } = await currentUser();

        await client
            .delete(containerfields)
            .where(
                and(
                    eq(containerfields.id, containerContentId),
                    eq(containerfields.userId, user?.id!)
                )
            );

        return {
            success: true,
            message: "Content deleted successfully"
        }
    } catch (e) {
        return {
            success: false,
            message: "failed to delete container",
        }
    }
};

export const createContainerContent = async ({ content, type, containerId }: CreateContainerContentType) => {
    try {
        const { user } = await currentUser();

        await client
            .insert(containerfields)
            .values({
                containerId: containerId,
                content: content,
                fieldType: type,
                userId: user?.id!,
            })
            .returning()

        return {
            success: true,
            message: "Container Content created successfully"
        }
    } catch (e) {
        return {
            success: false,
            message: "failed to create container",
        }
    }
};