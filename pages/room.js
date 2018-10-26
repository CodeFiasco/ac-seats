import Header from '../components/Header';
import Flex from '../components/Flex';
import Card from '../components/Card';
import converter from '../utils/converter';
import sounds from '../utils/sound';

const SPACE_KEY = 32;
const S_KEY = 83;
let start = false;

export default class extends React.Component {
    static async getInitialProps({ query }) {
        return { cadets : query.campus.cadets };
    };
    
    state = { 
        selected: createEmptyRows(converter.cadetsToRows(this.props.cadets)),
        // work around to randomize arrays only on client side (in componentDidMount)
        unselected: [],
        list: [] 
    };
    
    componentDidMount() {
        sounds.init(this.props.cadets.length);

        this.setState({
            unselected: shuffleTwoDimensionArray(converter.cadetsToRows(this.props.cadets)),
            list: shuffleArray(extractNames(this.props.cadets))
        });
        
        document.addEventListener('keydown', key => {
            if (key.keyCode !== SPACE_KEY || sounds.isPlaying()) {
                return;
            }

            start = true;
            sounds.suspense();
        });

        document.addEventListener('keyup', key => {
            if (key.keyCode === S_KEY && !start) {
                this.setState({
                    unselected: converter.cadetsToRows(this.props.cadets)
                });
            }

            if (key.keyCode !== SPACE_KEY) {
                return;
            }
            
            this.pickCadet();
            sounds.tada();
        });
    };

    render() {
        return (
            <div>
                <Header/>
                <Flex style={{ flexFlow: 'row wrap', width: '20%', maxWidth: '20%', alignContent: 'center', margin: '0 5%', float: 'left', height: '100vh' }}>
                    {this.state.list.map((cadet, index) => (
                        <span key={index} style={{ margin: '10px' }}>{cadet}</span>
                    ))}
                </Flex>
                <Flex direction={Flex.DIRECTION.VERTICAL} style={{ height: '100vh' }}>
                    {this.state.selected.map((row, index) => (
                        <Flex key={index} style={{ width: '70%', float: 'right' }}>
                            {row.map((cadet, index) =>
                                <Flex key={index} direction={Flex.DIRECTION.VERTICAL}>
                                    <Card>
                                        <Card.Image src="/static/chair.png" />
                                        <Card.Description text={ cadet } />
                                    </Card>
                                </Flex>
                            )}
                        </Flex>
                    ))}
                </Flex>
            </div>
        );
    };

    pickCadet = () => {
        const unselected = Array.from(this.state.unselected);
        const selected = Array.from(this.state.selected);

        console.log(unselected);
        console.log(selected);
        
        let row = getRandom(unselected.length);
        let seat = getRandom(unselected[row].length);
        
        while(selected[row][seat] !== '') {
            row = getRandom(unselected.length);
            seat = getRandom(unselected[row].length);
        }
        
        selected[row][seat] = unselected[row][seat];
        unselected[row][seat] = '';
        const list = this.state.list.filter(name => name !== selected[row][seat]);

        this.setState({
            selected,
            unselected,
            list
        });
    }
};

function shuffleArray(arr) {
    const newArr = Array.from(arr);

    newArr.forEach((elem, index) => {
        const randomIndex = getRandom(newArr.length);
        newArr[index] = newArr[randomIndex];
        newArr[randomIndex] = elem;
    });

    return newArr;
}

function shuffleTwoDimensionArray(arr) {
    const newArr = Array.from(arr);

    newArr.forEach((row, rowNumber) => {
        row.forEach((elem, columnNumber) => {
            const randomRow = getRandom(newArr.length);
            const randomColumn = getRandom(newArr[randomRow].length);
            newArr[rowNumber][columnNumber] = newArr[randomRow][randomColumn];
            newArr[randomRow][randomColumn] = elem;
        });
    });

    return newArr;
}

function extractNames(cadets) {
    return cadets.map(cadet => cadet.name);
}

function getRandom(max) {
    return Math.floor(Math.random() * max);
}

function createEmptyRows(rows) {
    return rows.map(row => row.map(() => ''));
}