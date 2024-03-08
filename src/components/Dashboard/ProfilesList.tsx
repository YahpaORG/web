import { useProfilesQuery } from 'hooks/useProfilesQuery'
import ErrorPanel from './ErrorPanel'
import LoadingPanel from './LoadingPanel'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'

export default function ProfilesList() {
  const { data: profiles, error, isLoading } = useProfilesQuery()

  if (error) return <ErrorPanel />
  if (isLoading) return <LoadingPanel />

  console.log(profiles)

  return (
    <TableContainer>
      <Table variant="simple" size="lg">
        <TableCaption>A table of all member profiles</TableCaption>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Name</Th>
            <Th>Email Address</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {profiles?.map((profile) => (
            <Tr key={profile.id}>
              <Td>{profile.clerkId}</Td>
              <Td>{`${profile.first_name} ${profile.last_name}`}</Td>
              <Td>{profile.email_address}</Td>
              <Td>{profile.status}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
