import { useContext } from 'react'
import { FirebaseContext } from '../store/firerbase'

// eslint-disable-next-line import/no-anonymous-default-export
const useFirebase = () => useContext(FirebaseContext)
export { useFirebase }