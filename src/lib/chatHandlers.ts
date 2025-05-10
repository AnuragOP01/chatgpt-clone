// src/lib/chatHandlers.ts

import { NextResponse } from "next/server";
import { prisma } from "../../lib/db";

export async function createChatSession(request: Request) {
  try {
    const body = await request.json();
    const { userId, question } = body;
    const smallquestion = question.slice(0, 25);

    const session = await prisma.chatLookup.create({
      data: {
        topicName: smallquestion,
        userId,
      },
    });

    return NextResponse.json(session);
  } catch {
    return NextResponse.json(
      { error: "Error creating chat session" },
      { status: 500 }
    );
  }
}

export async function createQuestionAnswer(request: Request) {
  try {
    const body = await request.json();
    const { lookupId, question, answer } = body;

    const result = await prisma.chatQues.create({
      data: {
        question,
        lookupId,
        answer: {
          create: {
            answer,
          },
        },
      },
      include: {
        answer: true,
      },
    });

    return NextResponse.json(result);
  } catch  {
    return NextResponse.json(
      { error: "Error creating question and answer" },
      { status: 500 }
    );
  }
}
