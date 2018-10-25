import Header from '../components/Header';
import CampusList from '../components/CampusList';

export default class extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <CampusList handleSelect={this.handleSelect} />;
            </div>
        );
    };

    handleSelect(location) {
        window.location.href = `/campus/${location}`;
    }
};