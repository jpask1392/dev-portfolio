// FUNCTION FOR TESTING IF AN ELEMENT VISIBLE ON SCREEN
export const onScreen = (
	elementRef,
	options = {
		elOffset: "top",
		screenOffset: "top"
	}
) => {
	// LOGIC - IF THE TOP OF THE ELEMENT IS AT THE BOTTOM OF THE SCREEN RETURN TRUE
	// LOGIC - IF THE BOTTOM OF THE ELEMENT IS GREATER THAN THE TOP OF SCREEN RETURN FALSE

	let topOfEl = elementRef.current.getBoundingClientRect().top
	let elHeight = elementRef.current.clientHeight

	if (options.elOffset == "middle") {
		topOfEl =
			elementRef.current.getBoundingClientRect().top + elHeight / 2 - 100
	}

	if (options.elOffset == "bottom") {
		topOfEl = elementRef.current.getBoundingClientRect().bottom
	}

	let topOfElToWindow = topOfEl - window.innerHeight
	let bottomOfElToWindow = topOfEl - window.innerHeight + elHeight
	let windowHeight = window.innerHeight

	if (options.screenOffset == "middle") {
		topOfElToWindow = topOfEl - window.innerHeight + window.innerHeight / 2
		windowHeight = window.innerHeight / 4
	}

	// if (options.screenOffset == "top") {
	// 	topOfElToWindow = topOfEl - window.innerHeight
	// 	// windowHeight = window.innerHeight/4
	// }

	// think I need to change this logic
	// if top of element === 0 return a true and hold that true until a new
	// condition is met?

	if ((topOfElToWindow < 0) & (bottomOfElToWindow > -windowHeight)) {
		return true
	} else {
		return false
	}
}

export const onScreen2 = (elementRef, options) => {
	// if the options are not set
	// set default
	if (!options) {
		options = { elOffset: "top", screenOffset: "top" }
	}

	let topOfEl = elementRef.current.getBoundingClientRect().top
	let elHeight = elementRef.current.clientHeight

	if (options.elOffset == "middle") {
		topOfEl =
			elementRef.current.getBoundingClientRect().top + elHeight / 2 - 100
	}

	if (options.elOffset == "bottom") {
		topOfEl = elementRef.current.getBoundingClientRect().bottom
	}

	let topOfElToWindow = topOfEl - window.innerHeight
	let bottomOfElToWindow = topOfEl - window.innerHeight + elHeight
	let windowHeight = window.innerHeight

	if (options.screenOffset == "middle") {
		topOfElToWindow = topOfEl - window.innerHeight + window.innerHeight / 2
		windowHeight = window.innerHeight / 4
	}

	if (topOfEl < 0 && bottomOfElToWindow > -window.innerHeight) {
		return true
	} else if (bottomOfElToWindow < -window.innerHeight) {
		return false
	}
}

// try and simplify onScreen 1 here
export const onScreen3 = (elementRef, options) => {
	// set default options
	options = {
		elOffset: "top",
		screenOffset: "top"
	}

	// element trigger location
	let elHeight = elementRef.current.clientHeight

	let topOfEl
	if (options.elOffset === "top") {
		// should equal ...
		topOfEl = elementRef.current.getBoundingClientRect().top
	}

	if (options.elOffset === "middle") {
		// should equal half elements height
		topOfEl = elHeight / 2
		// topOfEl =
		// 	elementRef.current.getBoundingClientRect().top + elHeight / 2
	}

	if (options.elOffset == "bottom") {
		// should equal bottom/height of element
		topOfEl = elementRef.current.getBoundingClientRect().bottom
	}

	// screen trigger location
	let windowTrigger
	if (options.screenOffset === "top") {
		// should equal 0
		windowTrigger = 0
	}

	if (options.screenOffset === "middle") {
		// should equal 0
		windowTrigger = window.innerHeight / 2
	}

	if (options.screenOffset === "bottom") {
		// should equal 0
		windowTrigger = window.innerHeight
	}

	if (topOfEl === windowTrigger) {
		return true
	} else {
		return false
	}
}

export const formatTitle = projectName => {
	let name = projectName
	let formattedName = ""

	for (var i = 0; i < name.length; i++) {
		if (i === 0) {
			formattedName += name[i].toUpperCase()
		} else if (name[i] === "-") {
			formattedName += " " + name[i + 1].toUpperCase()
			i = i + 1
		} else {
			formattedName += name[i]
		}
	}
	return formattedName
}
