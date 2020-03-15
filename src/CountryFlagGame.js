import React, {Component} from 'react';
import Loading from './Loading';
import Question, {QuestionState} from './Question';


export default class CountryFlagGame extends Component{
    constructor(props){
        super(props);
        this.state = {
            countries: [],
            options: [],
            answer: {},
            questionState: undefined
        }
        this.nextQuestion = this.nextQuestion.bind(this);
        this.onGuess = this.onGuess.bind(this);
    }

    componentDidMount(){
        const baseUrl = 'https://restcountries.eu/rest/v2/all';
        fetch(baseUrl)
        .then(response => response.json())
        .then(countries => {
            let options = [];
            for(let i=0; i<4; i++){
                const randNum = Math.floor(Math.random()*countries.length);
                options.push(countries[randNum]);
            }
            const answer = options[Math.floor(Math.random()*options.length)];
            this.setState({
                countries,
                options,
                answer,
                questionState: QuestionState.Question
            });
        })
    }

    onGuess(userAnswer){
        const {answer} = this.state;
        let questionState = userAnswer === answer.name ?
                            QuestionState.Correct :
                            QuestionState.Wrong;
        this.setState({questionState});
    }

    nextQuestion(){
        const {countries} = this.state;
        let options = [];
        for(let i=0; i<4; i++){
            const randNum = Math.floor(Math.random()*countries.length);
            options.push(countries[randNum]);
        }
        const answer = options[Math.floor(Math.random()*options.length)];
        this.setState({
            countries,
            options,
            answer,
            questionState: QuestionState.Question
        });
    }

    render(){
        const {options, answer, questionState} = this.state;
        let elements = <Loading />;
        if(answer !== undefined){
            elements = (
                <Question 
                    options={options} 
                    answer={answer}
                    onGuess={this.onGuess}
                    questionState={questionState}
                    onNext={this.nextQuestion}
                />
            );
        }
        return(
            <div style={{marginTop: '15px'}}>
                {elements}
            </div>
        )
    }
}