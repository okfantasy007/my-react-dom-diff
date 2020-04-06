import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component{
	constructor() {
		super();
		this.state = {
			number: 1
		}
	}

	clickButton = () => {
		const {number} = this.state;
		this.setState({
			number: 2
		});
		console.log(number);
		this.setState({
			number: 3
		});
		console.log(number);
		this.setState({
			number: 4
		});
		console.log(number);
	};

	render() {
		const {number} = this.state;
		return <button onClick={this.clickButton}>{number}</button>
	}

}

export default App;
