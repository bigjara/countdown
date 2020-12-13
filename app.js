/**
 * Project : Countdown.js 
 * Author  : Bigjara 
 * Contributors : Adeleke Bright
 */

// Model holds the template for creating and getting the time for our future event 
class Model { 
	/**
	 * 
	 * @param {String | Number} year 
	 * @param {String | Number} month 
	 * @param {String | Number} date 
	 * @param {String | Number} hour 
	 * @param {String | Number} minute 
	 * @param {String | Number} second 
	 */
	constructor(year , month , date , hour , minute , second){
        this.year = year 
        this.month = month 
        this.date = date 
        this.hour = hour 
        this.minute = minute 
        this.second = second 
	} 
	/**
	 * @description 
	 * returns the date of the future event
	 */
    createDate(){
        return new Date(this.year , this.month , this.date , this.hour , this.minute , this.second)
	}
	/**
	 * @description 
	 * returns the timestamp for the event
	 */
	getTime = () => this.createDate().getTime() 	
} 

//! View provids the template for accessing and manipulating the DOM
class View {
	constructor() {
		this.root = this.getElement('#root')   //The root element for the app  
		this.span = this.createElement('span') // The countdown will display inside this span 
		this.title = this.createElement('h1')  // The title for the page 
		this.root.append(this.title , this.span)
	}
	createElement(tag){
		return document.createElement(tag) 
	}
	getElement(selector){
		return document.querySelector(selector)
	}
}

class Controller {
	constructor(eventName , boomMessage){
		this.model = new Model("2020" , "11" , "25" , 0 , 0, 0)  
		this.view =  new View()
		this.view.title.textContent = eventName 
		this.boomMessage = boomMessage  
		this.launchCountDown()
	}
	launchCountDown(){
		//!Attach a timer id that can be used for stopping the countdown 
	    this.timerId = setInterval( () => { 
			
			this.timeGap      = this.model.getTime() - new Date().getTime()  //Get the time timeGaperence in ms
			
			this.days         = Math.floor(this.timeGap/(1000*60*60*24)) 
			this.hours 		  = Math.floor((this.timeGap%(1000*60*60*24))/(1000*60*60)) 
			this.minutes 	  = Math.floor((this.timeGap%(1000*60*60))/(1000*60)) 
			this.seconds 	  = Math.floor((this.timeGap%(1000*60))/(1000))  
			
			//!Append a zero to seconds if less than 10 
			this.seconds = this.seconds < 10 ? '0'+this.seconds : this.seconds 
			
			//display the time within the span 
			this.view.span.textContent = 
			`${this.days}days : ${this.hours}hours : ${this.minutes}mins :${this.seconds}sec` 
			
			if ( this.timeGap <= 0) {
				clearInterval(this.timerId)
				this.view.span.textContent = this.boomMessage
				this.view.span.style.color = '#f00'
			}
			
			//!Change the color of the text by checking if the seconds is divisible by two 
			//! This is conditional rendering 
			this.view.span.style.color = parseInt(this.seconds)%2 === 0 ? '#f00' : '#00f' 
		} , 1000) 
    } 


		
	
	
} 

new Controller("Countdown to Ipenko Odun's Birthday" , "Happy Birthday") 


