import styled from 'styled-components';

const Controls = styled.div`
    width: 300px;
    display: block;
    margin: 10px auto;
    background: #fff;
    padding: 10px;
    border-radius: 5px;
    text-align: center;
`;

const Form = styled.form``;

export default class extends React.Component {
    state = {newCadetName: ''};

    render() {
        return (
            <Controls>
                <button onClick={this.props.handleSubmit}>Save Changes</button><br />
                <Form handleSubmit={this.createCadet}>
                    <input type="text" value={this.state.newCadetName} onChange={this.handleInput} />
                    <input type="submit" onClick={this.createCadet} value="Create Cadet" /><br/>
                </Form>
                <button onClick={this.props.addRow}>Add row</button>
            </Controls>
        );
    }

    handleInput = (event) => {
        this.setState({newCadetName: event.target.value});
    }

    createCadet = (event) => {
        event.preventDefault();

        const name = this.state.newCadetName;

        if (!name) {
            return;
        }

        this.props.createCadet(name);
        this.setState({
            newCadetName: ''
        });
    }
}