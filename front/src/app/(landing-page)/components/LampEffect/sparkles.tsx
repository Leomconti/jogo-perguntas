'use client'

import React from 'react'
import { SparklesCore } from '@/components/ui/sparkles'

export function Sparkles() {
  return (
    <div className="flex w-full flex-col items-center justify-center overflow-hidden rounded-md bg-transparent">
      <h1 className="relative z-20 text-center text-3xl font-bold md:text-5xl lg:text-7xl">
        Pontecialize seu site
      </h1>
      <div className="relative h-24 w-full dark:hidden">
        {/* Gradients */}
        <div className="absolute inset-x-20 top-0 h-[2px] w-3/4 bg-gradient-to-r from-transparent via-indigo-500 to-transparent blur-sm" />
        <div className="absolute inset-x-20 top-0 h-px w-3/4 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        <div className="absolute inset-x-60 top-0 h-[5px] w-1/4 bg-gradient-to-r from-transparent via-sky-500 to-transparent blur-sm" />
        <div className="absolute inset-x-60 top-0 h-px w-1/4 bg-gradient-to-r from-transparent via-sky-500 to-transparent" />

        {/* Core component */}
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="h-full w-full"
          particleColor="#B4B4B4"
        />

        {/* Radial Gradient to prevent sharp edges */}
        <div className="absolute inset-0 h-full w-full bg-background [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
      </div>
    </div>
  )
}
