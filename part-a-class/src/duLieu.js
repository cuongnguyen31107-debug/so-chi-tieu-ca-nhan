export const DANH_MỤC = ['Ăn uống', 'Đi lại', 'Học tập', 'Giải trí']

export const dữLiệuMẫu = [
  { id: 'm1', nộiDung: 'Bữa sáng phở bò', sốTiền: 45000, loại: 'Ăn uống', ngày: '2026-11-12' },
  { id: 'm2', nộiDung: 'Vé xe buýt đi học', sốTiền: 7000, loại: 'Đi lại', ngày: '2026-11-12' },
  { id: 'm3', nộiDung: 'Sách lập trình React', sốTiền: 180000, loại: 'Học tập', ngày: '2026-11-10' },
  { id: 'm4', nộiDung: 'Xem phim cuối tuần', sốTiền: 90000, loại: 'Giải trí', ngày: '2026-11-09' },
  { id: 'm5', nộiDung: 'Cà phê với bạn', sốTiền: 35000, loại: 'Ăn uống', ngày: '2026-11-08' },
  { id: 'm6', nộiDung: 'Gửi xe máy', sốTiền: 5000, loại: 'Đi lại', ngày: '2026-11-07' },
]

const LỚP_LOẠI = {
  'Ăn uống': 'an-uong',
  'Đi lại': 'di-lai',
  'Học tập': 'hoc-tap',
  'Giải trí': 'giai-tri',
}

export const lớpLoại = (loại) => LỚP_LOẠI[loại] ?? 'khac'

export const địnhDạngTiền = (sốTiền) => `${Number(sốTiền).toLocaleString('vi-VN')} đ`

export const địnhDạngNgày = (ngày) =>
  new Date(`${ngày}T00:00:00`).toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })

export const hômNay = () => {
  const hiệnTại = new Date()
  const tháng = String(hiệnTại.getMonth() + 1).padStart(2, '0')
  const ngày = String(hiệnTại.getDate()).padStart(2, '0')
  return `${hiệnTại.getFullYear()}-${tháng}-${ngày}`
}

export const kiểmTraKhoảnChi = ({ nộiDung, sốTiền, loại, ngày }) => {
  const lỗi = {}
  const nộiDungĐãGọt = String(nộiDung).trim()
  const sốTiềnSố = Number(sốTiền)

  if (!nộiDungĐãGọt) {
    lỗi.nộiDung = 'Vui lòng nhập nội dung khoản chi.'
  } else if (nộiDungĐãGọt.length > 80) {
    lỗi.nộiDung = 'Nội dung không được vượt quá 80 ký tự.'
  }

  if (sốTiền === '' || sốTiền === null || sốTiền === undefined) {
    lỗi.sốTiền = 'Vui lòng nhập số tiền.'
  } else if (!Number.isFinite(sốTiềnSố) || sốTiềnSố <= 0) {
    lỗi.sốTiền = 'Số tiền phải là số lớn hơn 0.'
  }

  if (!DANH_MỤC.includes(loại)) {
    lỗi.loại = 'Vui lòng chọn loại chi tiêu.'
  }

  if (!ngày) {
    lỗi.ngày = 'Vui lòng chọn ngày.'
  }

  return lỗi
}
