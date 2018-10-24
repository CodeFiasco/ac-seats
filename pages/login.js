import LoginForm from '../components/LoginForm';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {login: false};
    }

    render() {
        if (!this.state.login) {
            return <LoginForm handleSubmit={this.handleSubmit}/>;
        }
    }
    
    handleSubmit(username, password) {
        console.log(username, password);
    }
}