'use client'

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { useCasesItem } from './UseCases'
import { cn } from '@/lib/utils'
import { UseCase } from './UseCase'
import { useState } from 'react'

export function UseCasesDesktop() {
  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <TabGroup
      className="hidden lg:mt-20 lg:block"
      selectedIndex={selectedIndex}
      onChange={setSelectedIndex}
    >
      {({ selectedIndex }) => (
        <>
          <TabList className="grid grid-cols-3 gap-8">
            {useCasesItem.map((useCase, index) => (
              <UseCase
                key={useCase.summary}
                useCase={{
                  ...useCase,
                  name: (
                    <Tab className="ui-not-focus-visible:outline-none">
                      <span className="absolute inset-0" />
                      {useCase.name}
                    </Tab>
                  )
                }}
                isActive={index === selectedIndex}
                className="relative"
              />
            ))}
          </TabList>
          <TabPanels className="bg-page-gradient relative mt-20 overflow-hidden rounded-3xl px-14 py-16 xl:px-16">
            <div className="-mx-5 flex">
              {useCasesItem.map((useCase, index) => (
                <TabPanel
                  static
                  key={useCase.summary}
                  onClick={() => setSelectedIndex(index)}
                  className={cn(
                    'ui-not-focus-visible:outline-none cursor-pointer px-5 transition duration-500 ease-in-out',
                    index !== selectedIndex && 'opacity-60'
                  )}
                  style={{ transform: `translateX(-${selectedIndex * 100}%)` }}
                  aria-hidden={index !== selectedIndex}
                >
                  <div className="bg-page-gradient w-[52.75rem] overflow-hidden rounded-xl shadow-lg shadow-gray-200/5 ring-1 ring-slate-500/10">
                    <img
                      className="max-w-full"
                      src={`${useCase.image}`}
                      alt=""
                      sizes="52.75rem"
                    />
                  </div>
                </TabPanel>
              ))}
            </div>
          </TabPanels>
        </>
      )}
    </TabGroup>
  )
}
