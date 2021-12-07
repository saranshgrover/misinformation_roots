import React from 'react'
import { Box, Flex, Avatar, Heading, Container, Stack, Spacer, Icon, Text, Tag, IconButton } from '@chakra-ui/react'
import { AiFillHeart } from 'react-icons/ai'
import { FaRetweet } from 'react-icons/fa'
import { BiLinkExternal } from 'react-icons/bi'


export default function Tweet({ externalLink, text, favorite_count, retweet_count, author_name, profile_image_url, veracity, tweetType, ...boxStyles }) {
	return (
		<Box maxW='md' borderWidth='1px' borderRadius='lg' boxShadow='dark-lg' overflow='hidden' p='2' bg='whiteAlpha.900' {...boxStyles}>
			<Stack direction='row' align='center' justify='center' p='4' >
				<Avatar name='Tweet Author' src={profile_image_url} size='sm' />
				<Spacer />
				<Heading as='h4' size='md'>{author_name ?? 'Tweet Author'}</Heading>
				<Spacer />
				{externalLink && <IconButton icon={<BiLinkExternal />} aria-label='External Link' as='a' href={`https://twitter.com/i/web/status/${externalLink}`} target="_blank" rel="noopener noreferrer" />}
			</Stack>
			<Container maxW='container.sm'>
				{text}
			</Container>
			<Stack direction='row' align='flex-start' justify='center' spacing='10' mx='2em'>
				<Flex direction='row' align='center' alignContent='center' alignItems='center' justify='center'>
					<Icon as={AiFillHeart} size='5em' color='red.500' mr='0.5rem' />
					<Text fontWeight='bold' size='xl'>{favorite_count}</Text>
				</Flex>
				<Flex direction='row' align='center' alignContent='center' alignItems='center' justify='center' >
					<Icon as={FaRetweet} size='5em' color='twitter.500' mr='0.5rem' />
					<Text fontWeight='bold' size='xl'>{retweet_count}</Text>
				</Flex>
				<Spacer />
				<Tag size='md' colorScheme={veracity === 'true' ? 'green' : 'red'}>{tweetType}</Tag>
			</Stack>
		</Box >

	)
}
