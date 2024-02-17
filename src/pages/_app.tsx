import { ChakraProvider } from '@chakra-ui/react'
import { enUS, frFR, viVN, zhCN } from '@clerk/localizations'
import { ClerkProvider } from '@clerk/nextjs'
import '@fontsource/lato'
import '@fontsource/source-sans-pro'
import Layout from 'components/Layout'
import emailjs from 'emailjs-com'
import { NextIntlClientProvider } from 'next-intl'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import theme from 'styles/theme'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import isDev from 'utils/isDev'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

emailjs.init(process?.env?.emailJsUserID as string)

const queryClient = new QueryClient()

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

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
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
              {isDev() && <ReactQueryDevtools initialIsOpen />}
        </QueryClientProvider>
      </NextIntlClientProvider>
    </ClerkProvider>
  )
}
