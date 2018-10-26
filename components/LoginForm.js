import Flex from '../components/Flex';
import Card from '../components/Card';
import styled from 'styled-components';

const Form = styled.form`
    margin: 10px auto;
    background: #fff;
    padding: 10px;
    border-radius: 5px;
    text-align: center;
    color: black;
    width: 200px;
`;

const Label = styled.label`
    text-align: center;
    display: block;
    margin: 10px auto;
`;

const Input = styled.input`
    margin: auto 10px;
`;

const Submit = styled.input`
    padding: 10px;
    text-align: center;
    background: #e31d1a;
    color: #fff;
    border: none;
    text-transform: uppercase;
    outline: none;
`;

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username: '', password: ''};
    }

    render() {
        return (
            <Flex direction={Flex.DIRECTION.HORIZONTAL} style={{ height: '50vh' }}>
                <Form onSubmit={this.handleSubmit}>
                        <Label>
                            Username:
                            <Input 
                                type="text"
                                name="username"
                                value={this.state.username}
                                onChange={this.handleInputChange}/>
                        </Label>
                        <Label>
                            Password:
                            <Input 
                                type="password" 
                                name="password" 
                                value={this.state.password} 
                                onChange={this.handleInputChange}/>
                        </Label>
                        <Submit type="submit"/>
                        <Label style={{ color: 'red', fontSize: '10px' }}>{this.props.error}</Label>
                </Form>
            </Flex>
        );
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.handleSubmit(this.state.username, this.state.password);
    }
}