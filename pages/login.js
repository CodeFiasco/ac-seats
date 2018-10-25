import Header from '../components/Header';
import LoginForm from '../components/LoginForm';
import CampusList from '../components/CampusList';
import CadetForm from '../components/CadetForm';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {login: false, error: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleCampusUpdate = this.handleCampusUpdate.bind(this);
    };

    render() {
        if (!this.state.login) {
            return (
                <div>
                    <Header />
                    <LoginForm handleSubmit={this.handleSubmit} error={this.state.error}/>
                </div>
            );
        }

        if (!this.state.location) {
            return (
                <div>
                    <Header />
                    <CampusList handleSelect={this.handleSelect} token={this.state.token}/>
                </div>
            );
        }

        return (
            <div>
                <Header />
                <CadetForm location={this.state.location} handleSubmit={this.handleCampusUpdate} token={this.state.token}/>
            </div>
        );
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

    handleCampusUpdate(cadets) {
        fetch(
            `${location.origin}/api/campus/${this.state.location}/cadet`,
            {
                method: 'put',
                headers: {'Content-Type':'application/json', 'Authorization': `Bearer ${this.state.token}` },
                body: JSON.stringify({cadets})
            }
        
        ).then(() => {
            alert('seats updated!');
        });
    } 
}