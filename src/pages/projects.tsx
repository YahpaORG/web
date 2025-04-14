import { Box, Flex, Stack, Text } from '@chakra-ui/react'
import Timeline from 'components/About/Timeline'
import Image from 'components/Image'
import Page from 'components/Page'
import PageTitle from 'components/PageTitle'
import Section from 'components/Section'
import SEO from 'components/SEO'
import { GetStaticPropsContext } from 'next'
import { useTranslations } from 'next-intl'
import { getProjects } from 'utils/api'

export async function getStaticProps(context: GetStaticPropsContext) {
  const { projects } = await getProjects({ language: context.locale })

  return {
    props: {
      projects,
      locale: context.locale,
      messages: (await import(`messages/${context.locale}.json`)).default,
    },
  }
}

export default function Projects() {
  const t = useTranslations()

  return (
    <Page>
      <SEO
        title={t('Projects.seo_title')}
        description={t('Projects.seo_description')}
      />
      <PageTitle
        title={t('Projects.page_title')}
        translatedTitle={t('Projects.page_slug')}
      />
      <Section paddingBottom={0}>
        <Stack
          justify="center"
          alignItems="center"
          direction={{ base: 'column' }}
          spacing={8}
        >
          <Box width={{ base: 'full', lg: '50%' }}>
            <Image
              borderRadius="lg"
              boxShadow="md"
              ratio={16 / 9}
              priority
              src={'/images/image2.jpg'}
              alt={''}
            />
          </Box>
          <Flex
            flex={1}
            bg="white"
            p={4}
            borderRadius="lg"
            h="min-content"
            maxWidth="2xl"
          >
            <Text fontSize={{ base: 'md', xl: 'lg' }} mb={6}>
              {t('Projects.page_description')}
            </Text>
          </Flex>
        </Stack>
      </Section>
      <Section paddingTop={0}>
        <Timeline />
      </Section>
    </Page>
  )
}
