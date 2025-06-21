'use client'

import { usePathname } from 'next/navigation'


function Header () {
  const pathName = usePathname()

  const isLoginPage: boolean = pathName === '/login'

  if (isLoginPage) return null // refraiing from showing the header in th logiin page

  return (
    <div>
      Header
    </div>
  )
}

export default Header
