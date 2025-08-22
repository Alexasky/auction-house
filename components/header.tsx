import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const Header = ({isInner = false} : {isInner?:boolean}) => {
	return (
		<>
			{isInner ? (
				<header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
					<Link href={'/'} className='flex items-center g-2'>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Auction House
          </Link>
        </div>
      </header>
			) : (
				<header className="border-b border-border bg-card">
					<div className="container text-center mx-auto px-4 sm:px-6 lg:px-8 py-8">
						<h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground text-balance">Auction House</h1>
						<h2 className="text-muted-foreground mt-3 text-lg leading-relaxed">
							Discover exceptional items from premier auction houses
						</h2>
					</div>
				</header>
			)}
		</>		
	);
}