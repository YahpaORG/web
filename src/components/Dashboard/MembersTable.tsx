import { useProfilesQuery } from 'hooks/useProfilesQuery'
import { ErrorMessage } from 'components/Dashboard/ErrorMessage'
import { LoadingSpinner } from 'components/Dashboard//LoadingSpinner'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  IconButton,
  TableContainer,
  HStack,
} from '@chakra-ui/react'
import { MdEdit } from 'react-icons/md'
import { DeleteMemberProfileModal } from './DeleteMemberProfileModal'
import { useDeleteProfileMutation } from 'hooks/useDeleteProfileMutation'
import { useRouter } from 'next/router'

export function MembersTable() {
  const router = useRouter()
  const {
    data: profiles,
    error,
    isLoading,
    refetch,
    isRefetching,
  } = useProfilesQuery()

  const deleteProfileMutation = useDeleteProfileMutation()

  const handleDeleteProfile = (profileId: string) => {
    deleteProfileMutation.mutate(profileId, {
      onSuccess: () => {
        refetch()
      },
    })
  }

  if (error) return <ErrorMessage />
  if (isLoading || isRefetching) return <LoadingSpinner />

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
            <Th textAlign="center">Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {profiles?.map((profile) => (
            <Tr key={profile.clerkId}>
              <Td>{profile.clerkId}</Td>
              <Td>{`${profile.first_name} ${profile.last_name}`}</Td>
              <Td>{profile.email_address}</Td>
              <Td>{profile.status}</Td>
              <Td>
                <HStack justifyContent="center">
                  <IconButton
                    aria-label="Edit profile"
                    icon={<MdEdit size={24} />}
                    onClick={() =>
                      router.push(`/dashboard/members/${profile.clerkId}`)
                    }
                  />
                  <DeleteMemberProfileModal
                    onConfirm={() => handleDeleteProfile(profile.clerkId)}
                  />
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
