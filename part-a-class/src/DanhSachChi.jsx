import React from 'react'
import { địnhDạngNgày, địnhDạngTiền, lớpLoại } from './duLieu.js'

class DòngChi extends React.Component {
  xácNhậnXóa = () => {
    this.props.khiXóa(this.props.khoản.id)
  }

  render() {
    const { khoản } = this.props

    return (
      <article className="dòng-chi">
        <span className={`chấm-loại ${lớpLoại(khoản.loại)}`} aria-hidden="true" />

        <div className="thông-tin-chi">
          <p className="tên-chi">{khoản.nộiDung}</p>
          <div className="chi-tiết-chi">
            <span className="nhãn-loại">{khoản.loại}</span>
            <span>{địnhDạngNgày(khoản.ngày)}</span>
          </div>
        </div>

        <span className="số-tiền">-{địnhDạngTiền(khoản.sốTiền)}</span>

        <button
          type="button"
          className="nút-xóa"
          onClick={this.xácNhậnXóa}
          aria-label={`Xóa khoản chi ${khoản.nộiDung}`}
        >
          Xóa
        </button>
      </article>
    )
  }
}

class DanhSáchChi extends React.Component {
  render() {
    const { danhSách, khiXóa } = this.props
    const tổngTiền = danhSách.reduce((tổng, khoản) => tổng + khoản.sốTiền, 0)

    if (danhSách.length === 0) {
      return (
        <div className="trạng-thái-trống">
          <p>Không có khoản chi nào phù hợp.</p>
          <span>Thử đổi bộ lọc hoặc thêm khoản chi mới.</span>
        </div>
      )
    }

    return (
      <div className="danh-sách">
        {danhSách.map((khoản) => (
          <DòngChi key={khoản.id} khoản={khoản} khiXóa={khiXóa} />
        ))}

        <div className="dòng-tổng">
          <span>{danhSách.length} khoản chi</span>
          <strong>{địnhDạngTiền(tổngTiền)}</strong>
        </div>
      </div>
    )
  }
}

export default DanhSáchChi
