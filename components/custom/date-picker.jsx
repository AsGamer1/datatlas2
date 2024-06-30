import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'
import { useState } from 'react'

export default function DatePicker({ selectedDate, setFieldDate, setSelectedDate, ...props }) {
  const [month, setMonth] = useState(0)
  const [inputDate, setInputDate] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const handleDayPickerSelect = (date) => {
    if (!date) {
      setInputDate("")
      setSelectedDate(undefined)
      setFieldDate(undefined)
    } else {
      setSelectedDate(date)
      setFieldDate(date)
      setMonth(date)
      setInputDate(format(date, "dd/MM/yyyy"))
      setIsOpen(false)
    }
  }

  return (
    <Popover onOpenChange={setIsOpen} open={isOpen}>
      <PopoverTrigger asChild>
        <Button {...props} variant="outline" type="button" className={cn("w-full pl-3 text-left font-normal", !selectedDate && "text-muted-foreground hover:text-muted-foreground")}>
          {selectedDate ? (inputDate) : (<span>Fecha de nacimiento</span>)}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          month={month}
          onMonthChange={setMonth}
          showOutsideDays
          required
          mode="single"
          fixedWeeks
          selected={selectedDate}
          onSelect={handleDayPickerSelect}
          disabled={(date) => date > new Date() || date < new Date(1900, 0, 1)}
        />
      </PopoverContent>
    </Popover>
  )
}