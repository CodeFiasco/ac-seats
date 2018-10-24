import CampusList from '../components/CampusList';

export default class extends React.Component {
    render() {
        return <CampusList handleSelect={this.handleSelect} />;
    };

    handleSelect(location) {
        window.location.href = `/campus/${location}`;
    }
};