import { useDisclosure, useInterval } from '@chakra-ui/hooks'
import { Center, Heading, HStack, Stack, Wrap } from '@chakra-ui/layout'
import { Tag, Skeleton, SkeletonText } from '@chakra-ui/react'
import { Fade } from '@chakra-ui/transition'
import React from 'react'
import { useNavigate } from 'react-router'
import { useFirebase } from '../hooks/useFirebase'
import { useStore } from '../store/store'
import SearchBar from './SearchBar'
// import hashtagMap1 from '../consolidated_data/consolidated_hashtags.json'
// import tweets1 from '../consolidated_data/05-consolidated_data.json'
// import tweets2 from '../consolidated_data/07-consolidated_data.json'
// import tweets3 from '../consolidated_data/09-consolidated_data.json'
// import tweets4 from '../consolidated_data/11-consolidated_data.json'
import { query, limit, orderBy, getDocs, collection, doc, setDoc, arrayUnion, updateDoc, getDoc } from "firebase/firestore";


export default function Home() {
	const db = useFirebase()
	const [tags, setTags] = React.useState([])
	React.useEffect(() => {
		// for (const [id, tweets] of Object.entries(topicMap)) {
		// 	const topicRef = doc(db, 'topic_map', id)
		// 	setDoc(topicRef, { tweet_ids: tweets })
		// }
		// async function setHashtagMap() {
		// 	const hashtags = [hashtagMap1]
		// 	for (const hashtagObject of hashtags) {
		// 		for (const hashtag of Object.keys(hashtagObject)) {
		// 			console.log(hashtag)
		// 			const tweets = hashtagObject[hashtag].flat(Infinity)
		// 			const hashtagInfo = { hashtag: hashtag, tweet_ids: tweets, count: tweets.length }
		// 			const hashtagDoc = doc(db, 'hashtags', hashtag)
		// 			await setDoc(hashtagDoc, hashtagInfo)
		// 			for (const tweet_id of tweets) {
		// 				const tweetDoc = doc(db, 'tweets', tweet_id)
		// 				await updateDoc(tweetDoc, { hashtags: arrayUnion(hashtag) })
		// 			}
		// 		}
		// 	}
		// 	console.log('done')
		// }
		async function getHashtags() {
			const hashtagRef = collection(db, "hashtags")
			const q = query(hashtagRef, orderBy("count", 'desc'), limit(20));
			const snapshot = await getDocs(q);
			const hashtagData = []
			snapshot.forEach(doc => {
				hashtagData.push(doc.data())
			})
			return hashtagData
		}
		// async function setTweets() {
		// 	for (const tweet of [...tweets1, ...tweets2, ...tweets3, ...tweets4]) {
		// 		const tweetRef = doc(db, 'tweets', tweet.tweet_id)
		// 		await setDoc(tweetRef, { ...tweet, veracity: tweet.veracity.toLowerCase(), hashtags: [], created_at: new Date(tweet.created_at), favorite_count: parseInt(tweet.favorite_count), retweet_count: parseInt(tweet.retweet_count), index: parseInt(tweet.index) })
		// 	}
		// 	console.log('done')
		// }
		// setTweets()
		// setHashtagMap()
		getHashtags().then(data => setTags(data))
	}, [db])
	const { isOpen, onToggle } = useDisclosure()
	const navigate = useNavigate()
	const setHashtag = useStore(s => s.setHashtag)
	React.useEffect(() => {
		onToggle()
	}, [])
	// useInterval(() => {
	// 	onToggle()
	// }, 2000)

	return (
		<Stack spacing="4em" h='100%' direction='column' justify='center' alignContent='center'>

			<Center>
				<Heading as='h2' size='xl' color='gray.700'>{`What Does Twitter Think About`}</Heading>
				<Fade in={isOpen} delay={0} transition={{ duration: 1.5 }}>
					<Heading ml='0.25em' as='h1' size='xl' color='#1DA1F2'>{'COVID19'}</Heading>
				</Fade>
				<Heading as='h2' size='xl' color='gray.700'>{`?`}</Heading>

			</Center>
			<Center>
				<SearchBar />
			</Center>
			<Center>
				<SkeletonText noOfLines={4} spacing="4" isLoaded={tags.length !== 0} />
				<Wrap spacing={4} mx='10em'>
					{tags.map((tag) => (
						<Tag as='button' onClick={() => {
							setHashtag(tag)
							navigate(`/hashtag/${tag.hashtag}`)
						}} size={'lg'} key={tag} variant="solid" backgroundColor="#1DA1F2">
							{`#${tag.hashtag}`}
						</Tag>
					))}
				</Wrap>
			</Center>
		</Stack>
	)
}
