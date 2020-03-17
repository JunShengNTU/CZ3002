import React, { Component } from 'react';
import HomeIcon from '../components/HomeIcon';
import SearchBar from '../components/SearchBar';
import Sidebar from '../components/Sidebar';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import "./Question.css";
import { NavLink } from 'react-router-dom';
import { ReactComponent as HomePlaceholder} from "./assets/home-placeholder.svg";
import { ReactComponent as Vote} from "./assets/rectangle.svg";

var data = [
    {
        "title": "How to open Minecraft character skin in Xcode?",
        "datetime": "20 hours ago ",
        "owner": "Daniel",
        "body": "I have a Minecraft skin of a Lion and I want to edit it.\n"
                + "When I add this image in UIImageView, it display same, it is not showing the lion character.\n"
                + "It has size of 64*64.\n"
                + "So how can we display Minecraft images inside our app?",
        "vote": -1,
        "answer": 2,
        "eachAnswer": [
            {
                "content": "That image is called a \"texture\".\n"
                            + "That texture is mapped onto 3d model of a lion resulting a \"lion character\""
                            + "In other word, your \"lion character\" = texture + 3D model of a lion.\n"
                            + "Every character skin you're using xcode to open is just the \"texture image\" as mentioned by @GeneCode\"" ,
                "vote": 5,
                "datetime": "15 hours ago",
                "owner": "Dog" 
            },
            {
                "content": "Take a look at this: https://github.com/games647/Minecraft-Skin-Renderer",
                "vote": 0,
                "datetime": "2 hours ago",
                "owner": "Cat" 
            }
        ]
    }
];
class Question extends Component {
    constructor(props) {
        super(props);

        this.handleAnswer = this.handleAnswer.bind(this);
        this.postAnswer = this.postAnswer.bind(this);

        this.state = {answer: ""};
    }

    handleAnswer(event) {
        this.setState({answer: event.target.value});
    }

    renderAnswer(answers){
        const items = answers.map((ans)=>{
            return (
            <div>
                <div className="vote-up-down">
                    <Vote className="vote-up"/>
                            <div className="each-question-rating">{ans.vote}</div>
                    <Vote className="vote-down"/>
                </div>
                <div className="each-question-body">{ans.content}</div>
                <div className="each-question-info">
                        {"posted "+ans.datetime+" "}
                        <span className="owner">{ans.owner}</span>
                </div>
                <Divider/>
            </div>
            );
            
        });
        return <div>{items}</div>;
    }

    renderQuestion(){
        const items = data.map((item)=>{
            return (
                <div className="each-question-frame">   
                    <div className="each-question-title">{item.title}</div>
                    <div className="each-question-info-owner">
                        {"posted "+item.datetime}
                        <span className="owner">{item.owner}</span>
                    </div>
                    <Divider/>
                    <div className="vote-up-down">
                        <Vote className="vote-up"/>
                        <div className="each-question-rating">{item.vote}</div>
                        <Vote className="vote-down"/>
                    </div>
                    <div className="each-question-body">{item.body}</div>
                    <span className="br"></span>
                    <div>{item.answer+" Answer(s)"}</div>
                    <Divider/>
                    {this.renderAnswer(item.eachAnswer)}
                    <Divider/>
                    <div>
                        <div className="your-answer">Your Answer</div>
                        <textarea rows={15} className = "type-answer" onChange={this.handleAnswer}/>
                    </div>
                    <Button onClick={this.postAnswer} variant="contained" color="primary">
                        Post Your Answer
                    </Button>
                </div>
                
            );
        });
        return <div>{items}</div>;
    }

    postAnswer() {
        console.log(this.state.answer);
        console.log(localStorage.getItem('username'));

        // fetch('https://mywebsite.com/endpoint/', {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         title: this.state.title,
        //         body: this.state.answer
        //         username: localStorage.getItem('username')
        //     })
        // }).then(r => console.log(r))
    }

    render(){
        return (
            <div className="home-div each-question">
                <HomeIcon />
                <SearchBar className="search" history={this.props.history} />
                <NavLink to="/askQuestion">
                    <div className="ask-question">Ask Question</div>
                </NavLink>
                {this.renderQuestion()}
            </div>
        );
    }
}

export default Question;

