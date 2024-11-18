'use client'

import React from 'react'
import { SlideTabs } from './SliderTabs'

export function Navbar() {
  return (
    <header className="fixed left-0 right-0 top-0 z-30 flex bg-transparent sm:top-5">
      <SlideTabs />
    </header>
  )
}
