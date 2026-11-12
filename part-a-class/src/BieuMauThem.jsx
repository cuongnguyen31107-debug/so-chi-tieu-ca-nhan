import React from 'react'
import { DANH_MỤC, hômNay, kiểmTraKhoảnChi } from './duLieu.js'

class BiểuMẫuThêm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      nộiDung: '',
      sốTiền: '',
      loại: DANH_MỤC[0],
      ngày: hômNay(),
      lỗi: {},
    }
  }

  đặtGiáTrị = (trường, giáTrị) => {
    this.setState((trước) => ({
      [trường]: giáTrị,
      lỗi: { ...trước.lỗi, [trường]: '' },
    }))
  }

  xửLýGửi = (sựKiện) => {
    sựKiện.preventDefault()
    const { nộiDung, sốTiền, loại, ngày } = this.state
    const lỗi = kiểmTraKhoảnChi({ nộiDung, sốTiền, loại, ngày })

    if (Object.keys(lỗi).length > 0) {
      this.setState({ lỗi })
      return
    }

    this.props.khiThêm({
      nộiDung: nộiDung.trim(),
      sốTiền: Number(sốTiền),
      loại,
      ngày,
    })

    this.setState({
      nộiDung: '',
      sốTiền: '',
      loại: DANH_MỤC[0],
      ngày: hômNay(),
      lỗi: {},
    })
  }

  render() {
    const { nộiDung, sốTiền, loại, ngày, lỗi } = this.state

    return (
      <section className="thẻ">
        <h2 className="tiêu-đề-thẻ">Thêm khoản chi</h2>
        <form className="biểu-mẫu" onSubmit={this.xửLýGửi} noValidate>
          <div className="trường">
            <label className="nhãn-trường" htmlFor="nội-dung-a">
              Nội dung
            </label>
            <input
              id="nội-dung-a"
              className="ô-nhập"
              type="text"
              placeholder="Ví dụ: Ăn trưa"
              value={nộiDung}
              onChange={(sựKiện) => this.đặtGiáTrị('nộiDung', sựKiện.target.value)}
              aria-invalid={Boolean(lỗi.nộiDung)}
            />
            {lỗi.nộiDung && <p className="lỗi-trường">{lỗi.nộiDung}</p>}
          </div>

          <div className="hàng-đôi">
            <div className="trường">
              <label className="nhãn-trường" htmlFor="số-tiền-a">
                Số tiền
              </label>
              <input
                id="số-tiền-a"
                className="ô-nhập"
                type="number"
                min="0"
                step="1000"
                placeholder="0"
                value={sốTiền}
                onChange={(sựKiện) => this.đặtGiáTrị('sốTiền', sựKiện.target.value)}
                aria-invalid={Boolean(lỗi.sốTiền)}
              />
              {lỗi.sốTiền && <p className="lỗi-trường">{lỗi.sốTiền}</p>}
            </div>

            <div className="trường">
              <label className="nhãn-trường" htmlFor="ngày-a">
                Ngày
              </label>
              <input
                id="ngày-a"
                className="ô-nhập"
                type="date"
                value={ngày}
                onChange={(sựKiện) => this.đặtGiáTrị('ngày', sựKiện.target.value)}
                aria-invalid={Boolean(lỗi.ngày)}
              />
              {lỗi.ngày && <p className="lỗi-trường">{lỗi.ngày}</p>}
            </div>
          </div>

          <div className="trường">
            <label className="nhãn-trường" htmlFor="loại-a">
              Loại
            </label>
            <select
              id="loại-a"
              className="ô-chọn"
              value={loại}
              onChange={(sựKiện) => this.đặtGiáTrị('loại', sựKiện.target.value)}
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

          <button type="submit" className="nút-chính">
            Thêm khoản chi
          </button>
        </form>
      </section>
    )
  }
}

export default BiểuMẫuThêm
