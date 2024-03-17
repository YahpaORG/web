import { HStack, Heading, Stack } from '@chakra-ui/react'
import Image from 'components/Image'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { DashboardDrawer } from './DashboardDrawer'

export function DashboardHeader() {
  const t = useTranslations('App')
  return (
    <Stack
      display={{ base: 'flex', md: 'none' }}
      position="sticky"
      top={0}
      h="full"
      zIndex={10}
      spacing={0}
      background="white"
      borderBottom="1px solid"
      borderColor="gray.200"
      flexDirection="row"
      justifyContent="space-between"
      px={4}
    >
      <HStack flex={1}>
        <DashboardDrawer />
      </HStack>

      <Stack
        as={Link}
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        href="/"
        flex={1}
      >
        <Image
          priority
          src={'/images/logo_wb.png'}
          alt="YAHPA logo"
          objectFit="cover"
          boxSize="60px"
        />
        <Heading
          fontSize="4xl"
          color="primary.500"
          letterSpacing={2}
          fontFamily="Helvetica"
        >
          {t('yahpa')}
        </Heading>
      </Stack>
      <Stack flex={1} />
    </Stack>
  )
}
