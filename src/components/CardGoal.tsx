import { Box, Flex, Tag, Text } from "@chakra-ui/react";
import useTranslation from "hooks/useTranslation";
import type { Option } from "types/story";
import Image from "./Image";
import Link from "./Link";

export default function CardGoal(props: Option) {
  const { t } = useTranslation();

  return (
    <Box
      position="relative"
      overflow="hidden"
      _hover={{
        img: {
          transform: "scale(1.1)",
          transition: "transform 0.3s ease-in-out",
        },
      }}
    >
      <Image
        src={props.image?.filename ?? ""}
        alt={props.image?.name}
        bg="white"
        borderRadius="md"
        boxShadow="lg"
        h="40vh"
      />
      <Flex
        position="absolute"
        top={0}
        left={0}
        bottom={0}
        right={0}
        zIndex={1}
        flexDirection="column"
        height="full"
        justifyContent="space-between"
        p={4}
      >
        {props.title && (
          <Text
            fontWeight={700}
            lineHeight={2}
            color="black"
            bg="white"
            width="fit-content"
            px={2}
            borderRadius="md"
            fontSize={{ base: "xl" }}
          >
            {props.title}
          </Text>
        )}
        <Flex justifyContent="flex-end">
          {props.link?.url ? (
            <Link
              href={props.link?.url}
              px={3}
              py={2}
              borderRadius="md"
              fontWeight={600}
              bg="white"
              color="black"
              _hover={{ bg: "gray.100" }}
            >
              {props.call_to_action}
            </Link>
          ) : (
            <Tag size="lg" colorScheme="red">
              {t("coming_soon")}
            </Tag>
          )}
        </Flex>
      </Flex>
    </Box>
  );
}
