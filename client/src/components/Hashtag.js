import { Box, Center } from '@chakra-ui/layout'
import React from 'react'
import { ResponsiveBar } from '@nivo/bar'


const data = [
	{
		month: 'January 2020',
		fake: 30,
		real: 40,
		fakeColor: 'hsl(0, 70%, 50%)',
		realColor: 'hsl(94, 100%, 50%)',
	},
	{
		month: 'February 2020',
		fake: 50,
		real: 20,
		fakeColor: 'hsl(0, 70%, 50%)',
		realColor: 'hsl(94, 100%, 50%)',
	},
	{
		month: 'March 2020',
		fake: 45,
		real: 80,
		fakeColor: 'hsl(0, 70%, 50%)',
		realColor: 'hsl(94, 100%, 50%)',
	},
	{
		month: 'April 2020',
		fake: 100,
		real: 110,
		fakeColor: 'hsl(0, 70%, 50%)',
		realColor: 'hsl(94, 100%, 50%)',
	},
	{
		month: 'May 2020',
		fake: 300,
		real: 100,
		fakeColor: 'hsl(0, 70%, 50%)',
		realColor: 'hsl(94, 100%, 50%)',
	},
	{
		month: 'June 2020',
		fake: 500,
		real: 250,
		fakeColor: 'hsl(0, 70%, 50%)',
		realColor: 'hsl(94, 100%, 50%)',
	},
	{
		month: 'July 2020',
		fake: 490,
		real: 400,
		fakeColor: 'hsl(0, 70%, 50%)',
		realColor: 'hsl(94, 100%, 50%)',
	},
	{
		month: 'August 2020',
		fake: 530,
		real: 411,
		fakeColor: 'hsl(0, 70%, 50%)',
		realColor: 'hsl(94, 100%, 50%)',
	},
	{

		month: 'September 2020',
		fake: 590,
		real: 300,
		fakeColor: 'hsl(0, 70%, 50%)',
		realColor: 'hsl(94, 100%, 50%)',
	}

]

export default function Hashtag() {
	return (
		<Box h='100%'>
			<Center h='100%'>
				<ResponsiveBar
					axisBottom={{
						tickSize: 5,
						tickPadding: 5,
						tickRotation: 0,
						legend: 'Time',
						legendPosition: 'middle',
						legendOffset: 32
					}}
					axisLeft={{
						tickSize: 5,
						tickPadding: 5,
						tickRotation: 0,
						legend: 'No. of Tweets',
						legendPosition: 'middle',
						legendOffset: -40
					}}
					data={data}
					borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
					enableLabel={false}
					onMouseEnter={(_data, event) => {
						event.target.style.opacity = 0.5;
						document.body.style.cursor = "pointer";


					}}
					onMouseLeave={(_data, event) => {
						event.target.style.opacity = 1;
						document.body.style.cursor = "default";

					}}

					keys={['fake', 'real']}
					indexBy="month"
					margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
					padding={0.3}
					groupMode="grouped"
					valueScale={{ type: 'linear' }}
					indexScale={{ type: 'band', round: true }}
					colors={({ id, data }) => String(data[`${id}Color`])}
				/>
			</Center>
		</Box>
	)
}
