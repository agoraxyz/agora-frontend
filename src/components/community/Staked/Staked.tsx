import {
  Button,
  Box,
  Tooltip,
  useDisclosure,
  ScaleFade,
  Text,
} from "@chakra-ui/react"
import ActionCard from "components/common/ActionCard"
import msToReadableFormat from "utils/msToReadableFormat"
import { useCommunity } from "../Context"
import useUnstake from "./components/UnstakingModal/hooks/useUnstake"
import UnstakingModal from "./components/UnstakingModal/UnstakingModal"
import useStakedAmounts from "./hooks/useStakedAmounts"
import formatDate from "./utils/formatDate"

const Staked = (): JSX.Element => {
  const {
    chainData: {
      stakeToken: { symbol: stakeTokenSymbol },
    },
  } = useCommunity()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { unlocked, locked } = useStakedAmounts()
  const { canUnstake, expirity } = useUnstake()

  return (
    <ScaleFade in={!!unlocked || !!locked.length} initialScale={0.9} unmountOnExit>
      <ActionCard
        title="Staked"
        description={
          <>
            {!!unlocked && (
              <Text>
                {unlocked} {stakeTokenSymbol} - unlocked
              </Text>
            )}
            {!!locked.length &&
              locked.map(({ amount, expires }) => (
                <Text key={+expires}>
                  {amount} {stakeTokenSymbol} - locked until {formatDate(expires)}
                </Text>
              ))}
          </>
        }
      >
        <Tooltip
          isDisabled={canUnstake}
          label={`You can't unstake yet, your timelock expires in ${msToReadableFormat(
            expirity
          )}`}
        >
          <Box>
            <Button
              disabled={!canUnstake}
              colorScheme="primary"
              fontWeight="medium"
              onClick={onOpen}
            >
              Unstake
            </Button>
          </Box>
        </Tooltip>
        <UnstakingModal isOpen={isOpen} onClose={onClose} />
      </ActionCard>
    </ScaleFade>
  )
}

export default Staked
