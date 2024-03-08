import { Container } from '@chakra-ui/react'
import ProfilePanel from 'components/Dashboard/ProfilePanel'
import DashboardLayout from 'components/Layouts/DashboardLayout'
import PageTitle from 'components/PageTitle'
import { GetStaticPropsContext } from 'next'
import { NextPageWithLayout } from 'pages/_app'
import { ReactElement } from 'react'

export async function getStaticProps(context: GetStaticPropsContext) {
  return {
    props: {
      locale: context.locale,
      messages: (await import(`messages/${context.locale}.json`)).default,
    },
    revalidate: 60 * 60,
  }
}

const DashboardPage: NextPageWithLayout = () => {
  return (
    <Container
      p={0}
      maxW="full"
      h="full"
      display="flex"
      flex={1}
      flexDir={'column'}
    >
      <PageTitle title={'Dashboard'} />
      <ProfilePanel />
    </Container>
  )
}

DashboardPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default DashboardPage
