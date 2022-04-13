import { ReactElement } from 'react'
import { IconSupport24 } from '@hashicorp/flight-icons/svg-react/support-24'
import { IconHelp24 } from '@hashicorp/flight-icons/svg-react/help-24'
import { IconUser24 } from '@hashicorp/flight-icons/svg-react/user-24'
import BaseNewLayout from 'layouts/base-new'
import PreFooter from './components/pre-footer'

function Homepage(): ReactElement {
  return (
    <>
      <PreFooter
        heading="Looking for help?"
        description="Aenean interdum pulvinar nunc et maximus. Etiam imperdiet mattis sapien id commodow Aenean interdum pulvinar nunc nean interdum pulvinar."
        ctas={[
          {
            icon: (
              <IconSupport24 color="var(--token-color-highlight-foreground-primary)" />
            ),
            heading: 'Support',
            description: 'Open a support ticket',
            link: '/',
          },
          {
            icon: <IconHelp24 color="var(--token-color-packer-brand)" />,
            heading: 'Forum',
            description: 'Find your answer on the forum',
            link: '/',
          },
          {
            icon: <IconUser24 color="var(--token-color-nomad-brand)" />,
            heading: 'Community',
            description: 'Join our community',
            link: '/',
          },
        ]}
      />
    </>
  )
}

Homepage.layout = BaseNewLayout
export default Homepage