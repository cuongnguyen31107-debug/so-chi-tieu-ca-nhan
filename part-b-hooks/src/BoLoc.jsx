import { DANH_MỤC, lớpLoại } from './duLieu.js'

export default function BộLọc({ loạiĐangLọc, khiĐổiLoại }) {
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
