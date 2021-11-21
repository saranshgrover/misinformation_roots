import React from 'react'
import {
	Box, Center, Menu,
	MenuButton,
	IconButton,
	Button,
	Spacer,
	Stack
} from '@chakra-ui/react'
import { ArrowBackIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { useStore } from '../store/store'
import { useNavigate } from 'react-router'

export default function Header() {
	const [hashtag, clear] = useStore(s => [s.hashtag, s.clear])
	const navigate = useNavigate()
	return (
		<Box as='nav' w='100vw' h='5%' boxShadow="0 0 8px 5px rgba(0, 0, 0, 0.2)" >
			<Stack direction='row' alignContent='center'>
				<IconButton aria-label="Back" icon={<ArrowBackIcon />} onClick={() => {
					clear()
					navigate('/')
				}} />
				<Spacer />
				<Center>
					<Menu isLazy>
						<MenuButton as={Button} rightIcon={<ChevronDownIcon />} colorScheme="twitter" variant='outline' size='sm'>
							{`#${hashtag.hashtag}`}
						</MenuButton>

					</Menu>
				</Center>
				<Spacer />
			</Stack>
		</Box>
	)
}
