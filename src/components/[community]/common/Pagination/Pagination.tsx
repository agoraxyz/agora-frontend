import { Box, HStack, Tooltip, useColorMode } from "@chakra-ui/react"
import { PropsWithChildren, useEffect, useRef, useState } from "react"
import PageButton from "./components/PageButton"

type PaginationProps = {
  isRegister?: boolean
}

const Pagination = ({
  isRegister = false,
  children,
}: PropsWithChildren<PaginationProps>): JSX.Element => {
  const paginationRef = useRef()
  const [isSticky, setIsSticky] = useState(false)
  const { colorMode } = useColorMode()

  useEffect(() => {
    const handleScroll = () => {
      const current = paginationRef.current || null
      const rect = current?.getBoundingClientRect()

      // When the Pagination component becomes "sticky"...
      setIsSticky(rect?.top === 0)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <HStack
      ref={paginationRef}
      position="sticky"
      top={0}
      py={isSticky ? 2 : 0}
      height={isSticky ? 16 : 12}
      zIndex={isSticky ? "banner" : "auto"}
      _before={{
        content: `""`,
        position: "fixed",
        top: 0,
        left: 0,
        width: "full",
        height: 16,
        bgColor: colorMode === "light" ? "white" : "gray.800",
        boxShadow: "md",
        transition: "0.2s ease",
        visibility: isSticky ? "visible" : "hidden",
        opacity: isSticky ? 1 : 0,
      }}
    >
      <PageButton href={isRegister ? "register" : "info"}>Info</PageButton>

      <Tooltip
        label="You have to save general info of your token first"
        placement="bottom"
        isDisabled={!isRegister}
      >
        <Box>
          <PageButton href="community" disabled={isRegister}>
            Community
          </PageButton>
        </Box>
      </Tooltip>

      {/* <LinkButton href="twitter-bounty" disabled>
        Twitter bounty
      </LinkButton> */}

      <HStack spacing={3} marginInlineStart="auto!important">
        {children}
      </HStack>
    </HStack>
  )
}

export default Pagination
