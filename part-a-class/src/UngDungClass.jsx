import React from 'react'
import ĐồngHồ from './DongHo.jsx'
import BiểuMẫuThêm from './BieuMauThem.jsx'
import BộLọc from './BoLoc.jsx'
import DanhSáchChi from './DanhSachChi.jsx'
import ThốngKê from './ThongKe.jsx'
import { dữLiệuMẫu, địnhDạngTiền } from './duLieu.js'

class UngDungClass extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      danhSáchChi: dữLiệuMẫu,
      loạiĐangLọc: 'Tất cả',
      từKhóa: '',
    }
  }

  componentDidMount() {
    this.cậpNhậtTiêuĐề()
  }

  componentDidUpdate(trướcĐó) {
    if (trướcĐó.danhSáchChi !== this.state.danhSáchChi) {
      this.cậpNhậtTiêuĐề()
    }
  }

  cậpNhậtTiêuĐề = () => {
    const tổngChi = this.state.danhSáchChi.reduce(
      (tổng, khoản) => tổng + khoản.sốTiền,
      0,
    )
    document.title = `Sổ chi tiêu · ${địnhDạngTiền(tổngChi)}`
  }

  thêmKhoảnChi = (khoảnMới) => {
    this.setState((trước) => ({
      danhSáchChi: [
        { ...khoảnMới, id: crypto.randomUUID() },
        ...trước.danhSáchChi,
      ],
    }))
  }

  xóaKhoảnChi = (id) => {
    const khoản = this.state.danhSáchChi.find((mục) => mục.id === id)
    if (!khoản) return

    const đồngÝ = window.confirm(`Bạn có chắc muốn xóa khoản chi "${khoản.nộiDung}"?`)
    if (!đồngÝ) return

    this.setState((trước) => ({
      danhSáchChi: trước.danhSáchChi.filter((mục) => mục.id !== id),
    }))
  }

  đổiLoạiLọc = (loại) => {
    this.setState({ loạiĐangLọc: loại })
  }

  đổiTừKhóa = (sựKiện) => {
    this.setState({ từKhóa: sựKiện.target.value })
  }

  render() {
    const { danhSáchChi, loạiĐangLọc, từKhóa } = this.state
    const từKhóaĐãGọt = từKhóa.trim().toLowerCase()

    const danhSáchHiểnThị = danhSáchChi.filter((khoản) => {
      const khớpLoại = loạiĐangLọc === 'Tất cả' || khoản.loại === loạiĐangLọc
      const khớpTừKhóa = khoản.nộiDung.toLowerCase().includes(từKhóaĐãGọt)
      return khớpLoại && khớpTừKhóa
    })

    return (
      <main className="trang">
        <header className="đầu-trang">
          <div className="khối-tiêu-đề">
            <h1>Sổ chi tiêu cá nhân</h1>
            <p className="mô-tả">
              Ghi lại từng khoản chi hằng ngày để biết tiền của bạn đi đâu.
            </p>
          </div>
          <ĐồngHồ />
        </header>

        <div className="bố-cục">
          <div className="cột-trái">
            <BiểuMẫuThêm khiThêm={this.thêmKhoảnChi} />
            <ThốngKê danhSáchChi={danhSáchChi} />
          </div>

          <div className="cột-phải">
            <section className="thẻ">
              <div className="thanh-công-cụ">
                <BộLọc loạiĐangLọc={loạiĐangLọc} khiĐổiLoại={this.đổiLoạiLọc} />
                <input
                  className="ô-tìm-kiếm"
                  type="search"
                  placeholder="Tìm theo nội dung…"
                  value={từKhóa}
                  onChange={this.đổiTừKhóa}
                  aria-label="Tìm khoản chi"
                />
              </div>

              <DanhSáchChi danhSách={danhSáchHiểnThị} khiXóa={this.xóaKhoảnChi} />
            </section>
          </div>
        </div>
      </main>
    )
  }
}

export default UngDungClass
