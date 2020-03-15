import React, {Component} from 'react';
import Choises from './Choises';
import Answer from './Answer';
import './Question.css'

const QuestionState = {
    Question: 1,
    Wrong: 2,
    Correct: 3
}

class Question extends Component{
    constructor(props){
        super(props);
        this.state = {
            userChoise: undefined
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        this.setState({userChoise: e.target.value});
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.onGuess(this.state.userChoise);
    }

    render(){
        const {questionState, answer, onNext} = this.props;
        let elements = questionState === QuestionState.Question ?
            (<Choises 
                options={this.props.options} 
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
            />) :
            (<Answer
                correct={questionState === QuestionState.Correct}
                answer={answer.name}
                onNext={onNext} />);
        return (
            <div>
                {elements}
                <img className="flag-img" src={this.props.answer.flag} alt="country flag" />
            </div>
        )
    }
}

export default Question;
export { QuestionState };