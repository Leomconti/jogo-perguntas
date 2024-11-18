import Image from 'next/image'

export function Hero() {
  return (
    <section className="flex h-full w-full select-none flex-col items-center justify-center pt-44">
      <p className="text-center">
        Amplifique seu Planejamento de Produto com IA
      </p>
      <div className="relative bg-gradient-to-r from-primary to-secondary-foreground bg-clip-text text-transparent drop-shadow-[2px_2px_10px_rgba(0,0,0,0.1)]">
        <h1 className="text-center text-7xl font-bold md:text-[150px]">
          Backlog Boost
        </h1>
      </div>
      <div className="relative flex items-center justify-center md:mt-[-20px]">
        <Image
          src={'/oneday.jpeg'}
          alt="banner image"
          height={1200}
          width={1200}
          className="rounded-2xl border-2 border-muted dark:opacity-80"
        />
        <div className="absolute bottom-0 left-0 right-0 top-[50%] z-10 bg-gradient-to-t dark:from-background"></div>
      </div>
    </section>
  )
}
