import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import Cadet from './Cadet';

const Container = styled.div`
    margin: 8px;
    border: 1px solid #fff;
    border-radius: 2px;
    width: 100%;
    display: flex;
    justify-content: center;
`;

const CadetList = styled.div`
    padding: 8px;
    min-height: 100px;
    display: flex;
    min-width: 100%;
    justify-content: center;
`;

export default class extends React.Component {
    render() {
        return (
            <Container>
                <Droppable droppableId={this.props.id} direction="horizontal">
                    {(provided) =>
                        <CadetList
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {this.props.cadets.map((cadet, index) =>
                                <Cadet key={index} name={cadet} index={index} deleteCadet={this.props.deleteCadet}/>
                                )}
                            {provided.placeholder}
                        </CadetList>
                    }
                </Droppable>
            </Container>
        );
        
    }
}