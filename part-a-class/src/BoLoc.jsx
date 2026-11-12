import React from 'react'
import { DANH_MỤC, lớpLoại } from './duLieu.js'

class BộLọc extends React.Component {
  render() {
    const { loạiĐangLọc, khiĐổiLoại } = this.props
    const cácLoại = ['Tất cả', ...DANH_MỤC]

    return (
      <div className="bộ-lọc" role="group" aria-label="Lọc theo loại">
        {cácLoại.map((loại) => (
          <button
            key={loại}
            type="button"
            className={loại === loạiĐangLọc ? 'nút-lọc đang-lọc' : 'nút-lọc'}
            onClick={() => khiĐổiLoại(loại)}
          >
            {loại !== 'Tất cả' && (
              <span className={`chấm-lọc ${lớpLoại(loại)}`} aria-hidden="true" />
            )}
            {loại}
          </button>
        ))}
      </div>
    )
  }
}

export default BộLọc
