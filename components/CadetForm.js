import Flex from '../components/Flex';
import Card from '../components/Card';

export default class extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {cadets: []};
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
            console.log(result.cadets);
            this.setState({cadets: result.cadets});
        });
    };

    render() {
        return (
            <Flex direction={Flex.DIRECTION.VERTICAL} style={{ height: '90vh' }}>
                <form onSubmit={this.handleSubmit}>
                    {this.state.cadets.map((cadet, index) =>
                        <Flex key={index} direction={Flex.DIRECTION.VERTICAL}>
                            <Card>
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
                        </Flex>
                    )}
                    <input type="submit"/>
                </form>
            </Flex>
        );
    };

    handleInputChange(event) {
        const index = event.target.getAttribute('index');

        const target = event.target;
        const name = target.name;
        const value = target.value;

        const cadets = this.state.cadets;
        cadets[index][name] = value;

        this.setState({
            cadets
        });
    };

    handleSubmit(event) {
        event.preventDefault();

        this.props.handleSubmit(
            this.state.cadets
        );
    };
}