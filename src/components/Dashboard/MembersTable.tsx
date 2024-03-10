import {
  HStack,
  IconButton,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { LoadingSpinner } from 'components/Dashboard//LoadingSpinner'
import { ErrorMessage } from 'components/Dashboard/ErrorMessage'
import { useRouter } from 'next/router'
import { MdEdit } from 'react-icons/md'
import { deleteMember, getAllMembers } from 'utils/api-helpers'
import { DeleteMemberProfileModal } from './DeleteMemberProfileModal'

export function MembersTable() {
  const router = useRouter()

  const {
    data: members,
    error,
    isLoading,
    isRefetching,
    refetch,
  } = useQuery({
    queryKey: [getAllMembers.name],
    queryFn: () => getAllMembers(),
  })

  const { mutate } = useMutation({
    mutationFn: deleteMember,
    mutationKey: [deleteMember.name],
  })

  const handleDeleteProfile = (profileId: string) => {
    mutate(profileId, {
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
          {members?.map((member) => (
            <Tr key={member.clerkId}>
              <Td>{member.clerkId}</Td>
              <Td>{`${member.first_name} ${member.last_name}`}</Td>
              <Td>{member.email_address}</Td>
              <Td>{member.status}</Td>
              <Td>
                <HStack justifyContent="center">
                  <IconButton
                    aria-label="Edit profile"
                    icon={<MdEdit size={24} />}
                    onClick={() =>
                      router.push(`/dashboard/members/${member.clerkId}`)
                    }
                  />
                  <DeleteMemberProfileModal
                    onConfirm={() => handleDeleteProfile(member.clerkId)}
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
