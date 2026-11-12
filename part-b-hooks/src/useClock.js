import { useEffect, useState } from 'react'

export function useClock() {
  const [thờiGian, đặtThờiGian] = useState(() => new Date())

  useEffect(() => {
    const bộĐếm = setInterval(() => {
      đặtThờiGian(new Date())
    }, 1000)

    return () => clearInterval(bộĐếm)
  }, [])

  return thờiGian
}
