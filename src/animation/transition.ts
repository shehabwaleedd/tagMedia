import gsap from "gsap"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"

export const animatePageIn = () => {
    const bannerOne = document.getElementById("banner")

    if (bannerOne) {
        const tl = gsap.timeline()

        tl.set([bannerOne], {
            yPercent: 0,
            ease: "power3.out",
        }).to([bannerOne], {
            yPercent: -100,
            stagger: 0.2,
            duration: 0.8,
            ease: "power3.out",
        })
    }
}

export const animatePageOut = (href: string, router: AppRouterInstance) => {
    const bannerOne = document.getElementById("banner")

    if (bannerOne) {
        const tl = gsap.timeline()

        tl.set([bannerOne], {
            yPercent: 100,
        }).to([bannerOne], {
            yPercent: 0,
            stagger: 0.2,
            duration: 1,
            ease: "power3.out",
            onComplete: () => {
                router.push(href)
            },
        })
    }
}