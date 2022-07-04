import {
  AspectRatio,
  Box,
  Container,
  Flex,
  Image,
  Link as ChakraLink,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import useTranslation, { Resource } from "hooks/useTranslation";
import SocialMedia from "./SocialMedia";
import Link from "./Link";

function ListHeader({ children }: React.PropsWithChildren<{}>) {
  return (
    <Text fontWeight={"700"} fontSize={"lg"} fontStyle="bold" mb={2}>
      {children}
    </Text>
  );
}

export default function Footer() {
  const { t, languages, locales } = useTranslation();

  return (
    <Box bg="gray.700" color="whiteAlpha.800" pt={10}>
      <Container as={Stack} maxW={"6xl"}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          <Stack align={"flex-start"}>
            <ListHeader>{t("organization")}</ListHeader>
            <Link href="/about">{t("about")}</Link>
            <Link href="/projects">{t("projects")}</Link>
            <Link href="/covid-19">COVID-19</Link>

            {/*
            <Link href="/contribute">{t("contribute")}</Link> */}
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>{t("languages")}</ListHeader>
            {locales?.map((language) => (
              <ChakraLink
                key={language}
                href={`/${language}`}
                lang={language}
                hrefLang={language}
              >
                {languages[language as Resource]}
              </ChakraLink>
            ))}
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>{t("support")}</ListHeader>
            <Stack direction={"row"} align={"center"} spacing={2}>
              <Link href="/contact">{t("contact")}</Link>
            </Stack>
          </Stack>
        </SimpleGrid>
      </Container>
      <Container maxW={"6xl"} mt={4} py={4}>
        <Stack
          direction={{ base: "column-reverse", md: "row" }}
          alignItems="center"
          justifyContent={{ base: "center", md: "flex-start" }}
        >
          <Stack
            alignItems={{ base: "center", lg: "flex-start" }}
            mt={5}
            spacing={0}
          >
            <Text fontWeight={600}>{t("follow_social")}</Text>
            <SocialMedia px={0} spacing={4}>
              <SocialMedia.Facebook />
              <SocialMedia.Youtube />
              <SocialMedia.Instagram />
              <SocialMedia.WeChat />
            </SocialMedia>
          </Stack>
          <Flex
            width="100%"
            justifyContent={{ base: "center", md: "flex-end" }}
          >
            YAHPA © 2021
          </Flex>
          <AspectRatio maxW="200px" width="full" ratio={4 / 3}>
            <Image
              src="/images/logo_wb.png"
              alt="YAHPA full logo"
              objectFit="cover"
            />
          </AspectRatio>
          <AspectRatio maxW="250px"  width="full" ratio={212 / 44}  >
            <Link href="https://vercel.com/home?utm_source=next-site&utm_medium=footer&utm_campaign=next-website" hideIcon >
            <Image
              src="/images/vercel_logo.svg"
              alt="vercel logo"
              objectFit="cover"
              />
            </Link>
          </AspectRatio>
        </Stack>
      </Container>
    </Box>
  );
}
