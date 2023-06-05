// !TODO: DO NOT forget to update setting which base on `__DEFAULT__` in **layout**
// use empty component when DO NOT need to show side in home page
// ===Start===============================================================================
// export default function Empty() {
//     return null
// }
// ===End=================================================================================
"use client"
import { ShoppingBag, Users } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@postweb/html"

export default function Common() {
    const params = useParams()
    console.log(params)
    return <div className="p-5">
        <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            系统管理
        </h2>
        <div className="space-y-1">
            <Button asChild variant={params.table === "products" ? "secondary" : "ghost"} size="sm" className="w-full justify-start">
                <Link href="/m/products" prefetch={false}>
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    商品管理
                </Link>
            </Button>
            <Button asChild variant={params.table === "users" ? "secondary" : "ghost"} size="sm" className="w-full justify-start">
                <Link href="/m/users" prefetch={false}>
                    <Users className="mr-2 h-4 w-4" />
                    用户管理
                </Link>
            </Button>
        </div>
    </div>
}