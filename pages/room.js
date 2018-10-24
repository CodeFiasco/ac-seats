import React from 'react';
import Flex from '../components/Flex';
import Card from '../components/Card';

export default class extends React.Component {
    static async getInitialProps({ query }) {
        return { rows: organizeSeats(query.campus.cadets) };
    }

    state = { rows: this.props.rows };

    render() {
        return (
            <Flex direction={Flex.DIRECTION.VERTICAL} style={{ height: '100vh' }}>
                {this.state.rows.map((row, index) => (
                    <Flex key={index}>
                        {row.map((cadet) =>
                            <Flex key={cadet} direction={Flex.DIRECTION.VERTICAL}>
                                <Card>
                                    <Card.Image src="/static/chair.png" />
                                    <Card.Description text={cadet} />
                                </Card>
                            </Flex>
                        )}
                    </Flex>
                ))}
            </Flex>
        );
    }
};

function organizeSeats(cadets) {
    const rows = [];

    cadets.forEach(c => {
        if (!rows[c.row]) {
            rows[c.row] = [];
        }

        rows[c.row][c.seat] = c.name;
    });

    return rows;
}