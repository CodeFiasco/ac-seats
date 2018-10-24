import LoginForm from '../components/LoginForm';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {login: false, error: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    render() {
        if (!this.state.login) {
            return <LoginForm handleSubmit={this.handleSubmit} error={this.state.error}/>;
        }

        return <div>Logged in! Token: {this.state.token}</div>
    };
    
    handleSubmit(name, password) {
        fetch(
            `${location.origin}/login`,
            {
                method: 'post',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({name, password})
            }
        
        ).then(
            res => res.json()
        ).then(result => {
            if (result.error) {
                this.setState({error: result.error});
                return;
            }

            this.setState({
                login: true,
                token: result.token
            });

        }, error => {
            this.setState({ error: error.message });
        });
    };
}