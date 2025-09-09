export function getCurrentTime(): string {
  return new Date().toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

export function getCurrentDate(): string {
  return new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export function isTimeInRange(currentTime: string, startTime: string, endTime: string): boolean {
  const current = new Date(`2000-01-01 ${currentTime}`)
  const start = new Date(`2000-01-01 ${startTime}`)
  const end = new Date(`2000-01-01 ${endTime}`)
  
  return current >= start && current <= end
}

export function getNextBellTime(schedules: Array<{ time: string, active: boolean }>): string | null {
  const now = new Date()
  const currentTime = now.getHours() * 60 + now.getMinutes()
  
  const activeSchedules = schedules
    .filter(schedule => schedule.active)
    .map(schedule => {
      const [hours, minutes] = schedule.time.split(':').map(Number)
      return {
        time: schedule.time,
        minutes: hours * 60 + minutes
      }
    })
    .sort((a, b) => a.minutes - b.minutes)
  
  // Find next bell today
  const nextToday = activeSchedules.find(schedule => schedule.minutes > currentTime)
  if (nextToday) {
    return nextToday.time
  }
  
  // If no more bells today, return first bell tomorrow
  if (activeSchedules.length > 0) {
    return activeSchedules[0].time
  }
  
  return null
}