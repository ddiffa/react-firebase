import React from 'react';
import {database} from './firebase';
import {Link} from 'react-router-dom';

class Detail extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            data: null
        }

        this.dbRef = null;
    }

    componentDidMount(){
        const {id} = this.props.match.params;
        this.dbRef = database.ref(`/questions/${id}`).on(`value`, (snapshot) => {
            this.setState({
                data:snapshot.val()
            })
        })
    }

    render(){
        return (
            <div className="px-4 py-4 mx-3">
                {this.state.data === null ? <h3 className="py-4 my-4">404 Data Not Found</h3> :
                    <div className="py-4 my-4">
                        <h1>{this.state.data.title}</h1>
                        <h2>Like : {this.state.data.upvote}</h2>
                        <h2>Unlike : {this.state.data.downvote}</h2>
                    </div>
                }
                <Link to="/" className="my-4 bg-teal hover:bg-teal-dark text-white font-bold py-2 px-4 rounded"> Back </Link>
            </div>
        )
    }
}

export default Detail;