import { NextResponse } from "next/server";

const apiKey = process.env.GOOGLE_MAPS_API_KEY

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const placeId = searchParams.get("placeId")
  const sessionToken = searchParams.get("sessionToken")

  if (!placeId) return NextResponse.json({ error: "No place ID provided" }, { status: 400 })
  if (!sessionToken) return NextResponse.json({ error: "No session token provided" }, { status: 400 })

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(placeId)}&fields=geometry&language=es&key=${apiKey}&sessiontoken=${sessionToken}`
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