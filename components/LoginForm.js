import Flex from '../components/Flex';
import Card from '../components/Card';

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.state = {username: '', password: ''};
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return (
            <Flex direction={Flex.DIRECTION.HORIZONTAL} style={{ height: '50vh' }}>
                <form onSubmit={this.handleSubmit}>
                    <Card>
                        <label>
                            Username:
                            <input 
                                type="text"
                                name="username"
                                value={this.state.username}
                                onChange={this.handleInputChange}/>
                        </label>
                        <label>
                            Password:
                            <input 
                                type="text" 
                                name="password" 
                                value={this.state.password} 
                                onChange={this.handleInputChange}/>
                        </label>
                        <input type="submit"/>
                    </Card>
                </form>
            </Flex>
        );
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.handleSubmit(this.state.username, this.state.password);
    }
}