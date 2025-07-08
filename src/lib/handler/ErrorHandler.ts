import {
    PrismaClientInitializationError,
    PrismaClientKnownRequestError,
    PrismaClientUnknownRequestError
} from "@prisma/client/runtime/library";

export interface ErrorData {
    name: string;
    message: string;
    stack?: string;
    data?: null;
}

export const PrismaErrorHandler = async (error: unknown) => {
    let returnData: ErrorData;

    if ((error instanceof PrismaClientKnownRequestError || error instanceof PrismaClientInitializationError || error instanceof PrismaClientUnknownRequestError) && error instanceof Error) {
        returnData = {
            name: error.name, message: error.message, stack: error.stack,
        }
    }
    if (error instanceof Error) returnData = {
        name: error.name, message: error.message, stack: error.stack,
    }

    return returnData
}