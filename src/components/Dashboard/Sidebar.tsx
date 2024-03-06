import {
  Avatar,
  Box,
  Button,
  Divider,
  Heading,
  List,
  ListItem,
  Stack,
  Text,
} from '@chakra-ui/react'
import Image from 'components/Image'
import { useAuth, useClerk, useUser } from '@clerk/nextjs'
import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'
import { MdOutlineExitToApp } from 'react-icons/md'

function DashboardLink({
  children,
  ...props
}: React.PropsWithChildren<LinkProps>) {
  const router = useRouter()
  const isActiveLink = router.asPath === props.href

  return (
    <Link {...props}>
      <Text
        p={2}
        fontWeight={600}
        borderRadius="lg"
        textAlign="center"
        background={isActiveLink ? 'gray.100' : undefined}
        _hover={{ background: 'gray.200' }}
      >
        {children}
      </Text>
    </Link>
  )
}

export default function Sidebar() {
  const t = useTranslations('App')
  const { user } = useUser()
  const { signOut } = useClerk()
  console.log(user)

  return (
    <Stack
      id="sidebar"
      width="320px"
      p={4}
      borderRight="1px solid"
      borderColor="gray.300"
    >
      <Stack alignItems="center">
        <Avatar size="xl" name="My User" src={user?.imageUrl} />
        <Text>{user?.emailAddresses[0].emailAddress}</Text>
        <Text textTransform="capitalize">
          <Text as="span" fontWeight={600}>
            Role:
          </Text>{' '}
          {user?.publicMetadata.role as string}
        </Text>
      </Stack>
      <Divider my={4} />
      <Stack height="full" justifyContent="space-between">
        <Stack as="nav">
          <Stack flexDirection="column" gap={2}>
            <DashboardLink href="/dashboard">My Profile</DashboardLink>
            <DashboardLink href="/dashboard/members">Members</DashboardLink>
            <DashboardLink href="/dashboard/members">Submissions</DashboardLink>
          </Stack>
        </Stack>
        <Stack>
          <Button
            onClick={() => signOut()}
            p={2}
            rightIcon={<MdOutlineExitToApp size={18} />}
            fontWeight={600}
            borderRadius="lg"
            colorScheme="red"
          >
            Sign Out
          </Button>
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
