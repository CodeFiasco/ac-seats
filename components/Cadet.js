import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
    padding: 8px;
    margin: 8px;
    text-align: center;
    width: 75px;
`;

export default class extends React.Component {
    render() {
        return (
            <Draggable draggableId={this.props.name} index={this.props.index}>
                {(provided) => (
                    <Container
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <img src="/static/chair.png" style={{margin: '0 auto', display: 'block'}}/>
                        <span style={{width: '100%', margin: '0 auto'}}>{this.props.name}</span>
                    </Container>
                )}
            </Draggable>
        );
    }
}