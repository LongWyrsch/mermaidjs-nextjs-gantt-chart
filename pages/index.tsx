import React, { useEffect, useRef } from 'react'
import mermaid from 'mermaid'

// Settings for chart. *OPTIONAL*
mermaid.initialize({
	startOnLoad: true,
	theme: 'default',
	securityLevel: 'loose',
})

type GanttProps = {
    ganttMD: string
}


export default function Gantt({ganttMD}: GanttProps) {
	const ganttRef = useRef<HTMLDivElement>(null!)

	useEffect(() => {
		// Only AFTER component is mounted, add class mermaid and load chart on DOM. Otherwise, Error: "Text content does not match server-rendered HTML".
		ganttRef.current.className = 'mermaid'
        mermaid.contentLoaded()

        //Let chart load for a few ms, then apply chart formatting.
        setTimeout(() => {
            ganttFormat()
        }, 200);
	}, [])

	return (
		<div id="ganttContainer">
			<div ref={ganttRef}>{ganttMD}</div>
		</div>
	)
}


// ~ ~ ~ Fetch gantt activities from markdown file ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~  
// VScode extension "Mermaid Markdown Syntax Highlighting" provides syntax highligh to ".mmd" files.
import fsPromises from 'fs/promises'
import path from 'path'
export async function getStaticProps() {
	const filePath = path.join(process.cwd(), 'data/gantt.mmd')
	const buffer = await fsPromises.readFile(filePath)
    const ganttMD = buffer.toString()

	return {
		props: {ganttMD},
	}
}



// ~ ~ ~ Define chart formatting ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ 
const ganttFormat = () => {
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
