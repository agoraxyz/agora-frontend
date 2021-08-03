import {
  ButtonGroup,
  Divider,
  HStack,
  Text,
  useColorMode,
  useDisclosure,
  VStack,
} from "@chakra-ui/react"
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core"
import { useCommunity } from "components/community/Context"
import { Web3Connection } from "components/web3Connection/Web3ConnectionManager"
import { Chains } from "connectors"
import { LinkBreak, SignIn } from "phosphor-react"
import { useContext } from "react"
import shortenHex from "utils/shortenHex"
import AccountModal from "../AccountModal"
import Identicon from "../components/Identicon"
import AccountButton from "./components/AccountButton"
import AccountCard from "./components/AccountCard"
import Balance from "./components/Balance"
import NetworkChangeModal from "./components/NetworkChangeModal"
import useENSName from "./hooks/useENSName"

const Account = (): JSX.Element => {
  const communityData = useCommunity()
  const { error, account, chainId } = useWeb3React()
  const { openModal, triedEager } = useContext(Web3Connection)
  const ENSName = useENSName(account)
  const {
    isOpen: isAccountModalOpen,
    onOpen: onAccountModalOpen,
    onClose: onAccountModalClose,
  } = useDisclosure()
  const {
    isOpen: isNetworkChangeModalOpen,
    onOpen: onNetworkChangeModalOpen,
    onClose: onNetworkChangeModalClose,
  } = useDisclosure()
  const { colorMode } = useColorMode()

  if (typeof window === "undefined") {
    return (
      <AccountCard>
        <AccountButton isLoading>Connect to a wallet</AccountButton>
      </AccountCard>
    )
  }

  if (
    error instanceof UnsupportedChainIdError ||
    (typeof chainId === "number" &&
      !!communityData &&
      chainId !== Chains[communityData.chainData.name.toLowerCase()])
  ) {
    return (
      <AccountCard>
        <AccountButton
          leftIcon={<LinkBreak />}
          colorScheme="red"
          onClick={onNetworkChangeModalOpen}
        >
          Wrong Network
        </AccountButton>
        <NetworkChangeModal
          isOpen={isNetworkChangeModalOpen}
          onClose={onNetworkChangeModalClose}
        />
      </AccountCard>
    )
  }
  if (typeof account !== "string") {
    return (
      <AccountCard>
        <AccountButton
          leftIcon={<SignIn />}
          isLoading={!triedEager}
          onClick={openModal}
        >
          Connect to a wallet
        </AccountButton>
      </AccountCard>
    )
  }
  return (
    <AccountCard>
      <ButtonGroup isAttached variant="ghost" alignItems="center">
        <AccountButton onClick={onNetworkChangeModalOpen}>
          {Chains[chainId].charAt(0).toUpperCase() + Chains[chainId].slice(1)}
        </AccountButton>
        <Divider
          orientation="vertical"
          /**
           * Space 11 is added to the theme by us and Chakra doesn't recognize it
           * just by "11" for some reason
           */
          h={{ base: 14, md: "var(--chakra-space-11)" }}
        />
        <AccountButton onClick={onAccountModalOpen}>
          <HStack>
            <VStack spacing={0} alignItems="flex-end">
              {!!communityData && <Balance token={communityData.chainData.token} />}
              <Text
                as="span"
                fontSize={communityData ? "xs" : "md"}
                fontWeight={communityData ? "medium" : "semibold"}
                color={
                  !!communityData &&
                  (colorMode === "light" ? "gray.600" : "gray.400")
                }
              >
                {ENSName || `${shortenHex(account, 3)}`}
              </Text>
            </VStack>
            <Identicon address={account} size={28} />
          </HStack>
        </AccountButton>
      </ButtonGroup>

      <AccountModal isOpen={isAccountModalOpen} onClose={onAccountModalClose} />
      <NetworkChangeModal
        isOpen={isNetworkChangeModalOpen}
        onClose={onNetworkChangeModalClose}
      />
    </AccountCard>
  )
}

export default Account
