import Image from "next/image";

export default function Home() {
  return (
    <main>
      <section className="py-10 bg-primary-100">
        <div className="w-full max-w-full lg:max-w-[calc(min(100vw-60px,1220px))] mx-auto px-5">
          <div className="flex flex-wrap flex-row -mx-5 items-center">
            <div className="relative w-full px-5 lg:w-6/12">
              <h1 className="text-[calc(1.475rem+2.7vw)] lg:text-[3.5rem] leading-[1.2] mb-6 font-semibold">La <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-tertiary capitalize">base de datos</span><br/> de tu club favorito</h1>
              <p className="text-[#374151] text-lg">Récords del club, tus marcas personales y las competiciones en las que has participado en un solo lugar.</p>
            </div>
            <div className="relative w-full px-5 lg:w-6/12">
              <Image className="block mx-auto lg:mr-0 pr-6 lg:max-w-[500px]" src="/images/placeholder.png" style={{filter:"drop-shadow(0.5rem 0.5rem 0.25rem rgba(0, 0, 0, 0.075))"}} width="715" height="529"/>
            </div>
          </div>
        </div>
      </section>
      <section className="py-10 text-white bg-primary">
        <div className="w-full max-w-full lg:max-w-[calc(min(100vw-60px,1220px))] mx-auto px-5">
          <div className="flex flex-wrap flex-row -mx-5 items-center">
            <div className="relative w-full px-5 lg:w-6/12">
              <h1 className="text-[calc(1.475rem+2.7vw)] lg:text-[3.5rem] leading-[1.2] mb-6 font-semibold">¿Prefieres una App?</h1>
              <p className="text-lg">Nuestra web se adapta a cualquier dispositivo, añádela a tu pantalla de inicio y úsala siempre que quieras.</p>
            </div>
            <div className="relative w-full lg:w-6/12 lg:pl-12 mx-auto">
              <Image className="block mx-auto lg:ml-auto w-[60%] z-[10]" src="/images/placeholder2.png" width="580" height="611" style={{filter: "drop-shadow(0 15px 35px rgba(0, 0, 0, 0.6))"}} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
