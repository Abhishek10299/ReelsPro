import { connectToDb } from "@/lib/dbConnection";
import User from "@/models/User";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        {
          error: "Email and Password are require",
        },
        { status: 401 }
      );
    }

    await connectToDb();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        {
          error: "User already exist",
        },
        {
          status: 400,
        }
      );
    }

    await User.create({ email, password });

    return NextResponse.json(
      {
        message: "User register successfully",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log("failed to register the user");
    return NextResponse.json(
      {
        error: "Failed to register the user",
      },
      { status: 500 }
    );
  }
}
