//! A countdown application using Vanilla JS
//! Three classes will be used to represent the view , model , and controller 
class Model { 
    //Set the future event when the model is called 
	constructor(){
		this.futureEvent = new Date('Dec 25 , 2020 00:00:00 GMT+01:00').getTime() 	
	} 
		
} 

//! The view 
class View {
	constructor() {
		this.root = this.getElement('#root') //The root element for the app  
		this.span = this.createElement('span') // The countdown will display inside this span 
		this.title = this.createElement('h1')  // The title for the page 
		this.root.append(this.title , this.span)
		//this.root.appendChild(this.span)       // Append the countdown to the root element 
		//this.root.insertBefore(this.title , this.span) //Insert the title before the countdown 
	}
	//! A method for creating element 
	createElement(tag){
		return document.createElement(tag) 
	} 
	//! A method for selecting element 
	getElement(selector){
		return document.querySelector(selector)
	}
}

//! Class controller for handling event especially when dom is loaded 
class Controller {
	constructor(){
		this.model = new Model() 
		this.view =  new View()
		this.view.title.textContent = 'Countdown to Christmas Celebration'  
		
		//!Attach a timer id that can be used for stopping the timer 
		this.timerId = setInterval(() => {
			this.diff        = this.model.futureEvent - new Date().getTime()  //Get the time difference in ms
			
			this.days = Math.floor(this.diff/(1000*60*60*24)) //Get the number of milliseconds in one day 
			this.hours = Math.floor((this.diff%(1000*60*60*24))/(1000*60*60)) //Get the hours 
			this.minutes = Math.floor((this.diff%(1000*60*60))/(1000*60)) 
			this.seconds = Math.floor((this.diff%(1000*60))/(1000))  
			
			//!Append a zero to seconds if less than 10 
			this.seconds = this.seconds < 10 ? '0'+this.seconds : this.seconds 
			//display the time within the span 
			this.view.span.textContent = 
			`${this.days}days : ${this.hours}hours : ${this.minutes}mins :${this.seconds}sec` 
			
			if ( this.diff <= 0) {
				clearInterval(this.timerId)
				this.view.span.textContent = 'Merry Christmas' 
				this.view.span.style.color = '#f00'
			}
			
			//!Change the color of the text by checking if the seconds is divisible by two 
			//! This is conditional rendering 
			this.view.span.style.color = parseInt(this.seconds)%2 === 0 ? '#f00' : '#00f' 
		} , 1000)
		//this.view.root
	} 
	
} 

new Controller() 


