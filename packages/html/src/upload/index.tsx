"use client"

import { useState } from "react"
import cn from "clsx";

export function Upload({ submitFnc, onChange, className }: { submitFnc?: (file: File) => Promise<string | undefined | null>, className?: string, onChange: (arg: any) => void }) {
    const [url, setUrl] = useState<string | undefined | null>(null);
    return (
        <div className={cn("relative w-[192px] h-[192px] rounded-lg border border-dashed overflow-hidden", className)}>
            <input
                type="file"
                className="relative z-10 w-full h-full opacity-0"
                onChange={({ target }) => {
                    if (target.files?.length) {
                        if (submitFnc) {
                            submitFnc(target.files[0]).then(url => {
                                onChange?.(url)
                                setUrl(url)
                            })
                        } else {
                            const reader = new FileReader()
                            reader.onloadend = () => {
                                onChange?.(reader.result)
                                setUrl(reader.result as string)
                            }
                            reader.readAsDataURL(target.files[0])
                        }
                    }
                }}
            />
            <section
                className="absolute w-full h-full bg-contain top-0"
                style={url ? { backgroundImage: `url(${url})` } : {}}
            />
        </div>
    );
}
