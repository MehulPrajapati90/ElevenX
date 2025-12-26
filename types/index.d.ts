import { fieldTypeEnum } from "@/schema";

interface CreateContainerType {
    name: string;
    image?: string;
}

interface UpdateContainerType {
    name: string;
    image?: string;
    containerId: string;
}

interface UpdateContainerContentType {
    type: fieldTypeEnum;
    content: string;
    containerContentId: string
}

interface CreateContainerContentType {
    type: fieldTypeEnum;
    content: string;
    containerId: string;
}

interface DeleteContainer {
    containerId: string
}

interface DeleteContainerContent {
    containerContentId: string
}

interface GetContentbyContainerId {
    containerId: string
}

interface GetContentFilteredByTypes {
    filterType: fieldTypeEnum
}

interface CreateContentBySpecificType {
    filterType: fieldTypeEnum;
    containerId: string;
    content: string;
}