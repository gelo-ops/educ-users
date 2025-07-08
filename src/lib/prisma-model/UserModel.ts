import {prisma} from "@/lib/prisma";


type ReturnData = | {
    success: true; name: "Success"; message: string; data?: any;
} | {
    success: false; name: string; message: string; stack?: string; code?: string;
};
export const ifEmailExist = async (email: string) => {
    let returnData: ReturnData;
    try {
        const findUser = await prisma.user.findFirst({
            where: {email}
        })
        console.debug(findUser, "test")
        if (!findUser) return {
            success: false, name: "NotFoundError", message: "User not found.",
        }
        returnData = {
            success: true, name: "Success", message: "User fetched successfully.", data: findUser,
        }

        return returnData
    } catch (e) {

    }
}