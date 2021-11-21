import { useDisclosure, useInterval } from '@chakra-ui/hooks'
import { Center, Heading, HStack, Stack, Wrap } from '@chakra-ui/layout'
import { Tag, Skeleton, SkeletonText } from '@chakra-ui/react'
import { Fade } from '@chakra-ui/transition'
import React from 'react'
import { useNavigate } from 'react-router'
import { useFirebase } from '../hooks/useFirebase'
import { useStore } from '../store/store'
import SearchBar from './SearchBar'
// import hashtagMap from '../hashtag_map.json'
// import tweets from '../consolidated_data.json'
import { query, limit, orderBy, getDocs, collection, doc, setDoc } from "firebase/firestore";


export default function Home() {
	const db = useFirebase()
	const [tags, setTags] = React.useState([])
	React.useEffect(() => {
		// for (const [id, tweets] of Object.entries(topicMap)) {
		// 	const topicRef = doc(db, 'topic_map', id)
		// 	setDoc(topicRef, { tweet_ids: tweets })
		// }
		// async function setHashtagMap() {
		// 	console.log(JSON.parse(hashtagMap[0].tweet_ids))
		// 	for (const hashtag of hashtagMap) {
		// 		const hashtagInfo = { hashtag: hashtag.hashtag, tweet_ids: JSON.parse(hashtag.tweet_ids) }
		// 		hashtagInfo.count = hashtagInfo.tweet_ids.length
		// 		const hashtagRef = doc(db, 'hashtags', hashtagInfo.hashtag)
		// 		await setDoc(hashtagRef, hashtagInfo)
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
		// 	for (const tweet of tweets) {
		// 		const tweetRef = doc(db, 'tweets', tweet.tweet_id)
		// 		await setDoc(tweetRef, tweet)
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
