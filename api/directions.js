export const config = { runtime: 'edge' }

export default async function handler(req) {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    })
  }

  try {
    const { fromLng, fromLat, toLng, toLat, profile } = await req.json()
    const apiKey = process.env.VITE_ORS_API_KEY

    const url = `https://api.openrouteservice.org/v2/directions/${profile}?api_key=${apiKey}&start=${fromLng},${fromLat}&end=${toLng},${toLat}`
    const res = await fetch(url)
    const data = await res.json()

    return new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    })
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    })
  }
}
