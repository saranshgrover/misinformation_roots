import React, { createContext } from 'react'
import { initializeApp } from 'firebase/app'
import '@firebase/storage'
import { firebaseConfig } from './firebaseConfig'
import { getFirestore } from '@firebase/firestore'
const FirebaseContext = createContext(null)

export { FirebaseContext }
export default function Firebase({ children }) {
	const [app, setApp] = React.useState()
	const [firestore, setFirestore] = React.useState()
	if (!app) {
		const newApp = initializeApp(firebaseConfig)
		const db = getFirestore(newApp)
		setFirestore(db)
		setApp(newApp)
	}
	return (
		<FirebaseContext.Provider value={firestore}>{children}</FirebaseContext.Provider>
	)
}