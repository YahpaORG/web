import { Box } from '@chakra-ui/react'
import Sidebar from 'components/Dashboard/Sidebar'

export default function DashboardLayout({
  children,
}: React.PropsWithChildren<unknown>) {
  return (
    <Box display="flex">
      <Sidebar />
      <Box
        as="main"
        display="flex"
        flexDirection="column"
        flex={1}
        minH="100vh"
        marginLeft="320px"
      >
        {children}
      </Box>
    </Box>
  )
}
