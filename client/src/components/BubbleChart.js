import { Box, Center } from '@chakra-ui/layout'
import React from 'react'
import { ResponsiveCirclePacking } from '@nivo/circle-packing'
import { FAKE_COLOR, REAL_COLOR } from '../consts'

export function generateChildren(n) {
	const children = []
	for (let i = 0; i < n; i++) {
		children.push({
			id: i,
			loc: Math.floor(Math.random() * 500),
			veracity: i % 2 === 0 ? true : false,

		})
	}
	return children
}

const data =
{
	name: "Bubble Chart of Tweets",
	children: generateChildren(40)
}



export default function BubbleChart() {
	return (
		<Box h='100%'>
			<Center h='100%'>
				<ResponsiveCirclePacking
					data={data}
					margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
					id="name"
					value="loc"
					colors={({ id, data }) =>
						data.veracity ? REAL_COLOR : FAKE_COLOR
					}
					childColor={{ from: 'color', modifiers: [['brighter', 0.4]] }}
					padding={4}
					enableLabels={true}
					labelsFilter={function (e) { return 2 === e.node.depth }}
					labelsSkipRadius={10}
					labelTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
					borderWidth={1}
					leavesOnly
					borderColor={{ from: 'color', modifiers: [['darker', 0.5]] }}
				/>
			</Center>
		</Box>
	)
}
