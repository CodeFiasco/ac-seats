import React from 'react';
import Flex from '../components/Flex';
import Card from '../components/Card';

const SPACE_KEY = 32;

export default class extends React.Component {
    static async getInitialProps({ query }) {
        return { rows: organizeSeats(query.campus.cadets) };
    };

    state = { rows: this.props.rows, show: 0 };

    componentDidMount() {
        document.addEventListener('keyup', key => {
            if (key.keyCode !== SPACE_KEY) {
                return;
            }

            this.setState({ show: this.state.show + 1 });
        });

        randomize(this.props.rows);
    };

    render() {
        let aux = 0;

        return (
            <Flex direction={Flex.DIRECTION.VERTICAL} style={{ height: '100vh' }}>
                {this.state.rows.map((row, index) => (
                    <Flex key={index}>
                        {row.map((cadet) =>
                            <Flex key={cadet} direction={Flex.DIRECTION.VERTICAL}>
                                <Card>
                                    <Card.Image src="/static/chair.png" />
                                    <Card.Description text={aux++ < this.state.show ? cadet : ''} />
                                </Card>
                            </Flex>
                        )}
                    </Flex>
                ))}
            </Flex>
        );
    };
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

function randomize(rows) {

    for (let i = 0; i < rows.length; i++) {

        for (let j = 0; j < rows[i].length; j++) {
            const r = Math.floor(Math.random() * rows.length);
            const s = Math.floor(Math.random() * rows[r].length);
            const aux = rows[r][s];
            rows[r][s] = rows[i][j];
            rows[i][j] = aux;
        }
    }

    return rows;
}