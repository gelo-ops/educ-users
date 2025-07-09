// /pages/api/route.ts
import {prisma} from "@/lib/prisma";
import {NextRequest, NextResponse} from "next/server";
import {isValidEmail} from "@/utils/validation";
import {PrismaErrorHandler} from "@/lib/handler/ErrorHandler";
import {ifEmailExist} from "@/lib/prisma-model/UserModel";
import {UserUpdate} from "@/app/(pages)/users/component/types";


/**
 * GET /api/users
 * Supports pagination and sorting
 */
const DEFAULT_PAGE = 0;
const DEFAULT_PAGE_SIZE = 10;
const HTTP_BAD_REQUEST = 400;
const HTTP_OK = 200;
const HTTP_CONFLICT = 409;
const HTTP_CREATED = 201;

export async function GET(req: NextRequest) {
    try {
        const {searchParams} = new URL(req.url);


        const page = Number(searchParams.get("page")) || DEFAULT_PAGE;
        const pageSize = Number(searchParams.get("pageSize")) || DEFAULT_PAGE_SIZE;
        const sortField = searchParams.get("sortField") || "createdAt";
        const sortOrder = searchParams.get("sortOrder") === "asc" ? "asc" : "desc";
        const pageNumber = page;
        const perPage = pageSize;

        const validFields = ["id", "name", "email", "createdAt", "updatedAt"];
        if (!validFields.includes(sortField as string)) {
            return NextResponse.json({message: "Invalid sort field"}, {status: HTTP_BAD_REQUEST});
        }

        if (sortOrder !== "asc" && sortOrder !== "desc") {
            return NextResponse.json({message: "Invalid sort order"}, {status: HTTP_BAD_REQUEST});
        }

        const users = await prisma.user.findMany({
            skip: pageNumber * perPage, take: perPage, orderBy: {
                [sortField as string]: sortOrder,
            },
        });

        const total = await prisma.user.count();

        return NextResponse.json({total, users}, {status: HTTP_OK});
    } catch (error) {
        return NextResponse.json(PrismaErrorHandler(error));
    }
}

/**
 * POST /api/users
 * Example create user
 */
export async function POST(req: NextRequest) {
    try {
        const {name, email} = await req.json();

        if (!name || !email) {
            return NextResponse.json({message: "Name and email are required"}, {status: HTTP_BAD_REQUEST});

        }
        if (!isValidEmail(email)) {
            return NextResponse.json({message: "Invalid email format"}, {status: HTTP_BAD_REQUEST});
        }
        let isEmailExist = await ifEmailExist(email);
        if (isEmailExist.success) {
            return NextResponse.json({message: "A user with this email already exists."}, {status: HTTP_CONFLICT});
        }
        const user = await prisma.user.create({
            data: {name, email},
        });
        return NextResponse.json({user, message: "Successfully added"}, {status: HTTP_CREATED});

    } catch (error) {
        return NextResponse.json(PrismaErrorHandler(error));

    }
}

/**
 * PUT /api/users
 * Update a user by id
 * Expects JSON body: { id, name?, email? }
 */
export async function PUT(req: NextRequest) {
    try {
        const {id, name, email} = await req.json();

        if (!id) {
            return NextResponse.json({message: "User ID is required"}, {status: HTTP_BAD_REQUEST});
        }
        if (!name || !email) {
            return NextResponse.json({message: "Name and email are required"}, {status: HTTP_BAD_REQUEST});
        }
        const updateData: Partial<UserUpdate> = {};
        if (name) updateData.name = name;
        if (email) {
            if (!isValidEmail(email)) {
                return NextResponse.json({message: "Invalid email format"}, {status: HTTP_BAD_REQUEST});
            }
            updateData.email = email;
        }

        if (Object.keys(updateData).length === 0) {
            return NextResponse.json({message: "Nothing to update"}, {status: HTTP_BAD_REQUEST});
        }

        const updatedUser = await prisma.user.update({
            where: {id}, data: updateData,
        });

        return NextResponse.json({user: updatedUser}, {status: HTTP_OK});
    } catch (error: unknown) {
        return NextResponse.json(PrismaErrorHandler(error));
    }
}

export async function DELETE(req: NextRequest) {
    try {

        const {searchParams} = new URL(req.url);
        const id = searchParams.get("id");
        if (!id) {
            return NextResponse.json({message: "User ID is required"}, {status: HTTP_BAD_REQUEST});
        }

        await prisma.user.delete({
            where: {id: id},
        });

        return NextResponse.json({message: "User deleted successfully"});
    } catch (error) {
        return NextResponse.json(NextResponse.json(PrismaErrorHandler(error)));
    }
}
