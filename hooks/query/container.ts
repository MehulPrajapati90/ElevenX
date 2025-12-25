import { createContainer, createContainerContent, deleteContainer, deleteContainerContent, getAllContainers, getContentbyContainerId, updateContainer, updateContainerContent } from "@/actions/container";
import { CreateContainerContentType, CreateContainerType, DeleteContainer, DeleteContainerContent, GetContentbyContainerId, UpdateContainerContentType, UpdateContainerType } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreateContainer = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ image, name }: CreateContainerType) => await createContainer({ name, image }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['container'] })
        }
    })
};

export const useDeleteContainer = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ containerId }: DeleteContainer) => await deleteContainer({ containerId }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['container'] })
        }
    })
};

export const useGetAllContainer = () => {
    return useQuery({
        queryKey: ['container'],
        queryFn: async () => getAllContainers()
    })
};

export const useUpdateContainer = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ image, name, containerId }: UpdateContainerType) => await updateContainer({ containerId, name, image }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['container'] })
        }
    })
};

// Container Content

export const useUpdateContainerContent = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ type, content, containerContentId }: UpdateContainerContentType) => await updateContainerContent({ containerContentId, content, type }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['container'] })
        }
    })
};

export const useDeleteContainerContainer = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ containerContentId }: DeleteContainerContent) => await deleteContainerContent({ containerContentId }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['container'] })
        }
    })
};

export const useCreateContainerContent = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ content, type, containerId }: CreateContainerContentType) => await createContainerContent({ containerId, content, type }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['container'] })
        }
    })
};

export const useGetContentbyContainerId = ({ containerId }: GetContentbyContainerId) => {
    return useQuery({
        queryKey: ['container-content'],
        queryFn: async () => getContentbyContainerId({ containerId })
    })
}