// /pages/api/route.ts
import {prisma} from "@/lib/prisma";
import {NextRequest, NextResponse} from "next/server";
import {Prisma} from "@prisma/client"; // <-- this is required for the error types
import {isValidEmail} from "@/utils/validation";


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
            skip: pageNumber * perPage,
            take: perPage,
            orderBy: {
                [sortField as string]: sortOrder,
            },
        });

        const total = await prisma.user.count();

        return NextResponse.json({total, users}, {status: 200});
    } catch (error) {
        console.error("GET /api/users error:", error);
        return NextResponse.json({message: "Internal server error"}, {status: 500});
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
        const user = await prisma.user.create({
            data: {name, email},
        });
        return NextResponse.json({user, message: "succesfully added"}, {status: 201});

    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                // P2002 = Unique constraint failed
                return NextResponse.json({message: "A user with this email already exists."}, {status: 409});
            }
        }
        return NextResponse.json({message: "Internal server error"}, {status: 500});

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
            return NextResponse.json(
                {message: "User ID is required"},
                {status: 400}
            );
        }
        if (!name || !email) {
            return NextResponse.json({message: "Name and email are required"}, {status: 400});
        }
        const updateData: Record<string, any> = {};
        if (name) updateData.name = name;
        if (email) {
            if (!isValidEmail(email)) {
                return NextResponse.json(
                    {message: "Invalid email format"},
                    {status: 400}
                );
            }
            updateData.email = email;
        }

        if (Object.keys(updateData).length === 0) {
            return NextResponse.json(
                {message: "Nothing to update"},
                {status: 400}
            );
        }

        const updatedUser = await prisma.user.update({
            where: {id},
            data: updateData,
        });

        return NextResponse.json({user: updatedUser}, {status: 200});
    } catch (error: any) {
        console.error("PATCH /api/users error:", error);
        if (error.code === "P2025") {
            // Prisma "Record not found"
            return NextResponse.json({message: "User not found"}, {status: 404});
        }
        return NextResponse.json(
            {message: "Internal server error"},
            {status: 500}
        );
    }
}

export async function DELETE(req: NextRequest) {
    try {

        const {searchParams} = new URL(req.url);
        console.debug("searchParams", searchParams)
        const id = searchParams.get("id");
        if (!id) {
            return NextResponse.json(
                {message: "User ID is required"},
                {status: 400}
            );
        }

        await prisma.user.delete({
            where: {id: id},
        });

        return NextResponse.json({message: "User deleted successfully"});
    } catch (error: any) {
        console.error("DELETE /api/users error:", error);
        if (error.code === "P2025") {
            return NextResponse.json(
                {message: "User not found"},
                {status: 404}
            );
        }
        return NextResponse.json(
            {message: "Internal server error"},
            {status: 500}
        );
    }
}
