'use client'

import Link from 'next/link'

import { ElDialog, ElDialogPanel, ElDropdown, ElPopover } from '@tailwindplus/elements/react'
import { clsx } from 'clsx/lite'
import { useEffect, useRef } from 'react'
import type { ComponentProps, MouseEvent, ReactNode } from 'react'

export function NavbarLink({
  children,
  href,
  className,
  ...props
}: { href: string } & Omit<ComponentProps<'a'>, 'href'>) {
  return (
    <Link
      href={href}
      className={clsx(
        'group inline-flex items-center justify-between gap-2 text-3xl/10 font-medium text-mist-950 lg:text-sm/7',
        className,
      )}
      {...props}
    >
      {children}
      <span className="inline-flex p-1.5 opacity-0 group-hover:opacity-100 lg:hidden" aria-hidden="true">
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </span>
    </Link>
  )
}

export function NavbarDropdown({
  label,
  id,
  children,
}: {
  label: string
  id: string
  children: ReactNode
}) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const popoverRef = useRef<HTMLElement>(null)

  // Desktop hover: open on mouseenter, close after a small delay on mouseleave.
  // Tap on touch devices keeps using popoverTarget on the button.
  useEffect(() => {
    if (typeof window === 'undefined') return
    const button = buttonRef.current
    const popover = popoverRef.current
    if (!button || !popover) return

    const hoverMql = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (!hoverMql.matches) return

    let closeTimer: ReturnType<typeof setTimeout> | null = null

    const open = () => {
      if (closeTimer) {
        clearTimeout(closeTimer)
        closeTimer = null
      }
      type PopoverEl = HTMLElement & { showPopover?: () => void }
      ;(popover as PopoverEl).showPopover?.()
    }

    const scheduleClose = () => {
      if (closeTimer) clearTimeout(closeTimer)
      closeTimer = setTimeout(() => {
        type PopoverEl = HTMLElement & { hidePopover?: () => void }
        ;(popover as PopoverEl).hidePopover?.()
      }, 180)
    }

    button.addEventListener('mouseenter', open)
    button.addEventListener('mouseleave', scheduleClose)
    popover.addEventListener('mouseenter', open)
    popover.addEventListener('mouseleave', scheduleClose)

    return () => {
      button.removeEventListener('mouseenter', open)
      button.removeEventListener('mouseleave', scheduleClose)
      popover.removeEventListener('mouseenter', open)
      popover.removeEventListener('mouseleave', scheduleClose)
      if (closeTimer) clearTimeout(closeTimer)
    }
  }, [id])

  return (
    <ElDropdown className="contents">
      <button
        ref={buttonRef}
        type="button"
        popoverTarget={id}
        className="group inline-flex items-center gap-2 text-3xl/10 font-medium text-mist-950 lg:text-sm/7"
      >
        {label}
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-5 lg:size-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      <ElPopover
        ref={popoverRef}
        popover="auto"
        id={id}
        anchor="bottom start"
        className="mt-2 flex w-64 flex-col gap-1 rounded-xl bg-white p-2 ring-1 ring-black/5 [&:not(:popover-open)]:hidden"
      >
        {children}
      </ElPopover>
    </ElDropdown>
  )
}

export function NavbarDropdownLink({
  href,
  children,
  onClick,
  ...props
}: { href: string } & Omit<ComponentProps<'a'>, 'href'>) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    const popover = e.currentTarget.closest('[popover]') as (HTMLElement & { hidePopover?: () => void }) | null
    popover?.hidePopover?.()
    onClick?.(e)
  }
  return (
    <Link
      href={href}
      onClick={handleClick}
      className="block rounded-lg px-3 py-2 text-sm/6 font-medium text-mist-700 hover:bg-mist-100 hover:text-mist-950"
      {...props}
    >
      {children}
    </Link>
  )
}

export function NavbarLogo({ className, href, ...props }: { href: string } & Omit<ComponentProps<'a'>, 'href'>) {
  return <Link href={href} {...props} className={clsx('inline-flex items-stretch', className)} />
}

export function NavbarWithLinksActionsAndCenteredLogo({
  links,
  logo,
  actions,
  className,
  ...props
}: {
  links: ReactNode
  logo: ReactNode
  actions: ReactNode
} & ComponentProps<'header'>) {
  return (
    <header className={clsx('sticky top-0 z-10 bg-mist-100', className)} {...props}>
      <style>{`:root { --scroll-padding-top: 5.25rem }`}</style>
      <nav>
        <div className="mx-auto flex h-(--scroll-padding-top) max-w-7xl items-center gap-4 px-6 lg:px-10">
          <div className="flex flex-1 gap-8 max-lg:hidden">{links}</div>
          <div className="flex items-center">{logo}</div>
          <div className="flex flex-1 items-center justify-end gap-4">
            <div className="flex shrink-0 items-center gap-5">{actions}</div>

            <button
              command="show-modal"
              commandfor="mobile-menu"
              aria-label="Toggle menu"
              className="inline-flex size-11 items-center justify-center rounded-full text-mist-950 hover:bg-mist-950/10 lg:hidden"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path
                  fillRule="evenodd"
                  d="M3.748 8.248a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75ZM3.748 15.75a.75.75 0 0 1 .75-.751h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>

        <ElDialog className="lg:hidden">
          <dialog id="mobile-menu" className="backdrop:bg-transparent">
            <ElDialogPanel className="fixed inset-0 bg-mist-100 px-6 py-6 lg:px-10">
              <div className="flex justify-end">
                <button
                  command="close"
                  commandfor="mobile-menu"
                  aria-label="Toggle menu"
                  className="inline-flex size-11 items-center justify-center rounded-full text-mist-950 hover:bg-mist-950/10"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="mt-6 flex flex-col gap-6">{links}</div>
            </ElDialogPanel>
          </dialog>
        </ElDialog>
      </nav>
    </header>
  )
}
