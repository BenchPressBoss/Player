import { useOutside } from '@/hooks/useOutside'
import cn from 'clsx'
import { EnumPlayerQuality } from './player.types'

const QUALITIES: EnumPlayerQuality[] = [
	EnumPlayerQuality.original,
	EnumPlayerQuality['1080p'],
	EnumPlayerQuality['720p'],
	EnumPlayerQuality['480p'],
	EnumPlayerQuality['360p']
]

interface Props {
	currentValue: EnumPlayerQuality
	onChange: (quality: EnumPlayerQuality) => void
}

export function SelectQuality({ currentValue, onChange }: Props) {
	const { isShow, ref, setIsShow } = useOutside(false)

	return (
		<div
			className="relative"
			ref={ref}
		>
			<button
				onClick={() => setIsShow(!isShow)}
				className="flex items-center gap-1 hoverPrimary"
			>
				{currentValue}
			</button>

			{isShow && (
				<ul className="bg-dark-600 py-2 px-4 rounded absolute bottom-full right-0 z-10 shadow">
					{QUALITIES.map(quality => (
						<li
							key={quality}
							className="mb-1"
						>
							<button
								onClick={() => {
									onChange(quality)
									setIsShow(false)
								}}
								className={cn('flex items-center gap-1.5 hoverPrimary', {
									'font-bold text-primary': currentValue === quality
								})}
							>
								{currentValue === quality && <span>•</span>} {quality}
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	)
}
