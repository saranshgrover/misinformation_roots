import create from 'zustand'

export const useStore = create(set => ({
	header: false,
	hashtag: '',
	month: null,
	tweet: null,
	setHashtag: (hashtag) => set(state => ({ hashtag: hashtag, header: Boolean(hashtag) })),
	setMonth: (month) => set(state => ({ month: month })),
	setTweet: (tweet) => set(state => ({ tweet: tweet })),
	clear: () => set(() => ({ header: false, hashtag: '', month: null, tweet: null })),

}))
