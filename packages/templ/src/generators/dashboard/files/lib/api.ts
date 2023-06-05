import PostgrestClient from "@postweb/postgres";

const STORAGE: { [X: string]: string } = {}
const MemoryStorage: Storage = Object.create(null, {
    getItem: { value: (key: string) => STORAGE[key] },
    setItem: { value: (key: string, value: any) => STORAGE[key] = value },
    removeItem: { value: (key: string) => delete STORAGE[key] },
    clear: { value: () => Object.keys(STORAGE).map(key => delete STORAGE[key]) },
    key: { value: (index: number) => Object.keys(STORAGE)[index] },
    length: { get: () => Object.keys(STORAGE).length }
})

class PG {
    private storage: Storage
    pg: PostgrestClient
    constructor() {
        if (!process.env.NEXT_PUBLIC_API_ENDPORT) throw `Enviroment ${process.env.NEXT_PUBLIC_API_ENDPORT} is not avaliable`
        this.storage = typeof localStorage === "undefined" ? MemoryStorage : localStorage
        const token = this.storage.getItem("token")
        this.pg = new PostgrestClient(
            process.env.NEXT_PUBLIC_API_ENDPORT,
            { headers: token ? { 'Authorization': `Bearer ${token}` } : {} }
        )
    }

    /**
     * 登录
     */
    public async login(payload: { email: string, pass: string }) {
        const { data, error } = await this.pg.rpc("auth.login", payload)
        if (data?.token) {
            this.storage.setItem("token", data.token)
            this.pg = new PostgrestClient(
                process.env.NEXT_PUBLIC_API_ENDPORT!,
                { headers: { 'Authorization': `Bearer ${data.token}` } }
            )
        } else throw error
    }
}

export const API = new PG()