import { useEffect, useMemo, useRef, useState } from 'react'
import ĐồngHồ from './DongHo.jsx'
import BiểuMẫuThêm from './BieuMauThem.jsx'
import BộLọc from './BoLoc.jsx'
import DanhSáchChi from './DanhSachChi.jsx'
import ThốngKê from './ThongKe.jsx'
import NútChuyểnChếĐộ from './NutChuyenCheDo.jsx'
import { useFetch } from './useFetch.js'
import { layDanhSáchChi, themChiMoi, xoaChi } from './apiGia.js'
import { địnhDạngTiền } from './duLieu.js'

export default function UngDungHooks() {
  const { dữLiệu: danhSáchChi, đangTải, lỗi, tảiLại } = useFetch(layDanhSáchChi)
  const [loạiĐangLọc, đặtLoạiĐangLọc] = useState('Tất cả')
  const [từKhóa, đặtTừKhóa] = useState('')
  const [từKhóaTrễ, đặtTừKhóaTrễ] = useState('')
  const [đangGửi, đặtĐangGửi] = useState(false)
  const [idĐangXóa, đặtIdĐangXóa] = useState('')
  const [lỗiThaoTác, đặtLỗiThaoTác] = useState('')

  const thamKhảoNộiDung = useRef(null)

  useEffect(() => {
    const bộHẹn = setTimeout(() => {
      đặtTừKhóaTrễ(từKhóa.trim().toLowerCase())
    }, 350)

    return () => clearTimeout(bộHẹn)
  }, [từKhóa])

  const tổngTấtCả = useMemo(
    () => danhSáchChi.reduce((tổng, khoản) => tổng + khoản.sốTiền, 0),
    [danhSáchChi],
  )

  useEffect(() => {
    document.title = `Sổ chi tiêu · ${địnhDạngTiền(tổngTấtCả)}`
  }, [tổngTấtCả])

  const danhSáchHiểnThị = useMemo(
    () =>
      danhSáchChi.filter((khoản) => {
        const khớpLoại = loạiĐangLọc === 'Tất cả' || khoản.loại === loạiĐangLọc
        const khớpTừKhóa = khoản.nộiDung.toLowerCase().includes(từKhóaTrễ)
        return khớpLoại && khớpTừKhóa
      }),
    [danhSáchChi, loạiĐangLọc, từKhóaTrễ],
  )

  const thêmKhoảnChi = async (khoảnMới) => {
    đặtĐangGửi(true)
    đặtLỗiThaoTác('')

    try {
      await themChiMoi(khoảnMới)
      tảiLại()
      thamKhảoNộiDung.current?.focus()
      return true
    } catch {
      đặtLỗiThaoTác('Thêm khoản chi thất bại. Vui lòng thử lại.')
      return false
    } finally {
      đặtĐangGửi(false)
    }
  }

  const xóaKhoảnChi = async (id) => {
    const khoản = danhSáchChi.find((mục) => mục.id === id)
    if (!khoản) return

    const đồngÝ = window.confirm(`Bạn có chắc muốn xóa khoản chi "${khoản.nộiDung}"?`)
    if (!đồngÝ) return

    đặtIdĐangXóa(id)
    đặtLỗiThaoTác('')

    try {
      await xoaChi(id)
      tảiLại()
    } catch {
      đặtLỗiThaoTác('Xóa khoản chi thất bại. Vui lòng thử lại.')
    } finally {
      đặtIdĐangXóa('')
    }
  }

  const đangTảiLầnĐầu = đangTải && danhSáchChi.length === 0

  return (
    <main className="trang">
      <header className="đầu-trang">
        <div className="khối-tiêu-đề">
          <h1>Sổ chi tiêu cá nhân</h1>
          <p className="mô-tả">
            Ghi lại từng khoản chi hằng ngày để biết tiền của bạn đi đâu.
          </p>
        </div>
        <div className="nhóm-đầu-trang">
          <NútChuyểnChếĐộ />
          <ĐồngHồ />
        </div>
      </header>

      <div className="bố-cục">
        <div className="cột-trái">
          <BiểuMẫuThêm
            khiThêm={thêmKhoảnChi}
            thamKhảoNộiDung={thamKhảoNộiDung}
            đangGửi={đangGửi}
          />
          <ThốngKê danhSáchChi={danhSáchChi} />
        </div>

        <div className="cột-phải">
          <section className="thẻ">
            <div className="thanh-công-cụ">
              <BộLọc loạiĐangLọc={loạiĐangLọc} khiĐổiLoại={đặtLoạiĐangLọc} />
              <input
                className="ô-tìm-kiếm"
                type="search"
                placeholder="Tìm theo nội dung…"
                value={từKhóa}
                onChange={(sựKiện) => đặtTừKhóa(sựKiện.target.value)}
                aria-label="Tìm khoản chi"
              />
            </div>

            {lỗiThaoTác && <p className="thông-báo-lỗi">{lỗiThaoTác}</p>}

            {đangTảiLầnĐầu ? (
              <div className="khung-tải">
                <span className="vòng-xoay" aria-hidden="true" />
                <p>Đang tải dữ liệu…</p>
              </div>
            ) : lỗi ? (
              <div className="khung-lỗi">
                <p>{lỗi}</p>
                <button type="button" className="nút-phụ" onClick={tảiLại}>
                  Thử lại
                </button>
              </div>
            ) : (
              <>
                <DanhSáchChi
                  danhSách={danhSáchHiểnThị}
                  khiXóa={xóaKhoảnChi}
                  idĐangXóa={idĐangXóa}
                />
                {đangTải && <p className="đang-đồng-bộ">Đang đồng bộ dữ liệu…</p>}
              </>
            )}
          </section>
        </div>
      </div>
    </main>
  )
}
