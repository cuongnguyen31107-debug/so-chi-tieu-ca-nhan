import { địnhDạngNgày, địnhDạngTiền, lớpLoại } from './duLieu.js'

function DòngChi({ khoản, khiXóa, đangXóa }) {
  return (
    <article className={đangXóa ? 'dòng-chi đang-xóa' : 'dòng-chi'}>
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
        onClick={() => khiXóa(khoản.id)}
        disabled={đangXóa}
        aria-label={`Xóa khoản chi ${khoản.nộiDung}`}
      >
        {đangXóa ? 'Đang xóa…' : 'Xóa'}
      </button>
    </article>
  )
}

export default function DanhSáchChi({ danhSách, khiXóa, idĐangXóa }) {
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
        <DòngChi
          key={khoản.id}
          khoản={khoản}
          khiXóa={khiXóa}
          đangXóa={khoản.id === idĐangXóa}
        />
      ))}

      <div className="dòng-tổng">
        <span>{danhSách.length} khoản chi</span>
        <strong>{địnhDạngTiền(tổngTiền)}</strong>
      </div>
    </div>
  )
}
