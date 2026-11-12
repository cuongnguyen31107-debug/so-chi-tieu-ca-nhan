import { useClock } from './useClock.js'

export default function ĐồngHồ() {
  const thờiGian = useClock()

  return (
    <div className="đồng-hồ" aria-label="Đồng hồ hiện tại">
      <span className="đồng-hồ-giờ">
        {thờiGian.toLocaleTimeString('vi-VN', { hour12: false })}
      </span>
      <span className="đồng-hồ-ngày">
        {thờiGian.toLocaleDateString('vi-VN', {
          weekday: 'long',
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })}
      </span>
    </div>
  )
}
