import { ChakraProvider } from '@chakra-ui/react'
import { enUS, frFR, viVN, zhCN } from '@clerk/localizations'
import { ClerkProvider } from '@clerk/nextjs'
import '@fontsource/lato'
import '@fontsource/source-sans-pro'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Layout from 'components/Layout'
import emailjs from 'emailjs-com'
import { NextPage } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { ReactElement, ReactNode } from 'react'
import theme from 'styles/theme'
import isDev from 'utils/isDev'

emailjs.init(process?.env?.emailJsUserID as string)

const queryClient = new QueryClient()

export type NextPageWithLayout<P = NonNullable<unknown>, IP = P> = NextPage<
  P,
  IP
> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter()

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>)

  const configureClerkLocalization = () => {
    switch (router.locale) {
      case 'fr': {
        return frFR
      }
      case 'zh': {
        return zhCN
      }
      case 'vi': {
        return viVN
      }
      default:
        return enUS
    }
  }

  return (
    <ClerkProvider localization={configureClerkLocalization()} {...pageProps}>
      <NextIntlClientProvider
        locale={router.locale}
        messages={pageProps.messages}
      >
        <QueryClientProvider client={queryClient}>
          <ChakraProvider theme={theme}>
            {getLayout(<Component {...pageProps} />)}
            {isDev() && <ReactQueryDevtools initialIsOpen />}
          </ChakraProvider>
        </QueryClientProvider>
      </NextIntlClientProvider>
    </ClerkProvider>
  )
}
