import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import MembersPanel from 'components/Dashboard/MembersPanel'
import ProfilePanel from 'components/Dashboard/ProfilePanel'
import Page from 'components/Page'
import PageTitle from 'components/PageTitle'
import Section from 'components/Section'
import { useRole } from 'hooks/useRole'
import { GetStaticPropsContext } from 'next'

export async function getStaticProps(context: GetStaticPropsContext) {
  return {
    props: {
      locale: context.locale,
      messages: (await import(`messages/${context.locale}.json`)).default,
    },
    revalidate: 60 * 60,
  }
}

export default function DashboardPage() {
  const { isAdmin } = useRole()

  return (
    <Page>
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
    </Page>
  )
}
