import { Box } from '@chakra-ui/react'
import { Protected } from 'components/Dashboard/Protected'
import Sidebar from 'components/Dashboard/Sidebar'

type DashboardLayoutProps = React.PropsWithChildren<{
  isProtected?: boolean
}>

export default function DashboardLayout({
  children,
  isProtected = false,
}: DashboardLayoutProps) {
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
        {isProtected ? <Protected>{children}</Protected> : children}
      </Box>
    </Box>
  )
}
