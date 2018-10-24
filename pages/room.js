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
            <Flex direction={'vertical'} style={{ height: '100vh' }}>
                {this.state.rows.map((row, index) => (
                    <Flex key={index}>
                        {row.map((cadet) =>
                            <Flex key={cadet} direction={'vertical'}>
                                <Card>
                                    <div>
                                        <img src="/static/chair.png" style={{height: '65%'}}/>
                                        <div style={{height: '35%'}}>{cadet}</div>
                                    </div>
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