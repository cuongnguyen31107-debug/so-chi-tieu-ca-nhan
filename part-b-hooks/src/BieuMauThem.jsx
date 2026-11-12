import { useState } from 'react'
import { DANH_MỤC, hômNay, kiểmTraKhoảnChi } from './duLieu.js'

export default function BiểuMẫuThêm({ khiThêm, thamKhảoNộiDung, đangGửi }) {
  const [nộiDung, đặtNộiDung] = useState('')
  const [sốTiền, đặtSốTiền] = useState('')
  const [loại, đặtLoại] = useState(DANH_MỤC[0])
  const [ngày, đặtNgày] = useState(hômNay())
  const [lỗi, đặtLỗi] = useState({})

  const xóaLỗi = (trường) => {
    đặtLỗi((trước) => ({ ...trước, [trường]: '' }))
  }

  const xửLýGửi = async (sựKiện) => {
    sựKiện.preventDefault()

    const lỗiMới = kiểmTraKhoảnChi({ nộiDung, sốTiền, loại, ngày })
    if (Object.keys(lỗiMới).length > 0) {
      đặtLỗi(lỗiMới)
      return
    }

    const thànhCông = await khiThêm({
      nộiDung: nộiDung.trim(),
      sốTiền: Number(sốTiền),
      loại,
      ngày,
    })

    if (thànhCông) {
      đặtNộiDung('')
      đặtSốTiền('')
      đặtLoại(DANH_MỤC[0])
      đặtNgày(hômNay())
      đặtLỗi({})
    }
  }

  return (
    <section className="thẻ">
      <h2 className="tiêu-đề-thẻ">Thêm khoản chi</h2>
      <form className="biểu-mẫu" onSubmit={xửLýGửi} noValidate>
        <div className="trường">
          <label className="nhãn-trường" htmlFor="nội-dung-b">
            Nội dung
          </label>
          <input
            id="nội-dung-b"
            ref={thamKhảoNộiDung}
            className="ô-nhập"
            type="text"
            placeholder="Ví dụ: Ăn trưa"
            value={nộiDung}
            onChange={(sựKiện) => {
              đặtNộiDung(sựKiện.target.value)
              xóaLỗi('nộiDung')
            }}
            aria-invalid={Boolean(lỗi.nộiDung)}
          />
          {lỗi.nộiDung && <p className="lỗi-trường">{lỗi.nộiDung}</p>}
        </div>

        <div className="hàng-đôi">
          <div className="trường">
            <label className="nhãn-trường" htmlFor="số-tiền-b">
              Số tiền
            </label>
            <input
              id="số-tiền-b"
              className="ô-nhập"
              type="number"
              min="0"
              step="1000"
              placeholder="0"
              value={sốTiền}
              onChange={(sựKiện) => {
                đặtSốTiền(sựKiện.target.value)
                xóaLỗi('sốTiền')
              }}
              aria-invalid={Boolean(lỗi.sốTiền)}
            />
            {lỗi.sốTiền && <p className="lỗi-trường">{lỗi.sốTiền}</p>}
          </div>

          <div className="trường">
            <label className="nhãn-trường" htmlFor="ngày-b">
              Ngày
            </label>
            <input
              id="ngày-b"
              className="ô-nhập"
              type="date"
              value={ngày}
              onChange={(sựKiện) => {
                đặtNgày(sựKiện.target.value)
                xóaLỗi('ngày')
              }}
              aria-invalid={Boolean(lỗi.ngày)}
            />
            {lỗi.ngày && <p className="lỗi-trường">{lỗi.ngày}</p>}
          </div>
        </div>

        <div className="trường">
          <label className="nhãn-trường" htmlFor="loại-b">
            Loại
          </label>
          <select
            id="loại-b"
            className="ô-chọn"
            value={loại}
            onChange={(sựKiện) => {
              đặtLoại(sựKiện.target.value)
              xóaLỗi('loại')
            }}
            aria-invalid={Boolean(lỗi.loại)}
          >
            {DANH_MỤC.map((mục) => (
              <option key={mục} value={mục}>
                {mục}
              </option>
            ))}
          </select>
          {lỗi.loại && <p className="lỗi-trường">{lỗi.loại}</p>}
        </div>

        <button type="submit" className="nút-chính" disabled={đangGửi}>
          {đangGửi ? 'Đang thêm…' : 'Thêm khoản chi'}
        </button>
      </form>
    </section>
  )
}
