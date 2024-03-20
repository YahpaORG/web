import { useStoryblokState } from '@storyblok/react'
import Hero from 'components/Home/Hero'
import News from 'components/Home/News'
import Registry from 'components/Home/Registry'
import Resources from 'components/Home/Resources'
import Page from 'components/Page'
import SEO from 'components/SEO'
import {
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next'
import { useTranslations } from 'next-intl'
import { getStoriesPaths } from 'utils/api'
import { getHomeV2 } from 'utils/sbApi'

export async function getStaticProps(context: GetStaticPropsContext) {
  const story = await getHomeV2({
    language: context.locale,
  })

  //because of [[...slug]] its hard to catch 404s i.e. /fr/this-is-not-real
  if (context?.params?.slug) {
    return {
      props: {},
      notFound: true,
    }
  }

  return {
    props: {
      story,
      locale: context.locale,
      messages: (await import(`messages/${context.locale}.json`)).default,
    },
    revalidate: 60 * 60,
  }
}

export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  const paths = await getStoriesPaths({ starts_with: 'home' }, locales)
  return {
    paths,
    fallback: 'blocking',
  }
}

export default function HomePage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const t = useTranslations('Home')
  const story = useStoryblokState(props?.story)

  return (
    <>
      <SEO title={t('seo_title')} description={t('seo_description')} />
      <Page>
        <Hero />
        <Registry />
        {/* TODO: eventually replace news content with Facebook/Instagram */}
        <News events={story.content.event_latest?.[0].events} />
        <Resources />
      </Page>
    </>
  )
}
