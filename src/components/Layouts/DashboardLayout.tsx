import { Box, useBreakpoint } from '@chakra-ui/react'
import { DashboardHeader } from 'components/Dashboard/DashboardHeader'
import { Protected } from 'components/Dashboard/Protected'
import Sidebar from 'components/Dashboard/Sidebar'
import isDev from 'utils/isDev'

type DashboardLayoutProps = React.PropsWithChildren<{
  isProtected?: boolean
}>

export default function DashboardLayout({
  children,
  isProtected = false,
}: DashboardLayoutProps) {
  const currentBreakpoint = useBreakpoint()

  return (
    <Box display="flex" flexDir={'column'}>
      <DashboardHeader />
      <Sidebar />
      <Box
        as="main"
        display="flex"
        flexDirection="column"
        flex={1}
        minH="100vh"
        marginLeft={{ md: '320px' }}
      >
        {isProtected ? <Protected>{children}</Protected> : children}
      </Box>
      {isDev() && (
        <Box
          px={2}
          bg="black"
          borderRadius="md"
          color="white"
          sx={{
            position: 'fixed',
            left: '0.5rem',
            bottom: '0.5rem',
            zIndex: 999,
          }}
        >
          <p>{currentBreakpoint}</p>
        </Box>
      )}
    </Box>
  )
}
