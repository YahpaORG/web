import {
  Box,
  Button,
  Collapse,
  Flex,
  Heading,
  HStack,
  IconButton,
  Stack,
  Text,
  useDisclosure,
  useOutsideClick,
} from '@chakra-ui/react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { FiChevronLeft, FiMenu, FiUser, FiX } from 'react-icons/fi'
import Image from './Image'
import LanguagePicker from './LanguagePicker'
import Link from './Link'
import SocialMedia from './SocialMedia'
import { SignedIn, UserButton, SignedOut } from '@clerk/nextjs'

function NavLink({
  children,
  ...linkProps
}: React.ComponentProps<typeof Link>) {
  return (
    <Link
      fontSize="xl"
      fontWeight="500"
      position="relative"
      sx={{
        ':hover, :focus': {
          transition: 'all 0.2s ease-in-out',
          textDecoration: 'none',
          color: 'primary.500',
          ':after': {
            content: "''",
            display: 'block',
            position: 'absolute',
            bottom: '-0.9em',
            left: 0,
            width: '100%',
            backgroundColor: 'primary.500',
            height: 1,
          },
        },
      }}
      {...linkProps}
    >
      {children}
    </Link>
  )
}

function MenuLink({
  children,
  ...linkProps
}: React.ComponentProps<typeof Link>) {
  return (
    <NavLink
      p={3}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: 'xl',
        borderBottom: '1px solid',
        borderColor: 'gray.300',
        svg: {
          opacity: 0,
          color: 'primary.500',
        },
        ':hover, :focus': {
          backgroundColor: 'gray.200',

          svg: {
            opacity: 1,
          },
        },
      }}
      {...linkProps}
    >
      <Text>{children}</Text>
      <FiChevronLeft size={24} />
    </NavLink>
  )
}

export function Topbar() {
  const t = useTranslations('App')
  return (
    <Flex py={2} px={3} backgroundColor="gray.800">
      <Text color="white">{t('yahpa_full')}</Text>
    </Flex>
  )
}

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState<boolean>(false)
  const ref = useRef<HTMLDivElement | null>(null)
  useOutsideClick({ ref: ref, handler: onClose })
  const t = useTranslations('App')

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true)
    } else {
      setIsScrolled(false)
    }
  }
  useEffect(() => {
    router.events.on('routeChangeComplete', onClose)
    return () => {
      router.events.off('routeChangeComplete', onClose)
    }
  }, [router, onClose])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <Topbar />
      <Stack
        position="sticky"
        top={0}
        zIndex={10}
        spacing={0}
        background="white"
        h="full"
        p={{ base: 2, xl: 0 }}
        px={{ xl: 3 }}
        boxShadow={isScrolled ? 'lg' : 'none'}
        borderBottom={'1px solid'}
        borderColor={isScrolled ? 'transparent' : 'gray.200'}
        borderBottomWidth={1.5}
        ref={ref}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          h="100%"
        >
          <Link
            href="/"
            mx={3}
            _hover={{ textDecoration: 'none' }}
            display="inline-flex"
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
          </Link>
          <Box width="100%" display={{ base: 'none', xl: 'block' }}>
            <HStack as="nav" spacing={6} mx={6} justifyContent="flex-start">
              <NavLink href="/about">{t('about')}</NavLink>
              <NavLink href="/registry">{t('registry')}</NavLink>
              <NavLink href="/projects">{t('projects')}</NavLink>

              <NavLink href="/contact">{t('contact')}</NavLink>
            </HStack>
          </Box>
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            width={{ base: 'full', xl: 'auto' }}
            spacing={{ base: 3, lg: 5 }}
          >
            <SocialMedia spacing={4} display={{ base: 'none', xl: 'flex' }}>
              <SocialMedia.Facebook />
              <SocialMedia.Youtube />
              <SocialMedia.Instagram />
              <SocialMedia.WeChat />
            </SocialMedia>
            <LanguagePicker />
            <SignedIn>
              <Button as={Link} href="/dashboard">
                Dashboard
              </Button>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <Button
                display={{ base: 'none', md: 'flex' }}
                as={Link}
                href="/sign-in"
                colorScheme="primary"
                aria-label={'sign-in'}
                leftIcon={<FiUser size={18} />}
              >
                <Text>{t('sign_in')}</Text>
              </Button>
            </SignedOut>

            <IconButton
              display={{ base: 'inline-flex', xl: 'none' }}
              aria-label={isOpen ? 'close menu' : 'open menu'}
              backgroundColor="white"
              size="md"
              icon={isOpen ? <FiX size={18} /> : <FiMenu size={18} />}
              _hover={{ backgroundColor: 'gray.300' }}
              onClick={isOpen ? onClose : onOpen}
            />
          </Stack>
        </Stack>
        <Collapse in={isOpen} animateOpacity>
          <Stack as="nav" spacing={0} py={4} background="white">
            <MenuLink href="/about">{t('about')}</MenuLink>
            <MenuLink href="/registry">{t('registry')}</MenuLink>
            <MenuLink href="/projects">{t('projects')}</MenuLink>
            <MenuLink href="/contact">{t('contact')}</MenuLink>
          </Stack>
          <SignedOut>
            <Button
              as={Link}
              href="/sign-in"
              colorScheme="primary"
              aria-label={'sign-in'}
              leftIcon={<FiUser size={18} />}
            >
              <Text>{t('sign_in')}</Text>
            </Button>
          </SignedOut>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent={{ base: 'space-between', md: 'flex-start' }}
          >
            <Text px={3} fontWeight={600}>
              {t('follow_social')}
            </Text>
            <SocialMedia spacing={4}>
              <SocialMedia.Facebook />
              <SocialMedia.Youtube />
              <SocialMedia.Instagram />
              <SocialMedia.WeChat />
            </SocialMedia>
          </Stack>
        </Collapse>
      </Stack>
    </>
  )
}
