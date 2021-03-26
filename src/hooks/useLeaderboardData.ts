import { useState, useEffect } from 'react'

import { getFireStore } from './useFirebase'

type User = { username: string; score: number }

const useLeaderboardData = () => {
  const [loading, setLoading] = useState(true)
  const [leaderBoardList, setLeaderBoardList] = useState<User[]>([])

  useEffect(() => {
    loadData().then(() => setLoading(false))
  }, [])

  const loadData = async () => {
    const { firestore } = await getFireStore()

    try {
      const usersRef = firestore.collection('users').orderBy('score', 'desc')
      const querySnapshot = await usersRef.get()

      const data = querySnapshot.docs.map((doc, index) => {
        const docData = doc.data() as User

        return docData
      })

      setLeaderBoardList(data)
    } catch (error) {}
  }

  return { loading, leaderBoardList }
}

export default useLeaderboardData
