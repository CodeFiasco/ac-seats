import Header from '../components/Header';
import CadetForm from '../components/CadetForm';

export default class extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <CadetForm handleSubmit={this.show} location={'lisboa'} token={'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTQwNDA4MzUxfQ.6MR_ltC7rfCLBtcZ9ZQyV0Zj5neYbKdraq324VQwz2w'}/>
            </div>
        );
    }

    show(cadets) {
        console.log('cadets', cadets);
    }
}