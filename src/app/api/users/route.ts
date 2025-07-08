// /pages/api/route.ts
import {prisma} from "@/lib/prisma";
import {NextRequest, NextResponse} from "next/server";
import {isValidEmail} from "@/utils/validation";
import {PrismaErrorHandler} from "@/lib/handler/ErrorHandler";
import {ifEmailExist} from "@/lib/prisma-model/UserModel";


/**
 * GET /api/users
 * Supports pagination and sorting
 */

export async function GET(req: NextRequest) {
    try {
        const {searchParams} = new URL(req.url);

        const page = parseInt(searchParams.get("page") || "0");
        const pageSize = parseInt(searchParams.get("pageSize") || "10");
        const sortField = searchParams.get("sortField") || "createdAt";
        const sortOrder = searchParams.get("sortOrder") === "asc" ? "asc" : "desc";
        const pageNumber = page;
        const perPage = pageSize;

        const validFields = ["id", "name", "email", "createdAt", "updatedAt"];
        if (!validFields.includes(sortField as string)) {
            return NextResponse.json({message: "Invalid sort field"}, {status: 400});
        }

        if (sortOrder !== "asc" && sortOrder !== "desc") {
            return NextResponse.json({message: "Invalid sort order"}, {status: 400});
        }

        const users = await prisma.user.findMany({
            skip: pageNumber * perPage, take: perPage, orderBy: {
                [sortField as string]: sortOrder,
            },
        });

        const total = await prisma.user.count();

        return NextResponse.json({total, users}, {status: 200});
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
            return NextResponse.json({message: "Name and email are required"}, {status: 400});

        }
        if (!isValidEmail(email)) {
            return NextResponse.json({message: "Invalid email format"}, {status: 400});
        }
        let isEmailExist = await ifEmailExist(email);
        if (isEmailExist.success) {
            return NextResponse.json({message: "A user with this email already exists."}, {status: 409});
        }
        const user = await prisma.user.create({
            data: {name, email},
        });
        return NextResponse.json({user, message: "succesfully added"}, {status: 201});

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
            return NextResponse.json({message: "User ID is required"}, {status: 400});
        }
        if (!name || !email) {
            return NextResponse.json({message: "Name and email are required"}, {status: 400});
        }
        const updateData: Record<string, unknown> = {};
        if (name) updateData.name = name;
        if (email) {
            if (!isValidEmail(email)) {
                return NextResponse.json({message: "Invalid email format"}, {status: 400});
            }
            updateData.email = email;
        }

        if (Object.keys(updateData).length === 0) {
            return NextResponse.json({message: "Nothing to update"}, {status: 400});
        }

        const updatedUser = await prisma.user.update({
            where: {id}, data: updateData,
        });

        return NextResponse.json({user: updatedUser}, {status: 200});
    } catch (error: unknown) {
        return NextResponse.json(PrismaErrorHandler(error));
    }
}

export async function DELETE(req: NextRequest) {
    try {

        const {searchParams} = new URL(req.url);
        const id = searchParams.get("id");
        if (!id) {
            return NextResponse.json({message: "User ID is required"}, {status: 400});
        }

        await prisma.user.delete({
            where: {id: id},
        });

        return NextResponse.json({message: "User deleted successfully"});
    } catch (error) {
        return NextResponse.json(NextResponse.json(PrismaErrorHandler(error)));
    }
}
