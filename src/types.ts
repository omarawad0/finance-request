export enum Priority {
  High = 'High',
  Medium = 'Medium',
  Low = 'Low'
}
export enum Status {
  Open = 'Open',
  InProgress = 'In Progress',
  Closed = 'Closed'
}

export interface Ticket {
  id: number
  subject: string
  priority: Priority
  status: Status
  description: string
}

export interface Column {
  id: keyof Ticket
  label: string
}
