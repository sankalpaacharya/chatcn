"use client"

import React, { useEffect, useRef, useState, useCallback } from "react"
import { useInView, animate } from "framer-motion"
import { HugeiconsIcon } from "@hugeicons/react"
import { PauseIcon, PlayIcon } from "@hugeicons/core-free-icons"

export interface VideoItem {
    url: string
    duration: number
}

export interface VideoCarouselProps {
    videos: VideoItem[]
    autoPlay?: boolean
    muted?: boolean
    className?: string
}

interface VideoState {
    currentVideoId: number
    isPlaying: boolean
    hasStarted: boolean
}

export function VideoCarousel({ videos, autoPlay = false, muted = true, className = "" }: VideoCarouselProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const carouselRef = useRef<HTMLDivElement>(null)
    const sliderRef = useRef<HTMLDivElement>(null)
    const videoRef = useRef<(HTMLVideoElement | null)[]>([])
    const videoSpanRef = useRef<(HTMLSpanElement | null)[]>([])
    const videoDivRef = useRef<(HTMLSpanElement | null)[]>([])

    const [containerWidth, setContainerWidth] = useState(0)
    const [videoState, setVideoState] = useState<VideoState>({
        currentVideoId: 0,
        isPlaying: false,
        hasStarted: false,
    })

    const { currentVideoId, isPlaying, hasStarted } = videoState
    const isInView = useInView(carouselRef, { once: true, amount: 0.5 })

    const getVideoWidth = useCallback((): number => {
        if (!containerWidth) return 0
        return containerWidth < 640 ? containerWidth * 0.88 : containerWidth * 0.7
    }, [containerWidth])

    const getGap = useCallback((): number => {
        if (!containerWidth) return 80
        return containerWidth < 640 ? 40 : 80
    }, [containerWidth])

    const getTranslateValue = useCallback((): number => {
        if (!containerWidth) return 0
        const videoWidth = getVideoWidth()
        const gap = getGap()
        const offset = (containerWidth - videoWidth) / 2
        const slideOffset = currentVideoId * (videoWidth + gap)
        return offset - slideOffset
    }, [containerWidth, currentVideoId, getVideoWidth, getGap])

    const getResponsiveWidth = useCallback((): string => {
        if (!containerWidth) return "60px"
        if (containerWidth < 480) return `${containerWidth * 0.15}px`
        if (containerWidth < 760) return `${containerWidth * 0.12}px`
        if (containerWidth < 1200) return `${containerWidth * 0.1}px`
        return `${containerWidth * 0.08}px`
    }, [containerWidth])

    useEffect(() => {
        const updateWidth = () => {
            if (containerRef.current) {
                setContainerWidth(containerRef.current.offsetWidth)
            }
        }
        updateWidth()

        const resizeObserver = new ResizeObserver(updateWidth)
        if (containerRef.current) {
            resizeObserver.observe(containerRef.current)
        }
        return () => resizeObserver.disconnect()
    }, [])

    useEffect(() => {
        if (sliderRef.current && containerWidth) {
            animate(sliderRef.current, { x: getTranslateValue() }, { duration: 2, ease: "easeInOut" })
        }
        if (isInView && !hasStarted) {
            setVideoState((prev) => ({ ...prev, hasStarted: true, isPlaying: autoPlay }))
        }
    }, [currentVideoId, isInView, hasStarted, containerWidth, getTranslateValue])

    useEffect(() => {
        const currentVideo = videoRef.current[currentVideoId]
        if (currentVideo && hasStarted) {
            if (isPlaying) {
                currentVideo.play().catch((err) => console.error("Video play failed:", err))
            } else {
                currentVideo.pause()
            }
        }
    }, [currentVideoId, isPlaying, hasStarted])

    useEffect(() => {
        const span = videoSpanRef.current
        let animationFrameId: number

        if (span[currentVideoId]) {
            const updateProgress = (): void => {
                const vid = videoRef.current[currentVideoId]
                if (!vid) return

                const duration = videos[currentVideoId].duration
                const progress = Math.ceil((vid.currentTime / duration) * 100)

                if (videoDivRef.current[currentVideoId]) {
                    animate(videoDivRef.current[currentVideoId]!, { width: getResponsiveWidth() }, { duration: 0.2 })
                }

                if (span[currentVideoId]) {
                    animate(span[currentVideoId]!, { width: `${progress}%`, backgroundColor: "#afafaf" }, { duration: 0.1 })
                }

                if (vid.currentTime >= duration - 0.1) {
                    if (videoDivRef.current[currentVideoId]) {
                        animate(videoDivRef.current[currentVideoId]!, { width: "12px" }, { duration: 0.3 })
                    }
                    if (span[currentVideoId]) {
                        animate(span[currentVideoId]!, { backgroundColor: "#afafaf" }, { duration: 0.3 })
                    }
                } else if (isPlaying) {
                    animationFrameId = requestAnimationFrame(updateProgress)
                }
            }

            if (isPlaying) {
                animationFrameId = requestAnimationFrame(updateProgress)
            }
        }

        return () => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId)
        }
    }, [currentVideoId, isPlaying, videos, containerWidth, getResponsiveWidth])

    const handleVideoEnd = (currentIndex: number): void => {
        const span = videoSpanRef.current
        const div = videoDivRef.current

        if (span[currentIndex] && div[currentIndex]) {
            animate(div[currentIndex]!, { width: "12px" }, { duration: 0.1 })
            animate(span[currentIndex]!, { width: "0%", backgroundColor: "#afafaf", opacity: 0 }, { duration: 0.1 })
        }

        setTimeout(() => {
            if (span[currentIndex]) {
                animate(span[currentIndex]!, { opacity: 1 }, { duration: 0 })
            }
            const nextId = currentIndex === videos.length - 1 ? 0 : currentIndex + 1
            setVideoState((prev) => ({ ...prev, currentVideoId: nextId, isPlaying: true }))
        }, 100)
    }

    const togglePlayPause = (): void => {
        setVideoState((prev) => ({ ...prev, isPlaying: !prev.isPlaying }))
    }

    const videoWidth = getVideoWidth()
    const gap = getGap()
    const videoHeight = videoWidth ? videoWidth * (9 / 16) : 400

    return (
        <div ref={containerRef} className={`w-full overflow-hidden h-full py-10 sm:py-16 ${className}`}>
            <div ref={carouselRef} className="flex items-center">
                <div ref={sliderRef} className="flex items-center">
                    {videos.map((video, idx) => (
                        <div
                            key={idx}
                            className="shrink-0"
                            style={{ width: videoWidth ? `${videoWidth}px` : "70vw", marginRight: `${gap}px` }}
                        >
                            <div className="relative w-full" style={{ height: videoWidth ? `${videoHeight}px` : "400px" }}>
                                <div className="w-full h-full flex items-center justify-center rounded-3xl overflow-hidden bg-black">
                                    <video
                                        playsInline
                                        preload="auto"
                                        muted={muted}
                                        className="w-full h-full object-cover"
                                        ref={(el) => { videoRef.current[idx] = el }}
                                        onPlay={() => setVideoState((prev) => ({ ...prev, isPlaying: true }))}
                                        onEnded={() => handleVideoEnd(idx)}
                                    >
                                        <source src={video.url} type="video/mp4" />
                                    </video>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="relative flex items-center justify-center mt-6 sm:mt-10 px-5">
                <div className="flex items-center justify-center py-3 px-5 sm:py-5 sm:px-7 bg-zinc-800 backdrop-blur rounded-full">
                    {videos.map((_, i) => (
                        <span
                            key={i}
                            ref={(el) => { videoDivRef.current[i] = el }}
                            className="mx-1.5 sm:mx-2 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-gray-200 rounded-full relative cursor-pointer overflow-hidden"
                        >
                            <span ref={(el) => { videoSpanRef.current[i] = el }} className="absolute h-full w-full rounded-full" />
                        </span>
                    ))}
                </div>

                <button
                    onClick={togglePlayPause}
                    aria-label={isPlaying ? "Pause video" : "Play video"}
                    className="ml-3 sm:ml-4 p-3 sm:p-4 rounded-full bg-zinc-800 backdrop-blur-md flex items-center justify-center hover:bg-zinc-700 transition-colors"
                >
                    <HugeiconsIcon icon={isPlaying ? PauseIcon : PlayIcon} className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </button>
            </div>
        </div>
    )
}

export default VideoCarousel