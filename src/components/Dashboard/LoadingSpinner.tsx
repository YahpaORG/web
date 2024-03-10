import { Center, Spinner } from '@chakra-ui/react'

export function LoadingSpinner() {
  return (
    <Center flex={1}>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="primary.400"
        size="xl"
      />
    </Center>
  )
}
