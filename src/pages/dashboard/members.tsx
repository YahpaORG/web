import ProfilesList from 'components/Dashboard/ProfilesList'
import DashboardLayout from 'components/Layouts/DashboardLayout'
import Page from 'components/Page'
import PageTitle from 'components/PageTitle'
import Section from 'components/Section'
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

const MembersPage: NextPageWithLayout = () => {
  return (
    <Page p={0} maxW="full" h="full" display="flex" flex={1} flexDir={'column'}>
      <PageTitle title={'Members Registry'} />
      <Section>
        <ProfilesList />
      </Section>
    </Page>
  )
}

MembersPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default MembersPage
