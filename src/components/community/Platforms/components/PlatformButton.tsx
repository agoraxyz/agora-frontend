import { Button, useDisclosure } from "@chakra-ui/react"
import { useWeb3React } from "@web3-react/core"
import LeaveModal from "./LeaveModal"
import JoinModal from "./JoinModal"
import platformsContent from "../platformsContent"

type Props = {
  platform: string
}

// ! This is a dummy function for the demo !
const isMember = (platform: string) => {
  if (platform === "telegram") {
    return true
  }
  return false
}

const PlatformButton = ({ platform }: Props): JSX.Element => {
  const { account } = useWeb3React()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { logo: Logo } = platformsContent[platform]

  return (
    <>
      <Button
        onClick={onOpen}
        colorScheme={platform}
        fontWeight="medium"
        leftIcon={<Logo />}
        variant={isMember(platform) ? "outline" : "solid"}
        disabled={!account}
      >
        {`${isMember(platform) ? "Leave" : "Join"} ${
          platform.charAt(0).toUpperCase() + platform.slice(1)
        }`}
      </Button>
      {isMember(platform) ? (
        <LeaveModal {...{ platform, isOpen, onClose }} />
      ) : (
        <JoinModal {...{ platform, isOpen, onClose }} />
      )}
    </>
  )
}

export default PlatformButton