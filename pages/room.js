import Flex from '../components/Flex';
import Card from '../components/Card';
import organizeSeats from '../utils/organizeSeats';

const SPACE_KEY = 32;
const S_KEY = 83;
let jerkMode = false;

export default class extends React.Component {
    static async getInitialProps({ query }) {
        return { rows: organizeSeats(query.campus.cadets) };
    };

    state = { rows: this.props.rows, show: 0 };

    componentDidMount() {
        document.addEventListener('keydown', key => {
            if (this.state.show === 0 && key.keyCode === S_KEY) {
                jerkMode = true;
            }
        });

        document.addEventListener('keyup', key => {
            if (key.keyCode === S_KEY) {
                jerkMode = true;
            }

            if (key.keyCode !== SPACE_KEY) {
                return;
            }

            if (!jerkMode && this.state.show === 0) {
                randomize(this.props.rows);
            }
            
            this.setState({ show: this.state.show + 1 });
        });
    };

    render() {
        let aux = 0;

        return (
            <Flex direction={Flex.DIRECTION.VERTICAL} style={{ height: '100vh' }}>
                {this.state.rows.map((row, index) => (
                    <Flex key={index}>
                        {row.map((cadet, index) =>
                            <Flex key={index} direction={Flex.DIRECTION.VERTICAL}>
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