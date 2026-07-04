import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

type Badge = {
    label: string;
    className: string;
    bg: string;
    delay: number;
};

const badges: Badge[] = [
    { label: "TS", className: "top-[8%] left-[5%]", bg: "bg-[#3178c6]", delay: 0.1 },
    { label: "{ }", className: "top-[30%] -left-[3%]", bg: "bg-[#f7df1e] text-black", delay: 0.25 },
    { label: "⚛", className: "bottom-[12%] left-[8%]", bg: "bg-[#61dafb] text-black", delay: 0.4 },
    { label: "▲", className: "top-[5%] right-[5%]", bg: "bg-black border border-white/20", delay: 0.15 },
    { label: "Py", className: "top-[45%] -right-[3%]", bg: "bg-[#306998]", delay: 0.3 },
    { label: "☁", className: "bottom-[10%] right-[8%]", bg: "bg-[color:var(--brand)] text-primary-foreground", delay: 0.45 },
];

export function HeroVideo() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [hasPlayedVid1, setHasPlayedVid1] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleEnded = () => {
            if (!hasPlayedVid1) {
                setHasPlayedVid1(true);
                video.src = `${import.meta.env.BASE_URL}certificates/vid2.mp4`;
                video.loop = true;
                video.play();
            }
        };

        video.addEventListener("ended", handleEnded);

        if (!hasPlayedVid1) {
            video.src = `${import.meta.env.BASE_URL}certificates/vid1.mp4`;
            video.loop = false;
            video.play();
        }

        return () => {
            video.removeEventListener("ended", handleEnded);
        };
    }, [hasPlayedVid1]);

    return (
        <div className="hero-video-wrapper relative mx-auto w-full max-w-[600px]">
            {/* Ambient glow — large, soft, blends video into the dark background */}
            <div
                className="pointer-events-none absolute -inset-16 z-0"
                style={{
                    background:
                        "radial-gradient(ellipse at 50% 45%, oklch(0.72 0.19 45 / 0.30) 0%, oklch(0.62 0.21 30 / 0.15) 40%, transparent 70%)",
                    filter: "blur(40px)",
                }}
            />

            {/* Secondary depth glow — bottom warm wash */}
            <div
                className="pointer-events-none absolute -inset-10 z-0"
                style={{
                    background:
                        "radial-gradient(ellipse at 50% 80%, oklch(0.55 0.18 35 / 0.25) 0%, transparent 60%)",
                    filter: "blur(50px)",
                }}
            />

            {/* 3D perspective container */}
            <motion.div
                initial={{ opacity: 0, y: 30, rotateX: 6 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10"
                style={{ perspective: "1200px" }}
            >
                {/* Main video frame — constrained height, person centered */}
                <div
                    className="hero-video-stage relative overflow-hidden rounded-2xl"
                    style={{
                        maxHeight: "420px",
                        boxShadow: `
                            0 25px 60px -15px oklch(0 0 0 / 0.6),
                            0 10px 30px -10px oklch(0.72 0.19 45 / 0.20),
                            0 0 80px -20px oklch(0.62 0.21 30 / 0.15),
                            inset 0 1px 0 oklch(1 0 0 / 0.08)
                        `,
                    }}
                >
                    {/* Subtle top-edge highlight for 3D depth */}
                    <div
                        className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px"
                        style={{
                            background:
                                "linear-gradient(90deg, transparent 10%, oklch(1 0 0 / 0.15) 50%, transparent 90%)",
                        }}
                    />

                    {/* Video element — height-constrained, person centered, bottom trimmed */}
                    <video
                        ref={videoRef}
                        className="relative z-10 block w-full h-full"
                        style={{
                            objectFit: "cover",
                            objectPosition: "center 42%",
                            minHeight: "420px",
                        }}
                        playsInline
                        muted
                    />

                    {/* Soft vignette overlay — blends edges into background */}
                    <div
                        className="pointer-events-none absolute inset-0 z-20"
                        style={{
                            background: `
                                linear-gradient(to top, oklch(0.18 0.02 40 / 0.85) 0%, oklch(0.18 0.02 40 / 0.40) 8%, transparent 25%),
                                linear-gradient(to bottom, oklch(0.18 0.02 40 / 0.15) 0%, transparent 10%),
                                linear-gradient(to left, oklch(0.18 0.02 40 / 0.20) 0%, transparent 15%),
                                linear-gradient(to right, oklch(0.18 0.02 40 / 0.20) 0%, transparent 15%)
                            `,
                        }}
                    />
                </div>

                {/* Reflection — mirrored, fading copy below the video */}
                <div
                    className="pointer-events-none relative z-0 mt-0 overflow-hidden rounded-b-2xl"
                    style={{
                        height: "60px",
                        transform: "scaleY(-1) translateY(0)",
                        maskImage:
                            "linear-gradient(to bottom, oklch(1 0 0 / 0.15) 0%, transparent 100%)",
                        WebkitMaskImage:
                            "linear-gradient(to bottom, oklch(1 0 0 / 0.15) 0%, transparent 100%)",
                        filter: "blur(3px) brightness(0.4)",
                    }}
                >
                    <video
                        className="block w-full"
                        style={{ aspectRatio: "auto", objectFit: "contain" }}
                        playsInline
                        muted
                        aria-hidden="true"
                    />
                </div>
            </motion.div>

            {/* Floating tech badges — repositioned for the new layout */}
            {badges.map((b) => (
                <motion.div
                    key={b.label}
                    initial={{ opacity: 0, scale: 0.6 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: b.delay }}
                    className={`absolute z-30 ${b.className} flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-primary-foreground shadow-md ${b.bg} animate-float-slow`}
                    style={{
                        boxShadow: "0 4px 15px -3px oklch(0 0 0 / 0.4)",
                    }}
                >
                    {b.label}
                </motion.div>
            ))}
        </div>
    );
}
