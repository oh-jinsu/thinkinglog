"use client";

import { useEffect, useRef } from "react"

export default function RedirectUrlInput() {
    const ref = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (!ref.current) {
            return;
        }

        const redirectUrl = new URLSearchParams(window.location.search).get("redirectUrl")

        if (redirectUrl) {
            ref.current.value = redirectUrl
            
            return
        }
    }, [])

    return <input ref={ref} type="hidden" name="redirectUrl"  />
}
