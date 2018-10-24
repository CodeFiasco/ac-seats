import React from 'react';

export default class extends React.Component {
    static async getInitialProps({ query }) {
        return { campus: query.campus };
    }

    render() {
        console.log(this.props.campus);
        return (
            <div>
                <h1>{this.props.campus.location}</h1>
            </div>
        )
    }
}