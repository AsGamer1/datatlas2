import Link from "next/link";

export default function NotFound() {
  return (
    <main className="bg-primary-100 text-center flex flex-col justify-center flex-1">
      <div className="w-full px-5">
        <h1 className="text-[calc(1.2rem+2.7vw)] lg:text-[3.5rem] leading-[1.2] font-semibold">Ha habido un problema</h1>
        <p className="text-lg m-2">No hemos encontrado la página</p>
      </div>
      <div className="m-2 cursor-pointer transition duration-200 ease-in-out font-semibold">
        <Link href="/" className="py-2 px-4 rounded-md bg-primary-600 hover:bg-primary-500 text-white">Ir a inicio</Link>
      </div>
    </main>
  )
}