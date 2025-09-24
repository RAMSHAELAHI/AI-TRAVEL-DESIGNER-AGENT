import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { destination, budget, dates } = body;

    // For now, return a mock travel plan (we’ll connect OpenAI later)
    const plan = `
      ✈️ Travel Plan for ${destination}
      Budget: ${budget}
      Dates: ${dates}

      Day 1: Arrival and explore the city center.
      Day 2: Visit local attractions and try popular restaurants.
      Day 3: Relax, shopping, and cultural experiences.
      Day 4: Day trip to nearby destination.
      Day 5: Departure.
    `;

    return NextResponse.json({ success: true, plan });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Something went wrong" }, { status: 500 });
  }
}
