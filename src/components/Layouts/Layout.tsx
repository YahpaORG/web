import { Box, Flex, useBreakpoint } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import isDev from 'utils/isDev'
import Footer from '../Footer'
import Header from '../Header'
import { useState, useEffect } from 'react'

export default function Layout({
  children,
}: React.PropsWithChildren<Record<never, never>>) {
  const currentBreakpoint = useBreakpoint()
  const router = useRouter()

  const [isSSR, setIsSSR] = useState(true)

  useEffect(() => {
    setIsSSR(false)
  }, [])

  return (
    <Flex
      sx={{
        flexDirection: 'column',
        minHeight: '100vh',
        display: 'flex',
        //Arial is the most well read font for Vietnamese characters
        fontFamily: router.locale === 'vi' ? 'Arial' : undefined,
      }}
    >
      <Header />
      <Flex
        as="main"
        sx={{
          flex: 1,
          minWidth: 0,
        }}
      >
        {children}
      </Flex>
      <Footer />
      {isDev() && !isSSR && (
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
    </Flex>
  )
}
