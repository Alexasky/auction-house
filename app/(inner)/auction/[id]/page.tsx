import { getAuctionData } from "@/hooks/auction-data"
import { Auction } from '@/components/auction'


export default async function ItemDetailPage({params}: {params: {id: string}}) {
  const items = await getAuctionData()
  const paramsPage = await params;
	const currentItem = items.find((item) => item.id === Number.parseInt(paramsPage.id))
  
  return (
    <div>
			{currentItem && <Auction item={currentItem}  />}
		</div>
  )
}
