import {
  Box,
  Button,
  ButtonGroup,
  HStack,
  IconButton,
  Select,
  Stack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { LoadingSpinner } from 'components/Dashboard//LoadingSpinner'
import { ErrorMessage } from 'components/Dashboard/ErrorMessage'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { MdEdit } from 'react-icons/md'
import { deleteMember, getAllMembers } from 'utils/api-helpers'
import { DeleteMemberProfileModal } from './DeleteMemberProfileModal'

export function MembersTable() {
  const router = useRouter()
  const [page, setPage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(10)
  const [skip, setSkip] = useState<number>(0)
  const { data, error, isLoading, isRefetching, refetch } = useQuery({
    queryKey: [getAllMembers.name, limit, page],
    queryFn: () => getAllMembers({ limit, page }),
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

  const pagesArray = (totalPages?: number) => {
    return Array.from({ length: totalPages ?? 1 }, (_, index) => index + 1)
  }

  useEffect(() => {
    if (data) {
      console.log(data)
      setSkip(data?.skip)
    }
  }, [data])

  if (error) return <ErrorMessage />
  if (isLoading || isRefetching) return <LoadingSpinner />

  return (
    <Stack>
      <HStack justifyContent="flex-end">
        <Text>Per Page</Text>
        <Select
          width="auto"
          defaultValue={limit}
          onChange={(event) => setLimit(parseInt(event.currentTarget.value))}
        >
          <Box as="option">10</Box>
          <Box as="option">25</Box>
          <Box as="option">50</Box>
        </Select>
      </HStack>
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
            {data?.members?.map((member) => (
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
      <Stack
        flexDirection={{ base: 'column', xl: 'row' }}
        alignItems={{ base: 'center' }}
        justifyContent={{ xl: 'space-between' }}
        gap={4}
      >
        <ButtonGroup>
          <Button isDisabled={page === 1} onClick={() => setPage((p) => p - 1)}>
            Previous
          </Button>
          <Select
            defaultValue={page}
            w="auto"
            onChange={(event) => setPage(parseInt(event.currentTarget.value))}
          >
            {pagesArray(data?.totalPages).map((page) => (
              <Box key={page} as="option">
                {page}
              </Box>
            ))}
          </Select>
          <Button
            isDisabled={page === data?.totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </ButtonGroup>
        <Text>
          Showing {Math.min(skip + limit, data?.totalCount ?? 0)} -{' '}
          {data?.totalCount}
        </Text>
      </Stack>
    </Stack>
  )
}
