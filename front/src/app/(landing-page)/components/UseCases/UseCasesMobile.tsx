import { UseCase } from './UseCase'
import { useCasesItem } from './UseCases'

export function UseCasesMobile() {
  return (
    <div className="-mx-4 mt-20 flex flex-col gap-y-10 overflow-hidden px-4 sm:-mx-6 sm:px-6 lg:hidden">
      {useCasesItem.map((useCase) => (
        <div key={useCase.summary}>
          <UseCase useCase={useCase} className="mx-auto max-w-2xl" isActive />
          <div className="relative mt-10 pb-10">
            <div className="bg-page-gradient absolute -inset-x-4 bottom-0 top-8 sm:-inset-x-6" />
            <div className="bg-glass-gradient relative mx-auto overflow-hidden rounded-xl shadow-lg ring-1 md:w-[40rem] lg:w-[52.75rem]">
              <img
                className="w-full"
                src={`/images/${useCase.image}`}
                alt=""
                sizes="52.75rem"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
