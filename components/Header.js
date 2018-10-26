import Head from 'next/head';

export default class extends React.Component {
    render() {
        return (
            <Head>
                <title>&lt;A/C_&gt; Randomizer</title>
                <link href="/static/styles.css" rel="stylesheet" />
                <link rel="shortcut icon" type="image/png" href="/static/favicon.png"/>
            </Head>
        )
    }
}