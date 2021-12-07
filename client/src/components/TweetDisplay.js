import { Box, Center } from '@chakra-ui/layout';
import React from 'react'
import Tree from 'react-d3-tree';
import Tweet from './Tweet';
import { useCenteredTree } from '../hooks/useCenteredTree';
import {
	Slider,
	SliderTrack,
	SliderFilledTrack,
	SliderThumb,
} from '@chakra-ui/react'
import { useParams } from 'react-router';

const orgChart = {
	name: 'LadyMercia',
	attributes: {
		text: '21 million Chinese died of coronavirus - US intelligence officials intercept data - Washington Live',
		veracity: 'false',
		author_name: 'LadyMercia',
		profile_image_url: 'https://pbs.twimg.com/profile_images/1343112790886801408/Gk-zXTPe_400x400.jpg',
		favorite_count: 685,
		retweet_count: 674
	},
	children: [
		{
			name: 'Skibum170',
			attributes: {
				author_name: 'Steve',
				veracity: 'false',
				profile_image_url: 'https://pbs.twimg.com/profile_images/1359821964291026945/-bF9NQUt_400x400.jpg',
				favorite_count: 20,
				retweet_count: 5,
				text: `Well I bet they still haven't counted all the bodies they welded into their appartment blocks yet? #COVID2019 #StayHomeSaveLives`
			},
			children: [
				{
					name: 'asailorsway',
					attributes: {
						veracity: 'true',
						text: 'imagine not knowing they were going to weld your door shut, bc the people didnt. imagine not having fresh water for two weeks.. shocker, they died.',
						favorite_count: 0,
						retweet_count: 0,
						author_name: 'asailorBINswayed'
					}
				},
			],
		},
		{
			name: 'KeithRi',
			attributes: {
				veracity: 'true',
				text: `I know China has a population of 1.4 billion but surely someone would have noticed 21 million people dying. It's like us not noticing if all the remoaners disappeared. Party!`,
				author_name: 'The Resistance',
				favorite_count: 0,
				retweet_count: 0
			},

		},
		{
			name: 'ViewsFromMe',
			attributes: {
				veracity: 'true',
				text: `So they have hidden the dead bodies of two times the population of New York....  and why have we not seen the same mortality rate in the rest of Asia, europe eg the mystical  2% of population eg 100 mil is asia and 50mil in europe🤔 or simply total bollocks`,
				favorite_count: 17,
				retweet_count: 4,
				author_name: 'ViewsFromMe',
				profile_image_url: 'https://pbs.twimg.com/profile_images/620286302727094272/7JSUPI8Z_400x400.jpg'

			},
			children: [
				{
					name: 'LadyMerica',
					attributes: {
						veracity: 'false',
						author_name: 'LadyMercia',
						profile_image_url: 'https://pbs.twimg.com/profile_images/1343112790886801408/Gk-zXTPe_400x400.jpg',
						text: 'You haven’t heard about the mass cremations then..'
					}
				},
				{
					name: 'ViewsFromMe',
					attributes: {
						author_name: 'ViewsFromMe',
						profile_image_url: 'https://pbs.twimg.com/profile_images/620286302727094272/7JSUPI8Z_400x400.jpg',
						veracity: 'true',
						text: `21mil... say three months... just 233,333 a day... Thinking face. Also how many death do you think thier are in wuhan a day normally? Or Hubei provinces? Try 1500/2000 every day normally. Please explain who they can hide 233,000 a day`,
						favorite_count: 5,
						retweet_count: 1
					}
				},
				{
					name: 'Jamie Tennant',
					attributes: {
						author_name: 'Jamie Tennant',
						text: 'The death toll isn’t as high as what is claimed here but it’s 100% higher than China have claimed. There covering up something',
						veracity: 'false',
						type: 'Claim',
						favorite_count: 0,
						retweet_count: 1,
						profile_image_url: 'https://pbs.twimg.com/profile_images/788746412465000449/Ge8nYXqs_400x400.jpg'

					}
				}
			]
		}
	],
}

const straightPathFunc = (linkDatum, orientation) => {
	const { source, target } = linkDatum;
	const targ = orientation === 'horizontal'
		? `M${source.y},${source.x}L${target.y},${target.x}`
		: `M${source.x},${source.y}L${target.x},${target.y}`;
	console.log(targ);
	return targ;
};

export default function TweetDisplay() {
	const [translate, containerRef] = useCenteredTree()
	let params = useParams()
	console.log(params)
	const [zoom, setZoom] = React.useState(0.5)
	return (
		<Center id="treeWrapper" width='100%' height='100%' ref={containerRef}>
			<Slider
				defaultValue={0.5}
				min={0.1}
				max={1}
				step={0.1}
				orientation='vertical'
				minH='32'
				onChange={(val) => setZoom(val)}
			>
				<SliderTrack>
					<SliderFilledTrack />
				</SliderTrack>
				<SliderThumb />
			</Slider>
			<Tree
				separation={{
					nonSiblings: 3,
					siblings: 3
				}}
				initialDepth={0}
				// depthFactor={1}
				pathFunc='diagonal'
				orientation='horizontal'
				zoomable={true}
				zoom={zoom}
				nodeSize={{ x: 400, y: 200 }}
				renderCustomNodeElement={({ nodeDatum, toggleNode }) => {
					return (
						<foreignObject width="30vw" height="40vh">
							<Box onClick={toggleNode}>
								<Tweet externalLink={nodeDatum.__rd3t.depth === 0 && params.tweetId} veracity="true" onClick={toggleNode} borderColor={nodeDatum?.attributes?.veracity === 'true' ? 'green' : 'red'} borderWidth='5px' maxW='sm' {...nodeDatum.attributes} text={nodeDatum.__rd3t.collapsed ? nodeDatum.attributes?.text : ''} />
							</Box>
						</foreignObject>
					)
				}}
				translate={translate} data={orgChart} />
		</Center>
	)
}
