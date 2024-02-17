import { Center, Heading, Stack, TabPanel } from '@chakra-ui/react'

export default function ErrorPanel() {
  return (
    <TabPanel>
      <Center p={12}>
        <Stack alignItems="center">
          <Heading fontSize="2xl">Looks like there is an error</Heading>
        </Stack>
      </Center>
    </TabPanel>
  )
}
