import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react'
import MembersPanel from 'components/Dashboard/MembersPanel'
import ProfilePanel from 'components/Dashboard/ProfilePanel'
import DashboardLayout from 'components/Layouts/DashboardLayout'
import PageTitle from 'components/PageTitle'
import Section from 'components/Section'
import { useRole } from 'hooks/useRole'
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
  const { isAdmin } = useRole()

  return (
    <Container p={0} maxW="full" h="full">
      <PageTitle title={'Dashboard'} />
      <Section>
        <Tabs defaultIndex={0}>
          <TabList>
            <Tab>My Profile</Tab>
            <Tab>Settings</Tab>
            {isAdmin && <Tab>Submissions</Tab>}
            {isAdmin && <Tab>Members</Tab>}
          </TabList>
          <TabPanels>
            <ProfilePanel />
            <TabPanel>
              <Box>My Settings</Box>
            </TabPanel>
            <TabPanel>
              <Box>All Submissions Here</Box>
            </TabPanel>
            <MembersPanel />
          </TabPanels>
        </Tabs>
      </Section>
    </Container>
  )
}

DashboardPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default DashboardPage
