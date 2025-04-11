import { Box, Container, Divider, Heading, Stack, Text } from '@chakra-ui/react'
import Image from 'components/Image'
import Link from 'components/Link'
import { useTranslations } from 'next-intl'
import React from 'react'

type TimelineYearProps = React.PropsWithChildren<{
  year?: string
}>

function TimelineYear({ children, year }: TimelineYearProps) {
  return (
    <Stack flexDirection="row">
      <Heading textAlign="center" fontSize="5xl" pr={4}>
        {year}
      </Heading>
      <Stack gap={0}>{children}</Stack>
    </Stack>
  )
}

type TimelineItemProps = React.PropsWithChildren<{
  month?: string
  description?: string
  imageSrc?: string
}>

function TimelineItem({
  month,
  description,
  imageSrc,
  children,
}: TimelineItemProps) {
  return (
    <Stack
      minHeight="150px"
      borderLeft="2px solid"
      borderColor="primary.600"
      _first={{
        paddingTop: '16px',
      }}
    >
      <Box width={{ base: '250px', md: '500px' }}>
        <Stack px={5} pb={12} position="relative">
          <Heading fontSize="2xl">
            <Box
              w={3}
              h={3}
              borderRadius="full"
              backgroundColor="primary.600"
              position="absolute"
              top="9px"
              left={'-7px'}
            />
            {month}
          </Heading>
          <Text>{description}</Text>
          {imageSrc && (
            <Image
              alt=""
              src={imageSrc}
              width={{ base: '200px', sm: '280px', md: '480px' }}
              height={'full'}
              borderRadius="md"
            />
          )}
          {children}
        </Stack>
      </Box>
    </Stack>
  )
}

export default function Timeline() {
  const t = useTranslations('About')
  return (
    <Container maxW="6xl" px={0} pb={{ base: '20vh', md: 12 }}>
      <Stack alignItems="center" pb={12} mx={4}>
        <Heading fontSize="5xl">{t('history_title')}</Heading>
        <Divider
          width="5%"
          borderWidth="2px"
          borderColor="primary.500"
          my={1}
        />
        <Text textAlign="center">{t('history_description')}</Text>
      </Stack>
      <Stack alignItems="center" gap={0}>
        <TimelineYear year={'2024'}>
          <TimelineItem month={t('timeline.months.nov')}>
            <Stack gap={12}>
              <Box>
                <Heading as="h3" fontSize="xl" fontWeight="bold" mb={2}>
                  {t('timeline.2024.nov.round_table.title')}
                </Heading>
                <Text mb={4}>
                  {t('timeline.2024.nov.round_table.description')}
                </Text>
                <Image
                  alt=""
                  ratio={2 / 3}
                  src="/images/timeline/2024_11_mental_health_round_table.png"
                  width={{ base: '200px', sm: '280px', md: '320px' }}
                  height={{ base: '480px' }}
                  borderRadius="md"
                />
              </Box>
              <Box>
                <Heading as="h3" fontSize="xl" fontWeight="bold" mb={2}>
                  {t('timeline.2024.nov.walk.title')}
                </Heading>
                <Text mb={4}>{t('timeline.2024.nov.walk.description')}</Text>
                <Image
                  alt=""
                  ratio={2 / 3}
                  src="/images/timeline/2024_11_fall_walk.jpg"
                  width={{ md: 'full' }}
                  height={{ base: '200px' }}
                  borderRadius="md"
                />
              </Box>
            </Stack>
          </TimelineItem>
          <TimelineItem month={t('timeline.months.jul')}>
            <Box>
              <Heading as="h3" fontSize="xl" fontWeight="bold" mb={2}>
                {t('timeline.2024.jul.table_tennis.title')}
              </Heading>
              <Text mb={4}>
                {t('timeline.2024.jul.table_tennis.description')}
              </Text>
              <Image
                alt=""
                src="/images/timeline/2024_07_table_tennis.png"
                width={{ base: '200px', sm: '280px', md: '320px' }}
                height={{ base: '320px' }}
                borderRadius="md"
              />
            </Box>
          </TimelineItem>
          <TimelineItem month={t('timeline.months.jun')}>
            <Text mb={4}>{t('timeline.2024.jun.description')}</Text>
            <Link href="https://docs.google.com/forms/d/e/1FAIpQLScRPo38ohAm1LyRTKR5tSiShGksS65SpkyI79U_J-b0c4K2SA/viewform?pli=1">
              {t('timeline.2024.jun.link')}
            </Link>
          </TimelineItem>
          <TimelineItem month={t('timeline.months.feb')}>
            <Text mb={4}>{t('timeline.2024.feb.description')}</Text>
            <Link href="https://drive.google.com/file/d/12F6UQFCY3eM3MheOMg0WfYI7qr6XYfOD/view?usp=sharing">
              {t('timeline.2024.feb.link')}
            </Link>
            <Text fontStyle="italic" fontSize="sm">
              {t('timeline.2024.feb.disclaimer')}
            </Text>
          </TimelineItem>
        </TimelineYear>
        <TimelineYear year={'2023'}>
          <TimelineItem
            month={t('timeline.months.oct')}
            description={t('timeline.2023.oct')}
            imageSrc="/images/timeline/2023_10_sip_share_connect.jpg"
          />
          <TimelineItem
            month={t('timeline.months.jan')}
            description={t('timeline.2023.jan')}
          />
        </TimelineYear>
        <TimelineYear year={'2022'}>
          <TimelineItem
            month={t('timeline.months.dec')}
            description={t('timeline.2022.dec')}
          />
          <TimelineItem
            month={t('timeline.months.nov')}
            description={t('timeline.2022.nov')}
          />

          <TimelineItem
            month={t('timeline.months.oct')}
            description={t('timeline.2022.oct')}
          />
          <TimelineItem
            month={t('timeline.months.aug')}
            description={t('timeline.2022.aug')}
            imageSrc="/images/timeline/2022_08_bbtc.jpg"
          />
        </TimelineYear>
        <TimelineYear year={'2021'}>
          <TimelineItem
            month={t('timeline.months.oct')}
            description={t('timeline.2021.oct')}
          />
          <TimelineItem
            month={t('timeline.months.aug')}
            description={t('timeline.2021.aug')}
          />
          <TimelineItem
            month={t('timeline.months.jun')}
            description={t('timeline.2021.jun')}
            imageSrc="/images/team.jpeg"
          />
          <TimelineItem
            month={t('timeline.months.may')}
            description={t('timeline.2021.may')}
          />
        </TimelineYear>
        <TimelineYear year={'2020'}>
          <TimelineItem
            month={t('timeline.months.dec')}
            description={t('timeline.2020.dec')}
          />
          <TimelineItem
            month={t('timeline.months.nov')}
            description={t('timeline.2020.nov')}
          />
          <TimelineItem
            month={t('timeline.months.jun')}
            description={t('timeline.2020.jun')}
          />
        </TimelineYear>
        <TimelineYear year={'2019'}>
          <TimelineItem
            month={t('timeline.months.dec')}
            description={t('timeline.2019.dec')}
          />
        </TimelineYear>
      </Stack>
    </Container>
  )
}
