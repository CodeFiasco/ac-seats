import Flex from '../components/Flex';
import Card from '../components/Card';

export default class extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {cadets: []};
        this.handleInputChange = this.handleInputChange.bind(this);
    };

    componentDidMount() {
        fetch(
            `${location.origin}/api/campus/${this.props.location}/cadet`,
            {
                headers: {'Authorization': `Bearer ${this.props.token}` }
            }
        ).then(res => res.json())
        .then(result => {
            this.setState({cadets: result.cadets});
        });
    };

    render() {
        return (
            <form>
                <Flex direction={Flex.DIRECTION.HORIZONTAL} style={{ height: '90vh' }}>
                    {this.state.cadets.map((cadet, index) => (
                        <Card key={index}>
                            <span>{cadet.name}</span>
                            <label>
                                Row:
                                <input 
                                    index={index} 
                                    type="number" 
                                    name="row"
                                    value={cadet.row} 
                                    onChange={this.handleInputChange}/>
                            </label>
                            <label>
                                Seat:
                                <input 
                                    index={index} 
                                    type="number"
                                    name="seat"
                                    value={cadet.seat} 
                                    onChange={this.handleInputChange}/>
                            </label>
                        </Card>
                    ))}
                </Flex>
            </form>
        );
    };

    handleInputChange(event) {
        const cadets = this.state.cadets;
        const index = event.target.getAttribute('index');

        const target = event.target;
        const name = target.name;
        const value = target.value;

        cadets[index][name] = value;
        this.setState({
            cadets
        });
    }
}