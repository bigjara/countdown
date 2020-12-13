 class Model { 
	constructor(){
		this.futureEvent = new Date('Jan 1 , 2021 00:00:00 GMT+01:00').getTime() 	
	} 
		
} 

class View {
	constructor() {
		this.root = this.getElement('#root') 
		this.span = this.createElement('span')  
		this.title = this.createElement('h1')   
		this.root.appendChild(this.span)        
		this.root.insertBefore(this.title , this.span)
	}

	createElement(tag){
		return document.createElement(tag) 
	} 
	
	getElement(selector){
		return document.querySelector(selector)
	}
}
 
class Controller {
	constructor(){
		this.model = new Model() 
		this.view =  new View()
		this.view.title.textContent = 'Countdown to a New year'  
		
		 
		this.timerId = setInterval(() => {
			this.diff        = this.model.futureEvent - new Date().getTime() 
			/**
			 *  1000ms = 1s
			 * 	60s = 1min
			 * 	60min = 1hr
			 * 	24hrs = 1day
			 */			
			this.days = Math.floor(this.diff/(1000*60*60*24))
			this.hours = Math.floor((this.diff%(1000*60*60*24))/(1000*60*60))
			this.minutes = Math.floor((this.diff%(1000*60*60))/(1000*60)) 
			this.seconds = Math.floor((this.diff%(1000*60))/(1000))  
			
						
			this.seconds = this.seconds < 10 ? '0'+this.seconds : this.seconds 
			this.minutes = this.minutes < 10 ? '0'+this.minutes : this.minutes
			this.hours = this.hours < 10 ? '0'+this.hours : this.hours
			//this.days = this.days < 10 ? '0'+this.days : this.hours

			this.view.span.textContent = 
			`${this.days}days : ${this.hours}hours : ${this.minutes}mins :${this.seconds}sec` 
			
			if ( this.diff <= 0) {
				clearInterval(this.timerId)
				this.view.span.textContent = 'Happy new year' 
				this.view.span.style.color = '#f00'
			}
			
			this.view.span.style.color = parseInt(this.seconds)%2 === 0 ? '#fa0' : '#f0a' 
		} , 1000)
	
	} 
	
} 

new Controller() 


