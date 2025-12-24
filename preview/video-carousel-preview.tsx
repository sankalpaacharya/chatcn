"use client"
import { VideoCarousel, type VideoItem } from "@/components/chatcn/misc/video-carousel"

const VIDEOS: VideoItem[] = [
    {
        url: "https://res.cloudinary.com/dwnigdgck/video/upload/v1766568875/mkbhd_ousucv.mp4",
        duration: 6
    },
    {
        url: "https://res.cloudinary.com/dwnigdgck/video/upload/v1766568926/pewdipie_vqluwh.mp4",
        duration: 10
    },
    {
        url: "https://res.cloudinary.com/dwnigdgck/video/upload/v1766568947/mrwhostheboss_nwqg0a.mp4",
        duration: 6
    },
    {
        url: "https://res.cloudinary.com/dwnigdgck/video/upload/v1766569290/apple_thbsvo.mp4",
        duration: 8
    },
]

export default function VideoCarouselPreview() {
    return <VideoCarousel videos={VIDEOS} autoPlay={false} muted={false} />
}
