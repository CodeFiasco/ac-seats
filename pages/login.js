import LoginForm from '../components/LoginForm';
import CampusList from '../components/CampusList';
import CadetForm from '../components/CadetForm';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {login: false, error: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    };

    render() {
        if (!this.state.login) {
            return <LoginForm handleSubmit={this.handleSubmit} error={this.state.error}/>;
        }

        if (!this.state.location) {
            return <CampusList handleSelect={this.handleSelect} token={this.state.token}/>;
        }

        return <CadetForm location={this.state.location} token={this.state.token}/>
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

    handleSelect(location) {
        this.setState({ location });
    };
}