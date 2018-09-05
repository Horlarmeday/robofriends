import React, {Component} from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';


class App extends Component {
    constructor(){
        super();
        this.state = {
            robots: [],
            searchfield: ''
        }
    }

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users=> this.setState({robots: users}));
    }

    //Function that listens to any change in the input field
    onSearchChange =(event) =>{
        this.setState({searchfield: event.target.value});
    }

    render() {
        //Destructuring
        const {robots, searchfield} = this.state;
        //This is filtering the robots and comparing the name of the robots 
        //to the Letter searched on the searchfield
        const filteredRobots = robots.filter((robot)=>{
            return robot.name.toLowerCase().includes(searchfield.toLowerCase())
        });
        //Ternary operation returning <h1> if robots is not found
        return !robots.length ?
           <h1>Loading...</h1> :
            (
                <div className='tc'>
                    <h1 className='f1'>Robofriends</h1>
                    <SearchBox searchChange={this.onSearchChange}/>
                    <Scroll>
                     <CardList robots={filteredRobots}/>
                    </Scroll>
                </div>
            );
          
    }
    
}

export default App;