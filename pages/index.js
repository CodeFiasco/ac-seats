import Link from 'next/link';

class CampusesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          campuses: []
        };
      }
    
      componentDidMount() {
        fetch("http://localhost:3000/campus")
          .then(res => res.json())
          .then(
            (data) => {
              this.setState({
                isLoaded: true,
                campuses: data
              });
            },
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
      }

      render() {
          return <ul>
              {this.state.campuses.map(campus => (
                  <li key={campus.location}>
                    <Link href={`/${campus.location}`}>
                        <a>{campus.location}</a>
                    </Link>
                  </li>
              ))}
          </ul>
      }
}

export default CampusesList;