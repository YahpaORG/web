import { Box, Text } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { LoadingSpinner } from 'components/Dashboard//LoadingSpinner'
import { ErrorMessage } from 'components/Dashboard/ErrorMessage'
import DashboardLayout from 'components/Layouts/DashboardLayout'
import Page from 'components/Page'
import PageTitle from 'components/PageTitle'
import Section from 'components/Section'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { NextPageWithLayout } from 'pages/_app'
import { ReactElement } from 'react'
import { getOneMember } from 'utils/api-helpers'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      locale: context.locale,
      messages: (await import(`messages/${context.locale}.json`)).default,
    },
  }
}

const MemberPage: NextPageWithLayout = () => {
  const router = useRouter()
  const userId = router.query?.id as string | undefined
  const {
    data: member,
    error,
    isLoading,
  } = useQuery({
    enabled: !!userId,
    queryKey: [getOneMember.name, userId],
    queryFn: () => getOneMember(userId),
  })

  if (error) return <ErrorMessage />
  if (isLoading) return <LoadingSpinner />

  return (
    <Page p={0} maxW="full" h="full" display="flex" flex={1} flexDir={'column'}>
      <PageTitle title={'Profile'} />
      <Section>
        <Text>
          Hello, {member?.first_name} {member?.last_name}
        </Text>
        <Box as="pre">{JSON.stringify(member, null, 2)}</Box>
      </Section>
    </Page>
  )
}

MemberPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout isProtected>{page}</DashboardLayout>
}

export default MemberPage
