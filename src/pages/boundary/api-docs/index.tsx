function ApiDocsView() {
	return (
		<>
			<pre>
				<code>{JSON.stringify({ hello: 'world!' }, null, 2)}</code>
			</pre>
		</>
	)
}

export default ApiDocsView
