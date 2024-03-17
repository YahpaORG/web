import {
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react'
import { useClerk } from '@clerk/nextjs'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import { MdClose, MdOutlineExitToApp, MdOutlineMenu } from 'react-icons/md'
import { DashboardLinks } from './DashboardLinks'
import { ProfileAvatar } from './ProfileAvatar'

export function DashboardDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef(null)
  const { signOut } = useClerk()
  const router = useRouter()

  useEffect(() => {
    router.events.on('routeChangeComplete', onClose)
    return () => {
      router.events.off('routeChangeComplete', onClose)
    }
  }, [router, onClose])

  return (
    <>
      <IconButton
        aria-label="menu"
        icon={isOpen ? <MdClose size={24} /> : <MdOutlineMenu size={24} />}
        onClick={isOpen ? onClose : onOpen}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />

          <ProfileAvatar />
          <Divider my={4} />
          <DrawerBody>
            <DashboardLinks />
          </DrawerBody>
          <DrawerFooter justifyContent="center">
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
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
