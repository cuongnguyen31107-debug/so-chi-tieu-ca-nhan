import { useEffect, useState } from 'react'

export function useFetch(hàmLấyDữLiệu) {
  const [dữLiệu, đặtDữLiệu] = useState([])
  const [đangTải, đặtĐangTải] = useState(true)
  const [lỗi, đặtLỗi] = useState('')
  const [lầnTảiLại, đặtLầnTảiLại] = useState(0)

  useEffect(() => {
    let cònHiệuLực = true

    đặtĐangTải(true)
    đặtLỗi('')

    hàmLấyDữLiệu()
      .then((kếtQuả) => {
        if (cònHiệuLực) đặtDữLiệu(kếtQuả)
      })
      .catch(() => {
        if (cònHiệuLực) đặtLỗi('Không tải được dữ liệu. Vui lòng thử lại.')
      })
      .finally(() => {
        if (cònHiệuLực) đặtĐangTải(false)
      })

    return () => {
      cònHiệuLực = false
    }
  }, [hàmLấyDữLiệu, lầnTảiLại])

  const tảiLại = () => đặtLầnTảiLại((lần) => lần + 1)

  return { dữLiệu, đangTải, lỗi, tảiLại }
}
