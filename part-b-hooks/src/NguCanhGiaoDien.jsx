import { createContext, useEffect, useState } from 'react'

export const NgữCảnhGiaoDiện = createContext({
  chếĐộ: 'sáng',
  đặtChếĐộ: () => {},
})

export function NhàCungCấpGiaoDiện({ children }) {
  const [chếĐộ, đặtChếĐộ] = useState('sáng')

  useEffect(() => {
    document.documentElement.dataset.cheDo = chếĐộ === 'tối' ? 'toi' : 'sang'
  }, [chếĐộ])

  return (
    <NgữCảnhGiaoDiện.Provider value={{ chếĐộ, đặtChếĐộ }}>
      {children}
    </NgữCảnhGiaoDiện.Provider>
  )
}
