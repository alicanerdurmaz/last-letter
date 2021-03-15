import { useState, useEffect } from 'react'

import { useFirestore } from './useFirebase'

type User = { username: string; score: number }
type CurrentUser = { username: string; score: number; rank: number } | null
export interface ILeaderboardData {
  leaderBoardList: User[]
  currentUser: CurrentUser
}
const useLeaderboardData = () => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<ILeaderboardData>({ leaderBoardList: [], currentUser: null })

  useEffect(() => {
    loadData().then(() => setLoading(false))
  }, [])

  const loadData = async () => {
    const { firestore } = await useFirestore()

    try {
      let user: CurrentUser = null

      const usersRef = firestore.collection('users').orderBy('score', 'desc')
      const querySnapshot = await usersRef.get()

      const data = querySnapshot.docs.map((doc, index) => {
        const docData = doc.data() as User

        // if (docData.username === mockCurrentUser) {
        //   user = {
        //     username: docData.username,
        //     rank: index + 1,
        //     score: docData.score,
        //   }
        // }

        return docData
      })

      setData({ leaderBoardList: data, currentUser: user })
    } catch (error) {}
  }

  return { loading, leaderBoardList: data.leaderBoardList, currentUser: data.currentUser }
}

export default useLeaderboardData
