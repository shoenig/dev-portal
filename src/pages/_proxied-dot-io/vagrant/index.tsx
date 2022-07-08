import * as React from 'react'
import { proxiedRivetClient } from 'lib/cms'
import Head from 'next/head'
import { renderMetaTags } from '@hashicorp/react-head'
import IoHomeHero from 'components/_proxied-dot-io/common/io-home-hero'
import IoHomeIntro from 'components/_proxied-dot-io/common/io-home-intro'
import IoHomeInPractice from 'components/_proxied-dot-io/common/io-home-in-practice'
import IoCardContainer from 'components/_proxied-dot-io/common/io-card-container'
import IoHomeCaseStudies from 'components/_proxied-dot-io/common/io-home-case-studies'
import IoHomeCallToAction from 'components/_proxied-dot-io/common/io-home-call-to-action'
import IoHomePreFooter from 'components/_proxied-dot-io/common/io-home-pre-footer'
import homepageQuery from './home/query.graphql'
import s from './home/style.module.css'
import VagrantIoLayout from 'layouts/_proxied-dot-io/vagrant'

export default function Homepage({ data }): React.ReactElement {
	const {
		seo,
		heroHeading,
		heroDescription,
		heroCtas,
		heroCards,
		introHeading,
		introDescription,
		introFeatures,
		introVideo,
		inPracticeHeading,
		inPracticeDescription,
		inPracticeCards,
		inPracticeCtaHeading,
		inPracticeCtaDescription,
		inPracticeCtaLink,
		inPracticeCtaImage,
		useCasesHeading,
		useCasesDescription,
		useCases,
		caseStudiesHeading,
		caseStudiesDescription,
		caseStudiesFeatured,
		caseStudiesLinks,
		callToActionHeading,
		callToActionDescription,
		callToActionCtas,
		preFooterHeading,
		preFooterDescription,
		preFooterCtas,
	} = data
	const _introVideo = introVideo[0]

	return (
		<>
			<Head>{renderMetaTags(seo)}</Head>

			<IoHomeHero
				pattern={require('/public/vagrant/img/home-hero-pattern.svg')}
				brand="vagrant"
				heading={heroHeading}
				description={heroDescription}
				ctas={heroCtas}
				cards={heroCards.map((card) => {
					return {
						...card,
						cta: card.cta[0],
					}
				})}
			/>

			<IoHomeIntro
				brand="vagrant"
				heading={introHeading}
				description={introDescription}
				features={introFeatures}
				video={{
					youtubeId: _introVideo?.youtubeId,
					thumbnail: _introVideo?.thumbnail?.url,
					heading: _introVideo?.heading,
					description: _introVideo?.description,
					person: {
						name: _introVideo?.personName,
						description: _introVideo?.personDescription,
						avatar: _introVideo?.personAvatar?.url,
					},
				}}
			/>
			{useCases.length > 0 ? (
				<section className={s.useCases}>
					<div className={s.container}>
						<IoCardContainer
							heading={useCasesHeading}
							description={useCasesDescription}
							cardsPerRow={4}
							cards={useCases.map((useCase) => {
								return {
									link: {
										url: `/use-cases/${useCase.slug}`,
										type: 'inbound',
									},
									heading: useCase.heroHeading,
									description: useCase.heroDescription,
								}
							})}
						/>
					</div>
				</section>
			) : null}
			<IoHomeInPractice
				brand="vagrant"
				pattern={require('/public/vagrant/img/practice-pattern.svg')}
				heading={inPracticeHeading}
				description={inPracticeDescription}
				cards={inPracticeCards.map((card) => {
					return {
						eyebrow: card.eyebrow,
						link: {
							url: card.link,
							type: 'inbound',
						},
						heading: card.heading,
						description: card.description,
						products: card.products,
					}
				})}
				cta={{
					heading: inPracticeCtaHeading,
					description: inPracticeCtaDescription,
					link: inPracticeCtaLink,
					image: inPracticeCtaImage,
				}}
			/>

			<IoHomeCaseStudies
				heading={caseStudiesHeading}
				description={caseStudiesDescription}
				primary={caseStudiesFeatured}
				secondary={caseStudiesLinks}
			/>

			<IoHomeCallToAction
				brand="vagrant"
				heading={callToActionHeading}
				content={callToActionDescription}
				links={callToActionCtas}
			/>

			<IoHomePreFooter
				brand="vagrant"
				heading={preFooterHeading}
				description={preFooterDescription}
				ctas={preFooterCtas}
			/>
		</>
	)
}

Homepage.layout = VagrantIoLayout

export async function getStaticProps() {
	const query = proxiedRivetClient('vagrant')
	const { vagrantHomepage } = await query({
		query: homepageQuery,
	})

	return {
		props: {
			data: vagrantHomepage,
		},
		revalidate:
			process.env.HASHI_ENV === 'production'
				? process.env.GLOBAL_REVALIDATE
				: 10,
	}
}
