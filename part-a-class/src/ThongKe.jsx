import React from 'react'
import { DANH_MỤC, địnhDạngTiền, lớpLoại } from './duLieu.js'

class ThốngKê extends React.Component {
  render() {
    const { danhSáchChi } = this.props
    const tổngTheoLoại = DANH_MỤC.map((loại) => ({
      loại,
      tổng: danhSáchChi
        .filter((khoản) => khoản.loại === loại)
        .reduce((tổng, khoản) => tổng + khoản.sốTiền, 0),
    }))
    const tổngCộng = tổngTheoLoại.reduce((tổng, mục) => tổng + mục.tổng, 0)
    const lớnNhất = Math.max(...tổngTheoLoại.map((mục) => mục.tổng), 1)

    return (
      <section className="thẻ thống-kê">
        <h2 className="tiêu-đề-thẻ">Thống kê theo loại</h2>
        <p className="tổng-cộng">
          Tổng cộng <strong>{địnhDạngTiền(tổngCộng)}</strong>
        </p>

        <div className="danh-sách-thống-kê">
          {tổngTheoLoại.map((mục) => (
            <div key={mục.loại} className="dòng-thống-kê">
              <div className="nhãn-thống-kê">
                <span>{mục.loại}</span>
                <span>{địnhDạngTiền(mục.tổng)}</span>
              </div>
              <div className="thanh-nền">
                <div
                  className={`thanh-đầy ${lớpLoại(mục.loại)}`}
                  style={{ width: `${(mục.tổng / lớnNhất) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }
}

export default ThốngKê
