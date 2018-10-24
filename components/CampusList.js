import Flex from '../components/Flex';
import Card from '../components/Card';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {campuses: []};
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        fetch(
            `${location.origin}/api/campus`,
            {
                headers: {'Authorization': `Bearer ${this.props.token}` }
            }
        ).then(res => res.json())
        .then(result => {
            this.setState({campuses: result});
        });
    };

    render() {
            return(
                <Flex direction={Flex.DIRECTION.HORIZONTAL} style={{ height: '90vh' }}>
                    {this.state.campuses.map(campus => (
                        <Card key={campus.location}>
                            <Card.Image src="/static/chair.png" />
                            <a onClick={this.handleClick} value={campus.location} style={{ height: '65%' }}>{campus.location}</a>
                        </Card>
                    ))}
                </Flex>
            );
    }

    handleClick(event) {
        event.preventDefault();
        const value = event.target.getAttribute('value');

        this.props.handleSelect(value);
    }
}