import { useEffect, useRef, useState } from 'react'
import { EnumPlayerQuality, HTMLCustomVideoElement } from './player.types'

const SKIP_TIME_SECONDS = 15

export function usePlayer() {
	const playerRef = useRef<HTMLCustomVideoElement>(null)

	const [isPlaying, setIsPlaying] = useState(false)
	const [quality, setQuality] = useState(EnumPlayerQuality['1080p'])

	const togglePlayPause = () => {
		if (isPlaying) {
			playerRef.current?.pause()
		} else {
			playerRef.current?.play()
		}
		setIsPlaying(!isPlaying)
	}

	const skipTime = (type?: 'forward' | 'backward') => {
		if (!playerRef.current?.currentTime) return

		if (type === 'forward') {
			playerRef.current.currentTime += SKIP_TIME_SECONDS
		} else {
			playerRef.current.currentTime -= SKIP_TIME_SECONDS
		}
	}

	const toggleFullScreen = () => {
		if (!playerRef.current) return

		if (playerRef.current.requestFullscreen) {
			playerRef.current.requestFullscreen()
		} else if (playerRef.current?.mozRequestFullScreen) {
			playerRef.current.mozRequestFullScreen()
		} else if (playerRef.current.webkitRequestFullscreen) {
			playerRef.current.webkitRequestFullscreen()
		} else if (playerRef.current.msRequestFullscreen) {
			playerRef.current.msRequestFullscreen()
		}
	}

	const changeQuality = (quality: EnumPlayerQuality) => {
		if (!playerRef.current) return
		setQuality(quality)

		playerRef.current.src = `/uploads/${quality}/1725100979901-518889793.mp4`
		playerRef.current.currentTime = currentTime
		playerRef.current.play()
		setIsPlaying(true)
	}

	const [currentTime, setCurrentTime] = useState(0)
	const [videoTime, setVideoTime] = useState(0)
	const [progress, setProgress] = useState(0)

	useEffect(() => {
		const originalTime = playerRef.current?.duration
		if (originalTime) {
			setVideoTime(originalTime)

			const currentTime = playerRef.current.currentTime
			const duration = playerRef.current.duration

			setCurrentTime(currentTime)
			setProgress((currentTime / duration) * 100)
		}
	}, [playerRef.current?.duration])

	useEffect(() => {
		const updateProgress = () => {
			if (!playerRef?.current) return

			const currentTime = playerRef.current.currentTime
			const duration = playerRef.current.duration

			setCurrentTime(currentTime)
			setProgress((currentTime / duration) * 100)
		}

		playerRef.current?.addEventListener('timeupdate', updateProgress)

		return () => {
			playerRef.current?.removeEventListener('timeupdate', updateProgress)
		}
	}, [])

	return {
		playerRef,
		isPlaying,
		quality,
		togglePlayPause,
		skipTime,
		toggleFullScreen,
		changeQuality,
		progress,
		currentTime,
		videoTime
	}
}
