import { TabPanel, Center, Spinner } from '@chakra-ui/react'

export default function LoadingPanel() {
  return (
    <TabPanel>
      <Center p={12}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="primary.400"
          size="xl"
        />
      </Center>
    </TabPanel>
  )
}
