import Flex from '../components/Flex';
import Card from '../components/Card';
import organizeSeats from '../utils/organizeSeats';

export default class extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {rows: []};
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    componentDidMount() {
        fetch(
            `${location.origin}/api/campus/${this.props.location}/cadet`,
            {
                headers: {'Authorization': `Bearer ${this.props.token}` }
            }
        ).then(res => res.json())
        .then(result => {
            this.setState({rows: organizeSeats(result.cadets)});
        });
    };

    render() {
        return (
            <Flex direction={Flex.DIRECTION.VERTICAL} style={{ height: '90vh' }}>
                <form onSubmit={this.handleSubmit}>
                    {this.state.rows.map((row, rowIndex) => (
                        <Flex key={rowIndex}>
                            {row.map((cadet) =>
                                <Flex key={cadet.seat} direction={Flex.DIRECTION.VERTICAL}>
                                    <Card>
                                        <span>{cadet.name}</span>
                                        <label>
                                            Row:
                                            <input 
                                                row={cadet.row}
                                                seat={cadet.seat}
                                                type="number" 
                                                name="row"
                                                value={cadet.row} 
                                                onChange={this.handleInputChange}/>
                                        </label>
                                        <label>
                                            Seat:
                                            <input 
                                                row={cadet.row}
                                                seat={cadet.seat}
                                                type="number"
                                                name="seat"
                                                value={cadet.seat} 
                                                onChange={this.handleInputChange}/>
                                        </label>
                                    </Card>
                                </Flex>
                            )}
                        </Flex>
                    ))}
                    <input type="submit"/>
                </form>
            </Flex>
        );
    };

    handleInputChange(event) {
        const rows = this.state.rows;
        const row = event.target.getAttribute('row');
        const seat = event.target.getAttribute('seat');

        const target = event.target;
        const name = target.name;
        const value = target.value;

        const cadet = rows[row][seat];
        cadet[name] = value;

        if (rows[cadet.row][cadet.seat]) {
            rows[cadet.row][cadet.seat].row = row;
            rows[cadet.row][cadet.seat].seat = seat;
        }

        this.setState({
            rows: organizeSeats(collapseRows(rows))
        });
    };

    handleSubmit(event) {
        event.preventDefault();

        this.props.handleSubmit(
            collapseRows(this.state.rows)
        );
    };
}

function collapseRows(rows) {
    const cadets = [];

    rows.forEach(row => {
        row.forEach(cadet => cadets.push(cadet));
    });

    return cadets;
}