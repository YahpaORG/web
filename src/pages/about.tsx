import AboutUsHero from 'components/About/AboutUsHero'
import GoalsList from 'components/About/GoalsList'
import Leadership from 'components/About/Leadership'
import Page from 'components/Page'
import SEO from 'components/SEO'
import { GetStaticPropsContext } from 'next'
import { useTranslations } from 'next-intl'

export async function getStaticProps(context: GetStaticPropsContext) {
  return {
    props: {
      locale: context.locale,
      messages: (await import(`messages/${context.locale}.json`)).default,
    },
    revalidate: 60 * 60,
  }
}

export default function About() {
  const t = useTranslations()

  return (
    <Page backgroundColor="white">
      <SEO
        title={t('About.seo_title')}
        description={t('About.seo_description')}
      />
      <AboutUsHero />
      <Leadership />
      <GoalsList />
    </Page>
  )
}
