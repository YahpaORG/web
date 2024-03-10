import {
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import { MdDeleteForever } from 'react-icons/md'

type DeleteProfileModalButtonProps = {
  onConfirm: () => void
}

export function DeleteMemberProfileModal({
  onConfirm,
}: DeleteProfileModalButtonProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <IconButton
        colorScheme="red"
        onClick={onOpen}
        aria-label="Delete profile"
        icon={<MdDeleteForever size={24} />}
      />

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
        <ModalContent>
          <ModalHeader>Confirm Deleting Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure about this? This will permanently remove this profile
            from the registry.
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => {
                onConfirm()
                onClose()
              }}
            >
              Delete
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
