import React, { useEffect, useRef } from 'react'
import mermaid from 'mermaid'
import fsPromises from 'fs/promises'
import path from 'path'
import { ganttFormat } from '@/utils/ganttFormat'

// Settings for chart. *OPTIONAL*
mermaid.initialize({
	startOnLoad: true,
	theme: 'default',
	securityLevel: 'loose',
})

type GanttProps = {
	ganttMD: string
}

export default function Gantt({ ganttMD }: GanttProps) {
	const ganttRef = useRef<HTMLDivElement>(null!)

	useEffect(() => {
		// Only AFTER component is mounted, add class mermaid and load chart on DOM. Otherwise, Error: "Text content does not match server-rendered HTML".
		ganttRef.current.className = 'mermaid'
		mermaid.contentLoaded()

		//Let chart load for a few ms, then apply chart formatting.
		setTimeout(() => {
			ganttFormat()
		}, 200)
	}, [])

	return (
		<div id="ganttContainer">
			<div ref={ganttRef}>{ganttMD}</div>
		</div>
	)
}

// Fetch gantt activities from markdown file.
export async function getStaticProps() {
	// VScode extension "Mermaid Markdown Syntax Highlighting" provides syntax highligh to ".mmd" files.
	const filePath = path.join(process.cwd(), 'data/gantt.mmd')
	const buffer = await fsPromises.readFile(filePath)
	const ganttMD = buffer.toString()

	return {
		props: { ganttMD },
	}
}
