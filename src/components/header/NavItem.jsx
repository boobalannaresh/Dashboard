import React from 'react'

export default function NavItem({nav}) {
  return (
    <i className='nav-item' >
        <a className='nav-link collapsed' href='#' style={{ textDecoration:"none"}}>
            <i className={nav.icon}></i>
            <span>{nav.name}</span>
        </a>
    </i>
  )
}
