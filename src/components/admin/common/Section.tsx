import { Box, Text, VStack } from "@chakra-ui/react"
import Card from "components/common/Card"
import { PropsWithChildren } from "react"

type Props = {
  title: string
  description?: string
  cardType?: boolean
}

const Section = ({
  title,
  description,
  cardType = false,
  children,
}: PropsWithChildren<Props>): JSX.Element => (
  <VStack as="section" width="full" alignItems="start" spacing={4}>
    <Box pl={4}>
      <Text as="h2" fontSize="xl" fontWeight="bold">
        {title}
      </Text>
      {description && (
        <Text fontSize="sm" fontWeight="medium" colorScheme="gray">
          {description}
        </Text>
      )}
    </Box>

    {cardType ? (
      <Card width="full" padding={8}>
        {children}
      </Card>
    ) : (
      children
    )}
  </VStack>
)

export default Section
