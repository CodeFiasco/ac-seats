import Flex from '../components/Flex';
import Card from '../components/Card';

export default class extends React.Component {
    static async getInitialProps({ query }) {
        return { campuses: query.campuses };
    };

    render() {
        return (
            <Flex direction={Flex.DIRECTION.HORIZONTAL} style={{ height: '90vh' }}>
                {this.props.campuses.map(campus => (
                    <Card key={campus.location}>
                        <Card.Image src="/static/chair.png" />
                        <a href={`/campus/${campus.location}`} style={{ height: '65%' }}>{campus.location}</a>
                    </Card>
                ))}
            </Flex>
        );
    };
};