import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
    padding: 8px;
    margin: 8px;
    text-align: center;
    width: 75px;
    position: relative;
`;

const DeleteButton = styled.button`
    position: absolute;
    right: 5px;
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
    constructor(props) {
        super(props);
    };

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
                        <DeleteButton onClick={this.handleDeleteCadet} >X</DeleteButton>
                    </Container>
                )}
            </Draggable>
        );
    };

    handleDeleteCadet = () => {
        this.props.deleteCadet(this.props.name);
    }
}