import { dữLiệuMẫu } from './duLieu.js'

let khoDữLiệu = dữLiệuMẫu.map((khoản) => ({ ...khoản }))

const chờ = (thờiGian) =>
  new Promise((hoànThành) => setTimeout(hoànThành, thờiGian))

export async function layDanhSáchChi() {
  await chờ(500)
  return khoDữLiệu.map((khoản) => ({ ...khoản }))
}

export async function themChiMoi(khoảnMới) {
  await chờ(350)
  const khoản = { ...khoảnMới, id: crypto.randomUUID() }
  khoDữLiệu = [khoản, ...khoDữLiệu]
  return { ...khoản }
}

export async function xoaChi(id) {
  await chờ(350)
  khoDữLiệu = khoDữLiệu.filter((khoản) => khoản.id !== id)
  return id
}
