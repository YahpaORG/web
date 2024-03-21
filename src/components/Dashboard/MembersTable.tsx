import {
  Badge,
  Box,
  ButtonGroup,
  HStack,
  IconButton,
  Select,
  Skeleton,
  Stack,
  Table,
  TableContainer,
  TableRowProps,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query'
import { ErrorMessage } from 'components/Dashboard/ErrorMessage'
import { Member } from 'models/Member'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { MdChevronLeft, MdChevronRight, MdEdit } from 'react-icons/md'
import { deleteMember, getAllMembers } from 'utils/api-helpers'
import { DeleteMemberProfileModal } from './DeleteMemberProfileModal'
import { LoadingSpinner } from './LoadingSpinner'

function SkeletonRow(props: TableRowProps) {
  return (
    <Tr {...props}>
      <Td>
        <Skeleton height={4} />
      </Td>
      <Td>
        <Skeleton height={4} />
      </Td>
      <Td>
        <Skeleton height={4} />
      </Td>
      <Td>
        <Skeleton height={4} />
      </Td>
      <Td>
        <Skeleton height={4} />
      </Td>
    </Tr>
  )
}

function StatusBadge({ status }: { status: Member['status'] }) {
  const getColorScheme = () => {
    switch (status) {
      case 'active':
        return 'green'
      case 'pending':
        return 'yellow'
      case 'rejected':
        return 'red'
      default:
        return ''
    }
  }

  return <Badge colorScheme={getColorScheme()}>{status}</Badge>
}

export function MembersTable() {
  const router = useRouter()
  const [page, setPage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(10)
  const skip = (page - 1) * limit

  const { data, error, isLoading, isRefetching, refetch, isFetching } =
    useQuery({
      queryKey: [getAllMembers.name, limit, page],
      queryFn: () =>
        getAllMembers({
          limit,
          page,
        }),
      placeholderData: keepPreviousData,
      staleTime: 5000,
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

  if (error) return <ErrorMessage />
  if (isLoading) return <LoadingSpinner />

  const LoadingSkeleton = () =>
    pagesArray(limit).map((i) => <SkeletonRow key={i} />)

  const LIMIT_OPTIONS = [10, 25, 50]

  return (
    <Stack gap={4}>
      <HStack justifyContent="flex-end">
        <Text>Per Page</Text>
        <Select
          width="auto"
          defaultValue={limit}
          onChange={(event) => setLimit(parseInt(event.currentTarget.value))}
        >
          {LIMIT_OPTIONS.map((option) => (
            <Box key={`limit-${option}`} as="option" value={option}>
              {option}
            </Box>
          ))}
        </Select>
      </HStack>
      <TableContainer>
        <Table variant="simple" size="lg">
          <Thead>
            <Tr>
              <Th>
                <HStack>Name</HStack>
              </Th>
              <Th>Email Address</Th>
              <Th>Status</Th>
              <Th textAlign="center">Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {isFetching || isRefetching ? (
              <LoadingSkeleton />
            ) : (
              data?.members?.map((member) => (
                <Tr key={member.clerkId}>
                  <Td>{`${member.first_name} ${member.last_name}`}</Td>
                  <Td>{member.email_address}</Td>
                  <Td>
                    <StatusBadge status={member.status} />
                  </Td>
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
              ))
            )}
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
          <IconButton
            aria-label="Previous page"
            isDisabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            icon={<MdChevronLeft size={28} />}
          />
          <Select
            value={page}
            w="auto"
            onChange={(event) => setPage(parseInt(event.currentTarget.value))}
          >
            {pagesArray(data?.totalPages).map((page) => (
              <Box key={page} as="option" value={page}>
                {page}
              </Box>
            ))}
          </Select>
          <IconButton
            aria-label="Next page"
            isDisabled={page === data?.totalPages}
            onClick={() => setPage((p) => p + 1)}
            icon={<MdChevronRight size={28} />}
          />
        </ButtonGroup>

        <Text>
          Showing {Math.min(skip + limit, data?.totalCount ?? 0)} -{' '}
          {data?.totalCount ?? 0}
        </Text>
      </Stack>
    </Stack>
  )
}
