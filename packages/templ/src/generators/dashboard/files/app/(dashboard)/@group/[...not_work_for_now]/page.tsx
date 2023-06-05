// !https://github.com/vercel/next.js/issues/49531
// !https://github.com/vercel/next.js/issues/49662
// !there is a bug that [...catchall] is not work with parellel route

export default function Home() {
  return (
    <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
      Instantly deploy your Next.js site to a shareable URL with Vercel.
    </p>
  )
}
