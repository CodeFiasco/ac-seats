import Header from '../components/Header';
import LoginForm from '../components/LoginForm';
import CampusList from '../components/CampusList';
import CadetForm from '../components/CadetForm';

export default class extends React.Component {
    static async getInitialProps({ query }) {
        return { campuses: query.campuses };
    };

    constructor(props) {
        super(props);
        this.state = {login: false, error: ''};
    };

    render() {
        let view = <CadetForm location={this.state.location} handleSubmit={this.handleCampusUpdate} token={this.state.token}/>;

        if (!this.state.login) {
            view = <LoginForm handleSubmit={this.handleSubmit} error={this.state.error} />
        
        } else if (!this.state.location) {
            view = <CampusList handleSelect={this.handleSelect} campuses={this.props.campuses}/>
        }

        return (
            <div>
                <Header />
                {view}
            </div>
        );
    };
    
    handleSubmit = (name, password) => {
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

    handleSelect = (location) => {
        this.setState({ location });
    };

    handleCampusUpdate = (cadets) => {
        fetch(
            `${location.origin}/api/campus/${this.state.location}/cadet`,
            {
                method: 'put',
                headers: {'Content-Type':'application/json', 'Authorization': `Bearer ${this.state.token}` },
                body: JSON.stringify({cadets})
            }
        
        ).then(() => {
            alert('seats updated! Press S before starting seat selection to apply this line-up.');
        });
    };
}