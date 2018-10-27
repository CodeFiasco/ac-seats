import Header from '../components/Header';
import CampusList from '../components/CampusList';

export default class extends React.Component {
    static async getInitialProps({ query }) {
        return { campuses: query.campuses };
    };

    render() {
        return (
            <div>
                <Header />
                <CampusList handleSelect={this.handleSelect} campuses={this.props.campuses}/>
            </div>
        );
    };

    handleSelect(location) {
        window.location.href = `/campus/${location}`;
    }
};