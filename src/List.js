import React from 'react';
import {Link} from 'react-router-dom';


const List = ({questions, handleUpVote, handleDownVote}) => {

    const sortByVote = (first, second) => {
        return (questions[second].upvote - questions[second].downvote) - (questions[first].upvote - questions[first].downvote)
    }

    return(
        <div className="shadow my-6  mx-3 font-sans text2xl text-grey-darker">
            {Object.keys(questions).sort(sortByVote).map((key) => (
                <div key={key} className="flex bg-white shadow border rounded p-6 my-3">
                    <div className="content">
                        <div className="title text-4xl">{questions[key].title}</div>
                            <div className="flex votes text-grey py-2 px-3">                 
                                    <button className="pr-2" onClick={(e) => handleUpVote(e, questions[key], key)}> 👍 </button>
                                    <span className="pr-2"> : {questions[key].upvote}</span>
                                    <button className="pr-2" onClick={(e) => handleDownVote(e, questions[key], key)}> 👎 </button>
                                    <span className="pr-2"> : {questions[key].downvote}</span>
                            </div>

                            <div className="my-4">
                                <Link to={`/detail/${key}`} className="my-4 bg-teal hover:bg-teal-dark text-white font-bold py-2 px-4 rounded"> Detail </Link>
                            </div>
                        </div>
                        
                </div>
            ))}
        </div>
    )
}

export default List;