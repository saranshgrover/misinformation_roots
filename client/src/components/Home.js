import { useDisclosure, useInterval } from '@chakra-ui/hooks'
import { Center, Heading, HStack, Stack, Wrap } from '@chakra-ui/layout'
import { Tag } from '@chakra-ui/react'
import { Fade } from '@chakra-ui/transition'
import React from 'react'
import { useNavigate } from 'react-router'
import { useFirebase } from '../hooks/useFirebase'
import { useStore } from '../store/store'
import SearchBar from './SearchBar'
import { doc, setDoc } from "firebase/firestore";
import topicMap from '../topic_map.json'
import tweets from '../consolidated_data.json'
import { firebaseConfig } from '../store/firebaseConfig'

export default function Home() {
	const db = useFirebase()
	React.useEffect(() => {
		// for (const [id, tweets] of Object.entries(topicMap)) {
		// 	const topicRef = doc(db, 'topic_map', id)
		// 	setDoc(topicRef, { tweet_ids: tweets })
		// }
		async function setTweets() {
			for (const tweet of tweets) {
				const tweetRef = doc(db, 'tweets', tweet.tweet_id)
				await setDoc(tweetRef, tweet)
			}
			console.log('done')
		}
		setTweets()
	}, [db])
	const { isOpen, onToggle } = useDisclosure()
	const tags = ['#COVID_19', '#FAUCI', '#LOCKDOWN', '#TRUMP', '#VACCINES', '#PFIZER']
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
					<Heading ml='0.25em' as='h1' size='xl' color='#1DA1F2'>{tags[Math.round(Math.random() * tags.length)]}</Heading>
				</Fade>
				<Heading as='h2' size='xl' color='gray.700'>{`?`}</Heading>

			</Center>
			<Center>
				<SearchBar />
			</Center>
			<Center>
				<Wrap spacing={4}>
					{tags.map((tag) => (
						<Tag as='button' onClick={() => {
							setHashtag(tag)
							navigate(`/hashtag/${tag}`)
						}} size={'lg'} key={tag} variant="solid" backgroundColor="#1DA1F2">
							{tag}
						</Tag>
					))}
				</Wrap>
			</Center>
		</Stack>
	)
}
