import { ActionsList } from '@/components/actions-list';
import { getAuctionData } from '@/hooks/auction-data'

export default async function HomePage() {

  const items = await getAuctionData();

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ActionsList items={items} />
    </main>
  )
}
