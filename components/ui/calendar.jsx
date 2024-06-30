import * as React from 'react'
import { DayPicker } from 'react-day-picker/utc'
import "react-day-picker/style.css";
import { es } from 'date-fns/locale'

export function Calendar({ ...props }) {
  return (
    <DayPicker
      selected={new Date()}
      className="p-3"
      locale={es}
      lang="es"
      captionLayout="dropdown"
      classNames={{
        caption_label: "no-scrollbar flex justify-center items-center text-sm font-semibold",
        chevron: "fill-tertiary",
        today: "text-primary hover:text-primary",
        disabled:"text-muted-foreground opacity-50",
        outside: "text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        selected: 'bg-tertiary text-white hover:bg-tertiary hover:text-white focus:bg-tertiary focus:text-white',
        button_next: "inline-flex items-center justify-center m-0 p-0 rounded-md cursor-pointer hover:bg-accent h-8 w-8",
        button_previous: "inline-flex items-center justify-center m-0 p-0 rounded-md cursor-pointer hover:bg-accent h-8 w-8",
        day: "h-9 w-9 p-0 inline-flex items-center justify-center rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground",
        dropdown_nav: "w-full flex flex-row justify-center items-center",
        nav: "absolute top-0 right-0 flex justify-between w-full items-center h-[var(--rdp-nav-height)]",
        months_dropdown: 'p-2 w-4/12 flex items-center justify-center rounded-md text-sm font-medium cursor-pointer hover:bg-accent hover:text-accent-foreground m-0',
        years_dropdown: 'p-2 w-4/12 flex items-center justify-center rounded-md text-sm font-medium cursor-pointer hover:bg-accent hover:text-accent-foreground m-0',
      }}
      {...props}
    />
  )
}
Calendar.displayName = 'Calendar'