"use client"

export default function AppError({ error, reset, }: { error: Error; reset: () => void; }) {
    return <h2>Something went wrong3456789!{error.message}</h2>
}