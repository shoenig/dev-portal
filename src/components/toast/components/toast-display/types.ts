import { ReactNode } from 'react'

export enum ToastColor {
  neutral = 'neutral',
  highlight = 'highlight',
  success = 'success',
  warning = 'warning',
  critical = 'critical',
}

export interface ToastDisplayProps {
  /**
   * Title text for the toast
   */
  title?: string
  /**
   * Description text. Note that HTML is not yet supported, but may be in the
   * future. When a title is present, the description is shown below the title.
   */
  description?: string
  /**
   * A function called when the close button is clicked.
   */
  onDismiss: () => void
  /**
   * Color theme for the toast. Defaults to "neutral".
   */
  color?: ToastColor
  /**
   * Optional icon to render beside the toast's content area.
   */
  icon?: ReactNode
  /**
   * Optional actions to render below the toast's title and description.
   * Expects one or many Button, ButtonLink, or StandaloneLink components.
   * When passing multiple actions, wrapping them in a fragment is recommended
   * to ensure correct spacing.
   */
  actions?: ReactNode
  /**
   * Option arbitrary content to render into the component.
   * Can be used alone, or in combination with other props. When used in
   * combination, children will be rendered after the description, and
   * before any provided actions.
   * Note that icon can also still be used with custom children content.
   */
  children?: ReactNode
}