export default function AuthLayout({children}) {
  return (
    <main className="text-center flex flex-col justify-center flex-1">
      <div className="w-full px-5">
        {children}
      </div>
    </main>
  )
}