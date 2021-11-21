import { Box, Center } from '@chakra-ui/layout'
import React from 'react'
import { ResponsiveBar } from '@nivo/bar'
import { useNavigate, useParams } from 'react-router'
import { useStore } from '../store/store'
import { FAKE_COLOR, REAL_COLOR } from '../consts'
import { doc, getDoc, query, collection, limit, getDocs, orderBy } from "firebase/firestore";
import { useFirebase } from '../hooks/useFirebase'
import { format } from 'date-fns'
import { ResponsiveSwarmPlot } from '@nivo/swarmplot'

export default function Hashtag() {
	async function getTweetsFromHashtag(db, tweet_ids) {
		const tweets = []
		const tweetRef = collection(db, "tweets")
		const q = query(tweetRef, orderBy("text"), limit(100));
		const snapshot = await getDocs(q);
		snapshot.forEach(doc => {
			tweets.push(doc.data())
		})
		return tweets
		// for (const tweet_id of tweet_ids) {
		// 	const docRef = doc(db, "tweets", tweet_id.toString());
		// 	const tweet = await getDoc(docRef)
		// 	if (tweet.exists()) {
		// 		tweets.push(tweet.data())
		// 	}
		// }
		// console.log(tweets)

		// return tweets
	}
	let params = useParams()
	const [tweets, setTweets] = React.useState([])
	const { data, groups, min, max } = React.useMemo(() => {
		let min = 5000;
		let max = 0;
		const groups = {}
		const data = tweets.map(tweet => {
			const date = new Date(tweet.created_at)
			const month = format(date, 'MMMM yyyy')
			groups[month] = date
			min = Math.min(min, Number(tweet.favorite_count))
			max = Math.max(max, Number(tweet.favorite_count))
			return {
				id: tweet.tweet_id,
				favorite_count: Number(tweet.favorite_count),
				group: month,
				type: tweet.veracity === 'TRUE' ? 'Real' : 'Fake',
				index: Number(tweet.index),
				fakeColor: FAKE_COLOR,
				realColor: REAL_COLOR,
			}
		})
		return { data: data, groups: Object.keys(groups).sort((a, b) => groups[a] - groups[b]), min, max }

	}, [tweets])
	const db = useFirebase()
	const navigate = useNavigate()
	const [hashtag, setHashtag] = useStore(s => [s.hashtag, s.setHashtag])
	React.useEffect(() => {
		if (!hashtag && params.hashtag) {
			const hashtagDoc = doc(db, 'hashtags', params.hashtag)
			getDoc(hashtagDoc).then(doc => {
				setHashtag(doc.data())
			})
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [params.hashtag, db])
	React.useEffect(() => {
		if (hashtag && hashtag.tweet_ids) {
			getTweetsFromHashtag(db, hashtag.tweet_ids).then(tweets => setTweets(tweets))
		}
	}, [db, hashtag])
	return (
		<Box h='95%'>
			<Center h='100%'>
				{data.length > 0 && groups.length > 0 &&
					<ResponsiveSwarmPlot
						data={data}
						groups={groups}
						colors={({ data }) => {
							return data.type === 'Real' ? REAL_COLOR : FAKE_COLOR
						}}
						identity="id"
						value="favorite_count"
						valueScale={{ type: 'linear', min: min, max: max, reverse: false }}
						size={{ key: 'favorite_count', values: [min, max], sizes: [6, 20] }}
						forceStrength={4}
						simulationIterations={100}
						borderColor={{
							from: 'color',
							modifiers: [
								[
									'darker',
									0.6
								],
								[
									'opacity',
									0.5
								]
							]
						}}
						margin={{ top: 80, right: 100, bottom: 80, left: 100 }}
						axisTop={{

							orient: 'top',
							tickSize: 10,
							tickPadding: 5,
							tickRotation: 0,
							legendPosition: 'middle',
							legendOffset: -46
						}}
						axisRight={{
							orient: 'right',
							tickSize: 10,
							tickPadding: 5,
							tickRotation: 0,
							legend: 'favorite_count',
							legendPosition: 'middle',
							legendOffset: 76
						}}
						axisBottom={{
							orient: 'bottom',
							tickSize: 10,
							tickPadding: 5,
							tickRotation: 0,
							legendPosition: 'middle',
							legendOffset: 46
						}}
						axisLeft={{
							orient: 'left',
							tickSize: 10,
							tickPadding: 5,
							tickRotation: 0,
							legendPosition: 'middle',
							legendOffset: -76
						}}
					/>}
				{/* <ResponsiveBar
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
					onClick={(data, _e) => {
						navigate(`/hashtag/${hashtag}/${data.data.id}`)
					}}
					keys={['fake', 'real']}
					indexBy="month"
					margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
					padding={0.3}
					groupMode="grouped"
					valueScale={{ type: 'linear' }}
					indexScale={{ type: 'band', round: true }}
					colors={({ id, data }) =>
						String(data[`${id}Color`])
					}
				/> */}
			</Center>
		</Box>
	)
}
