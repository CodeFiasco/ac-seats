import Flex from '../components/Flex';
import Card from '../components/Card';

export default class extends React.Component {

    render() {
            return(
                <Flex direction={Flex.DIRECTION.HORIZONTAL} style={{ height: '90vh' }}>
                    {this.props.campuses.map(campus => (
                        <a onClick={(e) => this.handleClick(e, campus.location)} key={campus.location}>
                            <Card>
                                <Card.Image src="/static/chair.png" />
                                <Card.Description text={campus.location} />
                            </Card>
                        </a>
                    ))}
                </Flex>
            );
    };

    handleClick = (event, location) => {
        event.preventDefault();
        this.props.handleSelect(location);
    };
}