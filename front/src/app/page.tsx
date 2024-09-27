import { Player } from '@/player/Player'
import Link from 'next/link'

export default function Home() {
	return (
		<>
			<h1 className="font-medium text-4xl text-center mt-16 mb-6">
				Minimal player from RED Group [htmllessons.io]
			</h1>
			<div className="text-center mb-12">
				<Link
					href="/upload-video"
					className="hoverPrimary"
				>
					Upload a video
				</Link>
			</div>
			<div className="flex items-center justify-center">
				<Player />
			</div>
		</>
	)
}
