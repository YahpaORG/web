import { StoriesParams, StoryParams, Stories } from 'storyblok-js-client'
import {
  GetPathsResult,
  LinkParams,
  LinkPath,
  PageAboutStory,
  PageContactStory,
  PageLandingCovidStory,
  PageLandingProjectsStory,
  PageLandingStory,
  PageLandingRegistryStory,
  PageProjectStory,
  RegistryMemberStory,
} from 'types/story'
import isDev from './isDev'
import { Storyblok } from './storyblokClient'

const defaultParams: Partial<StoryParams> = {
  version: isDev() ? 'draft' : 'published',
  cv: Date.now(),
}

export async function getHome(params?: StoryParams): Promise<PageLandingStory> {
  const homepageStory = await Storyblok.getStory('home', {
    ...defaultParams,
    ...params,
    resolve_relations:
      'card_event.events,list_members.members,list_sponsors.sponsors',
  })

  return homepageStory.data.story
}

export async function getAbout(params?: StoryParams): Promise<PageAboutStory> {
  const aboutPageStory = await Storyblok.getStory('about', {
    ...defaultParams,
    ...params,
    resolve_relations: 'list_members.members',
  })

  return aboutPageStory.data.story
}

export async function getProjects(params?: StoriesParams): Promise<{
  landing: PageLandingProjectsStory
  projects: PageProjectStory[]
}> {
  const { data } = await Storyblok.getStories({
    ...defaultParams,
    ...params,
    starts_with: 'projects',
    sort_by: 'content.project_date:desc',
  })

  const landing = data.stories.find(
    (story) => story.is_startpage === true
  ) as PageProjectStory

  const projects = data.stories.filter((story) => story.is_startpage === false)
  //filter landing and projects here instead

  return { landing, projects }
}

export async function getRegistry(
  params?: StoriesParams
): Promise<PageLandingRegistryStory> {
  const registryPageStory = await Storyblok.getStory('registry', {
    ...defaultParams,
    ...params,
  })

  return registryPageStory.data.story
}

export async function getCovid(
  params?: StoryParams
): Promise<PageLandingCovidStory> {
  const covidPageStory = await Storyblok.getStory('covid-19', {
    ...defaultParams,
    ...params,
  })

  return covidPageStory.data.story
}

export async function getContact(
  params?: StoryParams
): Promise<PageContactStory> {
  const covidPageStory = await Storyblok.getStory('contact', {
    ...defaultParams,
    ...params,
  })

  return covidPageStory.data.story
}

export async function getSearch(params?: StoriesParams): Promise<{
  stories: RegistryMemberStory[]
  perPage: Stories['perPage']
  totalResults: Stories['total']
}> {
  const membersStories = await Storyblok.getStories({
    ...defaultParams,
    ...params,
    per_page: 100,
    sort_by: 'content.name:asc',
  })

  const members = membersStories.data.stories.filter(
    (story) => story.is_startpage === false
  )

  return {
    stories: members,
    perPage: membersStories.perPage - 1,
    totalResults: members.length,
  }
}

// getStoriesPaths returns all possible paths by locale
// best used with a starts_with param query to limit the number of pages

export async function getStoriesPaths(params?: LinkParams, locales?: string[]) {
  const response: GetPathsResult = await Storyblok.get('cdn/links', params)
  const { links } = response.data
  const paths: LinkPath[] = []

  if (locales) {
    for (const locale of locales) {
      Object.keys(links).forEach((link_id) => {
        if (!links[link_id].is_startpage && !links[link_id].is_folder) {
          const result = {
            params: {
              slug: [locale],
              locale,
            },
          }

          paths.push(result)
        }
      })
    }
  }

  return paths
}
