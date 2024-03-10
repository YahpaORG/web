import ErrorPanel from 'components/Dashboard/ErrorPanel'
import LoadingPanel from 'components/Dashboard/LoadingPanel'
import DashboardLayout from 'components/Layouts/DashboardLayout'
import Page from 'components/Page'
import PageTitle from 'components/PageTitle'
import Section from 'components/Section'
import { useRole } from 'hooks/useRole'
import { useUserProfileQuery } from 'hooks/useUserProfileQuery'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { NextPageWithLayout } from 'pages/_app'
import { ReactElement } from 'react'
import { Text, Box } from '@chakra-ui/react'

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
  const { isAdmin } = useRole()
  const { data: profile, isLoading, error } = useUserProfileQuery(userId)

  if (!isAdmin) router.push('/dashboard')
  if (error) return <ErrorPanel />
  if (isLoading || !isAdmin) return <LoadingPanel />

  return (
    <Page p={0} maxW="full" h="full" display="flex" flex={1} flexDir={'column'}>
      <PageTitle title={'Profile'} />
      <Section>
        <Text>
          Hello, {profile?.first_name} {profile?.last_name}
        </Text>
        <Box as="pre">{JSON.stringify(profile, null, 2)}</Box>
      </Section>
    </Page>
  )
}

MemberPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default MemberPage
