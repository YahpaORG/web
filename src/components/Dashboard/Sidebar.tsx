import { Button, Divider, HStack, Heading, Stack } from '@chakra-ui/react'
import { useClerk } from '@clerk/nextjs'
import Image from 'components/Image'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { MdOutlineExitToApp } from 'react-icons/md'
import { DashboardLinks } from './DashboardLinks'
import { ProfileAvatar } from './ProfileAvatar'

export default function Sidebar() {
  const t = useTranslations('App')
  const { signOut } = useClerk()

  return (
    <Stack
      display={{ base: 'none', md: 'flex' }}
      position="fixed"
      left={0}
      top={0}
      width="320px"
      height="100vh"
      p={4}
      background="white"
      borderRight="1px solid"
      borderColor="gray.300"
    >
      <ProfileAvatar />
      <Divider my={4} />
      <Stack height="full" justifyContent="space-between">
        <DashboardLinks />
        <Stack>
          <HStack justifyContent="center">
            <Button
              onClick={() => signOut()}
              px={4}
              rightIcon={<MdOutlineExitToApp size={18} />}
              fontWeight={600}
              borderRadius="lg"
              colorScheme="red"
            >
              Sign Out
            </Button>
          </HStack>
          <Stack
            as={Link}
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            href="/"
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
        </Stack>
      </Stack>
    </Stack>
  )
}
