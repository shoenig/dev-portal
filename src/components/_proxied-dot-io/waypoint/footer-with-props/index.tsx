import Footer from 'components/_proxied-dot-io/waypoint/footer'
import { CardProps } from '../card'

function FooterWithProps({
	openConsentManager,
	heading,
	description,
	cards,
}: {
	openConsentManager: () => void
	heading: string
	description: string
	cards: [CardProps, CardProps]
}): React.ReactElement {
	return (
		<Footer
			openConsentManager={openConsentManager}
			heading={heading}
			description={description}
			cards={cards}
			ctaLinks={[
				{
					text: 'Waypoint tutorials',
					url: 'https://learn.hashicorp.com/waypoint',
				},
				{
					text: 'Waypoint documentation',
					url: '/docs',
				},
			]}
			navLinks={[
				{
					text: 'Documentation',
					url: '/docs',
				},
				{
					text: 'CLI Reference',
					url: '/commands',
				},
				{
					text: 'Tutorials',
					url: 'https://learn.hashicorp.com/waypoint',
				},
				{
					text: 'Integrations',
					url: '/plugins',
				},
			]}
		/>
	)
}

export default FooterWithProps
