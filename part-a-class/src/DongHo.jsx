import React from 'react'

class ĐồngHồ extends React.Component {
  constructor(props) {
    super(props)
    this.state = { thờiGian: new Date() }
  }

  componentDidMount() {
    this.bộĐếm = setInterval(() => {
      this.setState({ thờiGian: new Date() })
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.bộĐếm)
  }

  render() {
    const { thờiGian } = this.state
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
}

export default ĐồngHồ
