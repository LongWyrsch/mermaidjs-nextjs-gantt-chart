// ~ ~ ~ Define chart formatting ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ 
export const ganttFormat = () => {
	window.scrollTo(document.body.scrollWidth, document.body.scrollHeight)

	const allText = document.getElementsByTagName('text')
	for (var i = allText.length; i-- > 0; ) {
		if (allText[i].innerHTML.includes('**')) {
			// allText[i].style.cssText = 'font-weight: bold !important'
			allText[i].style.setProperty('font-weight', 'bold', 'important')
		}
		// If task contains [Git], then color text.
		if (allText[i].innerHTML.includes('[Git]')) {
			// if (allText[i].classList.contains('taskTextOutsideRight')) {
			//     // Text on right of rectange
			//     // allText[i].style.cssText = 'fill: #ff0000 !important'
			// } else {
			//     // Text inside pruple rectangle
			//     // allText[i].style.cssText = 'fill: #ffcccc !important'
			// }
			allText[i].style.setProperty('fill', 'blue', 'important')
		}
	}
}