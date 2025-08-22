import { AuctionItem } from '@/types/auction'

export async function getAuctionData(): Promise<AuctionItem[]> {
  try {
    const res = await fetch(
      "https://sttrafficplatformassets.blob.core.windows.net/traffic-assets/lots.json"
    )
    if (!res.ok) {
      throw new Error("Failed to fetch auction data")
    }
    const data: AuctionItem[] = await res.json()
    return data
  } catch (error) {
    console.error("Error fetching auction data:", error);
    return [];
  }  
}