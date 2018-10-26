import Header from '../components/Header';
import Flex from '../components/Flex';
import Card from '../components/Card';
import converter from '../utils/converter';
import sounds from '../utils/sound';

const SPACE_KEY = 32;
const S_KEY = 83;
let jerkMode = false;

export default class extends React.Component {
    static async getInitialProps({ query }) {
        const cadets = query.campus.cadets;
        return { rows: converter.cadetsToRows(cadets), size: cadets.length };
    };
    
    state = { rows: this.props.rows, show: 0 };
    
    componentDidMount() {
        sounds.init(this.props.size);
        
        document.addEventListener('keydown', key => {
            if (this.state.show === 0 && key.keyCode === S_KEY) {
                jerkMode = true;
            }

            if (key.keyCode !== SPACE_KEY || sounds.isPlaying()) {
                return;
            }

            if (!jerkMode && this.state.show === 0) {
                randomize(this.props.rows);
            }

            sounds.suspense();
        });

        document.addEventListener('keyup', key => {
            if (key.keyCode === S_KEY) {
                jerkMode = true;
            }

            if (key.keyCode !== SPACE_KEY) {
                return;
            }
            
            this.setState({ show: this.state.show + 1 });
            sounds.tada();
        });
    };

    render() {
        let aux = 0;

        return (
            <div>
                <Header/>
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
            </div>
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