import { connectToDb } from "@/lib/dbConnection";
import User from "@/models/User";
import { signUpSchema } from "@/schema/sign-upSchema";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    const result = signUpSchema.safeParse({ email, password });

    if (!result.success) {
      const signUpError =
        result.error.format().email?._errors ||
        result.error.format().password?._errors ||
        [];

      return NextResponse.json(
        {
          error:
            signUpError?.length > 0
              ? signUpError.join(",")
              : "Invalid quary paramaters",
        },
        {
          status: 400,
        }
      );
    }

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
