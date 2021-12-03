import React, { ReactElement, useState } from 'react'
import { Input, InputGroup, InputRightElement, Link } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../store/store'



export default function SearchBar() {
  const hashtag = useStore(s => s.hashtag)
  const navigate = useNavigate();

  const setHashtag = useStore(s => s.setHashtag)
  const [searchInput, setSearchInput] = useState()
  const handleSearch = (e) => {
    e.preventDefault()
    // setHashtag(searchInput)
    navigate(`/hashtag/${searchInput}`)
  }
  return (
    <form onSubmit={handleSearch}>
      <InputGroup
        w={{ base: !searchInput ? '0' : '40vw', lg: '40vw' }}
        display='block'>
        <Input
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
          variant='outline'
          bg='primary.700'
          placeholder='Search for a keyword'
          borderWidth={1}
          _focus={{
            borderColor: 'secondary.300',
          }}></Input>
        <Link onClick={handleSearch}>
          <InputRightElement
            bg='secondary.300'
            borderRightRadius='6'
            children={<SearchIcon />}
            cursor='pointer'
          />
        </Link>
      </InputGroup>
    </form>
  )
}