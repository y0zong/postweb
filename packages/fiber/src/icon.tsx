import cn from "clsx"

export type IconData = (["path", string]
    | ["polyline", string]
    | ["line", string, string, string, string]
    | ["circle", string, string, string]
)[]

export function Icon({ data, className }: { className?: string, data: IconData }) {
    return <svg xmlns="http://www.w3.org/2000/svg" className={cn("w-4 h-4 stroke-tag", className)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {data.map(([type, data, x2, y1, y2]) => type === "path" ? <path d={data} />
            : type === "polyline" ? <polyline points={data} />
                : type === "line" ? <line x1={data} x2={x2} y1={y1} y2={y2} />
                    : type === "circle" ? <circle cx={data} cy={x2} r={y1} />
                        : null)}
    </svg>
}