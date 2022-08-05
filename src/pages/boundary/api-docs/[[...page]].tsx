/* Used server-side only */
import { cachedGetProductData } from 'lib/get-product-data'
import { isDeployPreview } from 'lib/env-checks'
import fetchGithubFile from 'lib/fetch-github-file'
import {
	getPathsFromSchema,
	getPropsForPage,
} from '@hashicorp/react-open-api-page/server'
import {
	processSchemaString,
	processSchemaFile,
} from '@hashicorp/react-open-api-page/process-schema'
import SidebarSidecarLayout from 'layouts/sidebar-sidecar'

const productSlug = 'boundary'
const targetFile = {
	owner: 'hashicorp',
	repo: 'boundary',
	path: 'internal/gen/controller.swagger.json',
	ref: 'stable-website',
}
// The path to read from when running local preview in the context of the boundary repository
const targetLocalFile = '../../internal/gen/controller.swagger.json'

function ApiDocsView(props) {
	return (
		<>
			<pre>
				<code>{JSON.stringify(props, null, 2)}</code>
			</pre>
		</>
	)
}

export async function getStaticPaths() {
	let schema
	if (isDeployPreview()) {
		schema = await processSchemaFile(targetLocalFile)
	} else {
		const swaggerFile = await fetchGithubFile(targetFile)
		schema = await processSchemaString(swaggerFile)
	}
	const paths = getPathsFromSchema(schema)
	return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
	let schema
	if (isDeployPreview()) {
		schema = await processSchemaFile(targetLocalFile)
	} else {
		const swaggerFile = await fetchGithubFile(targetFile)
		schema = await processSchemaString(swaggerFile)
	}

	// Product data
	const productData = cachedGetProductData(productSlug)

	// Layout props
	const headings = []
	const breadcrumbLinks = [
		{ title: 'Developer', url: '/' },
		{ title: 'Boundary', url: `/boundary` },
		{ title: 'API', url: `/boundary/api-docs` },
	]

	const apiPageProps = getPropsForPage(schema, params)
	return {
		props: {
			...apiPageProps,
			layoutProps: {
				headings,
				breadcrumbLinks,
				sidebarNavDataLevels: [
					{
						children: 'TODO: API docs sidebar',
					},
				],
			},
			product: productData,
		},
	}
}

ApiDocsView.layout = SidebarSidecarLayout
export default ApiDocsView
