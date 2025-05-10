// src/app/api/chat-sessions/route.ts

import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/db";
import {createChatSession, createQuestionAnswer } from "@/lib/chatHandlers";
// import {
//   createChatSession,
//   createQuestionAnswer,
// } from "../../../../lib/chatHandlers";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const sessionId = searchParams.get("sessionId");

  try {
    if (userId) {
      const sessions = await prisma.chatLookup.findMany({
        where: { userId },
        include: {
          questions: {
            include: { answer: true },
          },
        },
      });
      return NextResponse.json(sessions);
    }

    if (sessionId) {
      const session = await prisma.chatLookup.findUnique({
        where: { id: sessionId },
        include: {
          questions: {
            include: { answer: true },
          },
        },
      });

      if (!session) {
        return NextResponse.json(
          { error: "Session not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(session);
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        fullname: true,
        username: true,
        email: true,
        createdAt: true,
      },
    });

    return NextResponse.json(users);
  } catch  {
    return NextResponse.json(
      { error: "Error fetching data" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type } = body;

    switch (type) {
      case "chat_session":
        return await createChatSession(request);

      case "qa":
        return await createQuestionAnswer(request);

      default:
        return NextResponse.json(
          { error: "Invalid request type" },
          { status: 400 }
        );
    }
  } catch  {
    return NextResponse.json(
      { error: "Error processing request" },
      { status: 500 }
    );
  }
}
