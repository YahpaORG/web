import { List, ListItem, TabPanel } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { useRole } from 'hooks/useRole'
import { User } from '@clerk/nextjs/dist/types/server'
import LoadingPanel from './LoadingPanel'
import ErrorPanel from './ErrorPanel'

const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch('/api/users')
  return await response.json()
}

export default function MembersPanel() {
  const { isAdmin } = useRole()
  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['membersPanel'],
    queryFn: fetchUsers,
  })

  if (!isAdmin) return null
  if (isLoading) return <LoadingPanel />
  if (error) return <ErrorPanel />

  return (
    <TabPanel>
      <List>
        {users?.map((user) => (
          <ListItem key={user.id}>{user.id}</ListItem>
        ))}
      </List>
    </TabPanel>
  )
}
