import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import Cadet from './Cadet';

const Container = styled.div`
    margin: 8px;
    border-radius: 2px;
    width: 100%;
    display: flex;
    justify-content: center;
    position: relative;
`;

const CadetList = styled.div`
    padding: 8px;
    min-height: 100px;
    display: flex;
    min-width: 100%;
    justify-content: center;
    align-items: center;
`;

const DeleteButton = styled.button`
    position: absolute;
    left: 5px;
    top: 5px;
    border: none;
    background: red;
    border-radius: 50%;
    color: #fff;
    font-weight: bold;
    font-size: 8px;
    width: 16px;
    height: 16px;
    line-height: 8px;
    padding: 0;
    outline: none;
    cursor: pointer;
`;

export default class extends React.Component {
    render() {
        return (
            <Container>
                <DeleteButton onClick={this.deleteRow}>X</DeleteButton>
                <Droppable droppableId={this.props.id} direction="horizontal">
                    {(provided) =>
                        <CadetList
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            <span>
                                {this.props.id}
                            </span>
                            {this.props.cadets.map((cadet, index) =>
                                <Cadet key={index} name={cadet} index={index} deleteCadet={this.props.deleteCadet}/>
                                )}
                            {provided.placeholder}
                        </CadetList>
                    }
                </Droppable>
            </Container>
        );
    };

    deleteRow = () => {
        this.props.deleteRow(parseInt(this.props.id));
    }
}