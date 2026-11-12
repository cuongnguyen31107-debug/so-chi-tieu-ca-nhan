import { useContext } from 'react'
import { NgữCảnhGiaoDiện } from './NguCanhGiaoDien.jsx'

export default function NútChuyểnChếĐộ() {
  const { chếĐộ, đặtChếĐộ } = useContext(NgữCảnhGiaoDiện)
  const đangTối = chếĐộ === 'tối'

  return (
    <button
      type="button"
      className="nút-chuyển-chế-độ"
      onClick={() => đặtChếĐộ(đangTối ? 'sáng' : 'tối')}
    >
      {đangTối ? 'Chế độ sáng' : 'Chế độ tối'}
    </button>
  )
}
