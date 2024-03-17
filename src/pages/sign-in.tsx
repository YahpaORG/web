import { Heading, Stack, VStack } from '@chakra-ui/react'
import { SignIn } from '@clerk/nextjs'
import Page from 'components/Page'
import Section from 'components/Section'
import { GetStaticPropsContext } from 'next'
import { useTranslations } from 'next-intl'

export async function getStaticProps(context: GetStaticPropsContext) {
  return {
    props: {
      locale: context.locale,
      messages: (await import(`messages/${context.locale}.json`)).default,
    },
  }
}

export default function SignInPage() {
  const t = useTranslations('SignIn')

  return (
    <Page>
      <Section height={'100%'}>
        <Stack
          direction={{ base: 'column', md: 'row-reverse' }}
          align="center"
          flex={1}
        >
          <VStack flex={1} py={4} textAlign="center">
            <Heading textAlign="center">{t('title')}</Heading>
            <Heading as="h3" fontSize={'2xl'} fontWeight={400}>
              {t('subtitle')}
            </Heading>
          </VStack>

          <SignIn
            path={'/sign-in'}
            routing="hash"
            signUpUrl="/sign-up"
            afterSignInUrl="/dashboard"
          />
        </Stack>
      </Section>
    </Page>
  )
}
