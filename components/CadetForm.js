import { DragDropContext } from 'react-beautiful-dnd';
import Row from './Row';
import styled from 'styled-components';
import converter from '../utils/converter';

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

export default class extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {rows: []};
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    componentDidMount() {
        fetch(
            `${location.origin}/api/campus/${this.props.location}/cadet`,
            {
                headers: {'Authorization': `Bearer ${this.props.token}` }
            }
        ).then(res => res.json())
        .then(result => {
            this.setState({rows: converter.cadetsToRows(result.cadets)});
        });
    };

    render() {
        return (
            <div>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Container>
                        {this.state.rows.map((row, index) => 
                            <Row key={index} id={index + ''} cadets={row}/>
                            )}
                    </Container>
                </DragDropContext>
                <button onClick={this.handleSubmit}>Save</button>
            </div>
        );
    };

    handleSubmit(event) {
        event.preventDefault();

        this.props.handleSubmit(
            converter.rowsToCadets(this.state.rows)
        );
    };

    onDragEnd = result =>{
        const { source, destination, draggableId } = result;

        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }
        
        const startRow = this.state.rows[source.droppableId];
        const finishRow = this.state.rows[destination.droppableId];

        if (startRow === finishRow) {
            const newRow = Array.from(startRow);
            newRow.splice(source.index, 1);
            newRow.splice(destination.index, 0, draggableId);

            const rows = this.state.rows;
            rows[source.droppableId] = newRow;

            this.setState({
                rows
            });
            return;
        }

        const newSourceRow = Array.from(startRow);
        newSourceRow.splice(source.index, 1);

        const newFinishRow = Array.from(finishRow);
        newFinishRow.splice(destination.index, 0, draggableId);

        const rows = this.state.rows;
        rows[source.droppableId] = newSourceRow;
        rows[destination.droppableId] = newFinishRow;

        this.setState({
            rows
        });
   }
}