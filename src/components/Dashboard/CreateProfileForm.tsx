import {
  Stack,
  FormControl,
  InputGroup,
  InputLeftElement,
  Input,
  FormErrorMessage,
  Box,
  Button,
  Heading,
  Select,
  FormLabel,
  Textarea,
  Alert,
  AlertTitle,
  Icon,
  useToast,
} from '@chakra-ui/react'
import useCreateProfileMutation, {
  CreateProfileFormData,
} from 'hooks/useCreateProfileMutation'
import { useForm } from 'react-hook-form'
import { BiErrorCircle } from 'react-icons/bi'
import { BsCheck2Circle, BsPerson } from 'react-icons/bs'
import { MdOutlineEmail, MdLocalPhone } from 'react-icons/md'

export default function CreateProfileForm() {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateProfileFormData>()
  const toast = useToast()

  const createProfileMutation = useCreateProfileMutation()

  const onFormSubmit = async (formData: CreateProfileFormData) => {
    try {
      reset()
      toast({
        position: 'bottom',
        duration: 3000,
        render: () => (
          <Alert bg="green.200" borderRadius="md">
            <Stack direction="row" alignItems="center">
              <Icon as={BsCheck2Circle} w={8} h={8} />
              <AlertTitle>Profile has been successfully created!</AlertTitle>
            </Stack>
          </Alert>
        ),
      })
      createProfileMutation.mutate(formData, { onSuccess: () => reset() })
    } catch (e) {
      onError()
      console.log(e)
    }
  }

  const onError = () =>
    toast({
      title: 'An error has occured',
      position: 'bottom',
      duration: 3000,
      status: 'error',
      render: () => (
        <Alert bg="red.200" borderRadius="md">
          <Stack direction="row" alignItems="center">
            <Icon as={BiErrorCircle} w={8} h={8} />
            <AlertTitle>An error has occured</AlertTitle>
          </Stack>
        </Alert>
      ),
    })

  const OCCUPATIONS = ['Job A', 'Job B', 'Job C']

  return (
    <Box
      id="create-profile-form"
      as="form"
      padding={5}
      onSubmit={handleSubmit(onFormSubmit, onError)}
    >
      <Stack spacing={12}>
        <Stack direction="column">
          <Heading fontSize="xl">Personal Information</Heading>
          <Stack w="full" spacing={3} direction={{ base: 'column', md: 'row' }}>
            <FormControl isInvalid={!!errors.first_name}>
              <InputGroup>
                <InputLeftElement>
                  <BsPerson color="gray.800" />
                </InputLeftElement>
                <Input
                  placeholder="First name"
                  type="text"
                  size="md"
                  {...register('first_name', {
                    required: 'Please provide your first name.',
                  })}
                />
              </InputGroup>
              <FormErrorMessage>
                {errors.first_name && errors.first_name.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.last_name}>
              <InputGroup>
                <Input
                  placeholder="Last name"
                  type="text"
                  size="md"
                  {...register('last_name', {
                    required: 'Please provide your last name.',
                  })}
                />
              </InputGroup>
              <FormErrorMessage>
                {errors.last_name && errors.last_name.message}
              </FormErrorMessage>
            </FormControl>
          </Stack>
        </Stack>
        <Stack>
          <Heading fontSize="xl">Contact Information</Heading>
          <Stack w="full" spacing={3} direction={{ base: 'column', md: 'row' }}>
            <FormControl isInvalid={!!errors.email_address}>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <MdOutlineEmail color="gray.800" />
                </InputLeftElement>
                <Input
                  placeholder="Email address"
                  type="text"
                  size="md"
                  {...register('email_address', {
                    required: 'Please provide your email address.',
                  })}
                />
              </InputGroup>
              <FormErrorMessage>
                {errors.email_address && errors.email_address.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.phone_number}>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <MdLocalPhone color="gray.800" />
                </InputLeftElement>
                <Input
                  placeholder="Phone number"
                  type="text"
                  size="md"
                  {...register('phone_number', {
                    required: 'Please provide your primary phone number.',
                  })}
                />
              </InputGroup>
              <FormErrorMessage>
                {errors.phone_number && errors.phone_number.message}
              </FormErrorMessage>
            </FormControl>
          </Stack>
        </Stack>
        <Stack>
          <Heading fontSize="xl">Professional Registry</Heading>
          <FormControl isInvalid={!!errors.occupation}>
            <FormLabel>Occupation</FormLabel>
            <Select
              placeholder={'Please select your occupation '}
              defaultValue={undefined}
              {...register('occupation', {
                required: 'Please provide your professional occupation',
              })}
            >
              {OCCUPATIONS?.map((option, index) => (
                <Box as="option" key={index} value={option} p={3}>
                  {option}
                </Box>
              ))}
            </Select>
            <FormErrorMessage>
              {errors.occupation && errors.occupation.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.phone_number}>
            <FormLabel>Work Address</FormLabel>
            <Input
              placeholder="Work address"
              type="text"
              size="md"
              {...register('primary_address', {
                required: 'Please provide your primary work address.',
              })}
            />
            <FormErrorMessage>
              {errors.primary_address && errors.primary_address.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.website_address}>
            <FormLabel>Website Address</FormLabel>
            <Input
              placeholder="Website address"
              type="text"
              size="md"
              {...register('website_address')}
            />
            <FormErrorMessage>
              {errors.website_address && errors.website_address.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.languages}>
            <FormLabel>Spoken Languages</FormLabel>
            {/* TODO: maybe checkboxes? Or selectable pills? */}
            <Input
              placeholder="Languages"
              type="text"
              size="md"
              {...register('languages', {
                required: 'Please write the languages you are fluent in',
              })}
            />
            <FormErrorMessage>
              {errors.languages && errors.languages.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.about_me}>
            <FormLabel>About Me</FormLabel>
            <Textarea placeholder="Write about yourself" />
            <FormErrorMessage>
              {errors.about_me && errors.about_me.message}
            </FormErrorMessage>
          </FormControl>
        </Stack>

        <Button
          colorScheme="primary"
          isLoading={isSubmitting}
          type="submit"
          sx={{ alignSelf: 'self-start' }}
        >
          Submit
        </Button>
      </Stack>
    </Box>
  )
}
