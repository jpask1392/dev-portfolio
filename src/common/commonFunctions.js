// FUNCTION FOR TESTING IF AN ELEMENT VISIBLE ON SCREEN
export const onScreen = (elementRef) => {

	// LOGIC - IF THE TOP OF THE ELEMENT IS AT THE BOTTOM OF THE SCREEN SHOW TRUE 
	// LOGIC - IF THE BOTTOM OF THE ELEMENT IS GREATER THAN THE TOP OF SCREEN SHOW FALSE

	const topOfEl = elementRef.current.getBoundingClientRect().top
	const elHeight = elementRef.current.clientHeight

	const topOfElToWindow = topOfEl - window.innerHeight
	const bottomOfElToWindow = topOfEl - window.innerHeight + elHeight

	if((topOfElToWindow < 0) & (bottomOfElToWindow > -(window.innerHeight))) {
		return true
	} else {
		return false
	}
}