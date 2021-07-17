import {
  useColorMode,
  Box,
  Container,
  Heading,
  Stack,
  HStack,
} from "@chakra-ui/react"
import Head from "next/head"
import Account from "components/web3Connection/Account"
import ColorModeSwitch from "./common/ColorModeSwitch"

type Props = {
  title: string
  theme?: boolean
  children: JSX.Element
}

const Layout = ({ title, theme = false, children }: Props): JSX.Element => {
  const { colorMode } = useColorMode()

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <Box
        bgColor={
          colorMode === "light" ? "gray.100" : "var(--chakra-colors-gray-800)"
        }
        bgGradient={
          theme
            ? `linear(${
                colorMode === "light" ? "white" : "var(--chakra-colors-gray-800)"
              } 0px, var(--chakra-colors-primary-50) 700px)`
            : `linear(${
                colorMode === "light" ? "white" : "var(--chakra-colors-gray-800)"
              } 0px, ${
                colorMode === "light"
                  ? "var(--chakra-colors-gray-100)"
                  : "var(--chakra-colors-gray-900)"
              } 700px)`
        }
        bgBlendMode={colorMode === "light" ? "normal" : theme && "color"}
        minHeight="100vh"
      >
        <Container
          maxW="container.lg"
          py={{ base: 4, md: 12, lg: 24 }}
          px={{ base: 4, sm: 6, md: 8, lg: 10 }}
        >
          <Stack
            direction={{ base: "column-reverse", md: "row" }}
            spacing={8}
            justify="space-between"
            pb={{ base: 8, md: 16 }}
          >
            <Heading
              fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
              fontFamily="display"
              color={colorMode === "light" ? "gray.800" : "white"}
            >
              {title}
            </Heading>
            <HStack justify="flex-end">
              <ColorModeSwitch />
              <Account />
            </HStack>
          </Stack>
          {children}
        </Container>
      </Box>
    </>
  )
}

export default Layout
