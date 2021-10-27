import { MenuItem } from 'components/sidebar'
import s from './style.module.css'

interface SidebarMenuItemProps {
  isActive: boolean
  item: MenuItem
}

// TODO: implement submenus (ref: https://app.asana.com/0/1201010428539925/1201265683986459/f)
const SidebarMenuItem: React.FC<SidebarMenuItemProps> = ({
  isActive = false,
  item,
}) => {
  // TODO: handle the case when `href` is set
  const { divider, title, path } = item

  // TODO: remove this once `divider` isn't in the data anymore
  // Design decided to remove the dividers in the new sidebar.
  if (divider) {
    return null
  }

  return (
    <li>
      {/* TODO: conditionally render as button if submenu */}
      <a
        aria-current={isActive ? 'page' : undefined}
        className={s.sidebarLink}
        href={path}
      >
        <span>{title}</span>
        {/* TODO: this is for the submenu icon */}
        {/* <span></span> */}
      </a>
    </li>
  )
}

export default SidebarMenuItem