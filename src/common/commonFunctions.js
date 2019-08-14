// FUNCTION FOR TESTING IF AN ELEMENT VISIBLE ON SCREEN
export const onScreen = (elementRef, 
	options={
		elOffset: "top",
		screenOffset: "top"
	}) => {

	// LOGIC - IF THE TOP OF THE ELEMENT IS AT THE BOTTOM OF THE SCREEN RETURN TRUE 
	// LOGIC - IF THE BOTTOM OF THE ELEMENT IS GREATER THAN THE TOP OF SCREEN RETURN FALSE

	let topOfEl = elementRef.current.getBoundingClientRect().top
	let elHeight = elementRef.current.clientHeight

	if (options.elOffset == "middle") {
		topOfEl = elementRef.current.getBoundingClientRect().top + (elHeight/2) - 100
	}

	if (options.elOffset == "bottom") {
		topOfEl = elementRef.current.getBoundingClientRect().bottom
	}

	let topOfElToWindow = topOfEl - window.innerHeight
	let bottomOfElToWindow = topOfEl - window.innerHeight + elHeight
	let windowHeight = window.innerHeight

	if (options.screenOffset == "middle") {
		topOfElToWindow = topOfEl - window.innerHeight + (window.innerHeight/2)
		windowHeight = window.innerHeight/4
	}

	// if (options.screenOffset == "top") {
	// 	topOfElToWindow = topOfEl - window.innerHeight
	// 	// windowHeight = window.innerHeight/4
	// }

	// think I need to change this logic 
	// if top of element === 0 return a true and hold that true until a new
	// condition is met? 

	if((topOfElToWindow < 0) & (bottomOfElToWindow > -(windowHeight))) {
		return true
	} else {
		return false
	}
}

export const onScreen2 = (elementRef, 
	options={
		elOffset: "top",
		screenOffset: "top"
	}) => {

	// LOGIC - IF THE TOP OF THE ELEMENT IS AT THE BOTTOM OF THE SCREEN RETURN TRUE 
	// LOGIC - IF THE BOTTOM OF THE ELEMENT IS GREATER THAN THE TOP OF SCREEN RETURN FALSE

	let topOfEl = elementRef.current.getBoundingClientRect().top
	let elHeight = elementRef.current.clientHeight

	if (options.elOffset == "middle") {
		topOfEl = elementRef.current.getBoundingClientRect().top + (elHeight/2) - 100
	}

	if (options.elOffset == "bottom") {
		topOfEl = elementRef.current.getBoundingClientRect().bottom
	}

	let topOfElToWindow = topOfEl - window.innerHeight
	let bottomOfElToWindow = topOfEl - window.innerHeight + elHeight
	let windowHeight = window.innerHeight

	if (options.screenOffset == "middle") {
		topOfElToWindow = topOfEl - window.innerHeight + (window.innerHeight/2)
		windowHeight = window.innerHeight/4
	}
	
	if(topOfEl < 0 && bottomOfElToWindow > -(window.innerHeight)) {
		return true
	} else if (bottomOfElToWindow < -(window.innerHeight)) {
		return false
	}
}