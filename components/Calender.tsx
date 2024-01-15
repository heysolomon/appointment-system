"use client"

import * as React from "react"

import { Calendar } from "@/components/ui/calendar"
import { SelectSingleEventHandler } from "react-day-picker"

export function CalendarComponent(value: Date | undefined, onChange: SelectSingleEventHandler | undefined) {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  console.log(onChange)
  return (
    <Calendar
      mode="single"
      selected={value}
      onSelect={onChange}
      className="w-min text-dark_green-400"
    />
  )
}
