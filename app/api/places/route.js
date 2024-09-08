import { NextResponse } from "next/server";

const apiKey = process.env.GOOGLE_MAPS_API_KEY

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const input = searchParams.get("input")

  if (!input) {
    return NextResponse.json({ error: "No input provided" }, { status: 400 })
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`
    )

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch data from Google Places API" }, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: "An error occurred while fetching data" }, { status: 500 })
  }
}
