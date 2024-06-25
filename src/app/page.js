import Navbar from "./components/navbar";
import Image from "next/image";

export const isIOS = () => /iPhone|iPad|iPod/i.test(navigator.userAgent);

export default function Home() {
  return (
    <view>
      <Navbar/>
      <section className="py-10">
        <div className="w-full max-w-full lg:max-w-[calc(min(100vw-60px,1220px))] mx-auto px-5">
          <div className="flex flex-wrap flex-row -mx-5 items-center">
            <div className="relative w-full px-5 lg:w-6/12">
              <h1 className="text-[calc(1.475rem+2.7vw)] lg:text-[3.5rem] leading-[1.2] mb-6 font-semibold">La <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-tertiary capitalize">base de datos</span><br/> de tu club favorito</h1>
              <p className="text-[#374151] text-lg">Récords del club, tus marcas personales y las competiciones en las que has participado en un solo lugar.</p>
            </div>
            <div className="relative w-full px-5 lg:w-6/12 mt-12 lg:mt-0">
              <Image className="block mx-auto lg:mr-0 pr-6 lg:max-w-[500px]" src="/images/placeholder.png" style={{filter:"drop-shadow(0.5rem 0.5rem 0.25rem rgba(0, 0, 0, 0.075))"}} width="715" height="529"/>
            </div>
          </div>
        </div>
      </section>
      <section className="pt-40 pb-20 text-white bg-[#1f2937] overflow-hidden">
        <div className="w-full max-w-full lg:max-w-[calc(min(100vw-60px,1220px))] mx-auto px-5">
          <div className="flex flex-wrap flex-row -mx-5 items-center">
            <div className="relative w-full px-5 md:w-8/12 lg:w-6/12 text-center lg:text-left mx-auto">
              <h1 className="text-[calc(1.475rem+2.7vw)] lg:text-[3.5rem] capitalize font-semibold mb-6 leading-snug">¿prefieres una app?</h1>
              <p className="text-xl tracking-wide leading-relaxed mb-10">La web en la que estás se adapta a cualquier tipo de pantalla, añádela a tu pantalla de inicio y úsala siempre que quieras. ¿No sabes cómo? Consulta los tutoriales.</p>
              <div className="flex flex-col sm:flex-row items-center gap-y-6 gap-x-4">
                <div className="px-4 flex items-center justify-center bg-primary rounded-full">
                  <a href="#" title="Go to Apple Store">
                    <Image src="/images/iphone.svg" width="220" height="220"/>
                  </a>
                </div>
                <div className="px-4 flex items-center justify-center bg-primary rounded-full">
                  <a href="#" title="Go to Google Play">
                    <Image src="/images/android.svg" width="220" height="220"/>
                  </a>
                </div>
              </div>
            </div>
            <div className="relative w-full md:w-8/12 lg:w-6/12 mt-28 lg:mt-0 px-6 lg:px-0 lg:pl-12 mx-auto">
              <div className="mt-12 lg:mt-0 px-2 lg:px-0 relative">
                <Image className="block relative mx-auto lg:ml-auto w-[90%] z-[10]" src="/images/placeholder2.png" width="580" height="611" style={{filter: "drop-shadow(0 15px 35px rgba(0, 0, 0, 0.6))"}} />
                <div className="absolute w-full h-full left-[0] top-[0] z-[0]">
                  <div className="absolute bg-primary rounded-full w-[150px] h-[150px] right-[-50px] bottom-[75px]"></div>
                  <div className="absolute bg-primary rounded-full w-[80px] h-[80px] right-[-80px] top-[-100px]"></div>
                  <div className="absolute bg-primary rounded-full w-[65px] h-[65px] left-[50%] bottom-[0]"></div>
                  <div className="absolute bg-primary rounded-full w-[220px] h-[220px] left-[30px] top-[-40px]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </view>
  );
}
