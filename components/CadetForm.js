import { DragDropContext } from 'react-beautiful-dnd';
import Row from './Row';
import SelectionControls from '../components/SelectionControls';
import styled from 'styled-components';
import converter from '../utils/converter';

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {rows: [], newCadetName: ''};
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
                            <Row key={index} id={index + ''} cadets={row} deleteRow={this.deleteRow} deleteCadet={this.deleteCadet}/>
                            )}
                    </Container>
                </DragDropContext>
                <SelectionControls handleSubmit={this.handleSubmit} createCadet={this.createCadet} addRow={this.addRow} />
            </div>
        );
    };

    createCadet = (name) => {
        if (this.state.rows.length === 0) {
            alert('You need to add a row first!');
            return;
        }

        const rows = Array.from(this.state.rows);
        rows[rows.length - 1].push(name);

        this.setState({
            rows,
        });
    };

    deleteCadet = (name) => {
        if (!confirm(`Cadet ${name} will be deleted. Continue?`)) {
            return;
        }

        const rows = this.state.rows;
        const updatedRows = rows.map(row => row.filter(cadetName => cadetName !== name));

        this.setState({
            rows: updatedRows
        });
    };

    deleteRow = (id) => {
        if (!confirm(`Entire row ${id} will be deleted. Continue?`)) {
            return;
        }

        const rows = Array.from(this.state.rows);
        rows.splice(id, 1);

        this.setState({
            rows
        });
    }

    addRow = () => {
        const rows = Array.from(this.state.rows);
        rows.push([]);

        this.setState({
            rows
        });
    };

    handleSubmit = () => {
        this.props.handleSubmit(
            converter.rowsToCadets(this.state.rows)
        );
    };

    onDragEnd = result => {
        const { source, destination, draggableId } = result;

        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }
        
        const startRow = this.state.rows[source.droppableId];
        const finishRow = this.state.rows[destination.droppableId];
        const newRow = Array.from(startRow);
        newRow.splice(source.index, 1);

        const rows = this.state.rows;

        if (startRow === finishRow) {
            newRow.splice(destination.index, 0, draggableId);

        } else {
            const newFinishRow = Array.from(finishRow);
            newFinishRow.splice(destination.index, 0, draggableId);
            rows[destination.droppableId] = newFinishRow;
        }

        rows[source.droppableId] = newRow;

        this.setState({
            rows
        });
   };
}