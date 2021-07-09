import { Center, Text } from "@chakra-ui/react"
import useEstimateTransactionTime from "hooks/useEstimateTransactionTime"
import { ArrowCircleUp } from "phosphor-react"
import msToReadableFormat from "utils/msToReadableFormat"

const TransactionSubmitted = ({ transaction }) => {
  const estimatedTransactionTime = useEstimateTransactionTime(transaction)

  return (
    <>
      <Center>
        <ArrowCircleUp
          size="50%"
          color="var(--chakra-colors-primary-500)"
          weight="thin"
        />
      </Center>
      <Text fontWeight="medium" mt="8">
        Avarage transaction time is {msToReadableFormat(estimatedTransactionTime)}.
        You’ll be notified when it succeeds.
      </Text>
    </>
  )
}

export default TransactionSubmitted
