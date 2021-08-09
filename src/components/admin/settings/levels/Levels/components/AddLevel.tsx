import {
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  Textarea,
  useRadioGroup,
  VStack,
} from "@chakra-ui/react"
import PhotoUploader from "components/admin/settings/common/PhotoUploader"
import Card from "components/common/Card"
import { Lock, LockOpen, LockSimpleOpen } from "phosphor-react"
import { useState } from "react"
import { Icon as IconType } from "temporaryData/types"
import RadioCard from "./RadioCard"

type MembershipData = {
  name: string
  icon: IconType
}

const membershipsData: { [key: string]: MembershipData } = {
  open: {
    name: "Open",
    icon: LockSimpleOpen,
  },
  hold: {
    name: "Hold",
    icon: LockOpen,
  },
  stake: {
    name: "Stake",
    icon: Lock,
  },
}

const AddLevel = () => {
  const options = ["open", "hold", "stake"]

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "membership",
    defaultValue: "open",
    onChange: console.log,
  })

  const group = getRootProps()

  // Platform linking logic (temp)
  const [platformLinking, setPlatformLinking] = useState({
    tg: [],
    dc: [],
  })

  const tagsChange = (e, type: "tg" | "dc") => {
    if (e.code === "Comma" || e.code === "Enter") {
      const newItem = e.target.value.split(",")[0]

      if (newItem && !platformLinking[type].find((item) => item === newItem)) {
        const newList = [...platformLinking[type], newItem]
        setPlatformLinking({ ...platformLinking, [type]: newList })
        e.target.value = ""
      }
    }
  }

  const removeTag = (item, type: "tg" | "dc") => {
    const oldList = [...platformLinking[type]]
    const newList = oldList.filter((i) => i !== item)

    setPlatformLinking({ ...platformLinking, [type]: newList })
  }

  return (
    <Card width="full" padding={8}>
      <VStack spacing={12}>
        <Grid width="full" templateColumns="repeat(2, 1fr)" gap={12}>
          <GridItem>
            <FormControl id="level_name">
              <FormLabel>Name</FormLabel>
              <Input />
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl id="level_image">
              <FormLabel>Image</FormLabel>
              <PhotoUploader buttonText="Change image..." />
            </FormControl>
          </GridItem>

          <GridItem colSpan={2}>
            <FormControl id="community_description">
              <FormLabel>Description</FormLabel>
              <Textarea />
            </FormControl>
          </GridItem>
        </Grid>

        <Grid width="full" templateColumns="repeat(2, 1fr)" gap={12}>
          <GridItem mb={-8} colSpan={2}>
            <Text as="h2" fontWeight="bold" fontSize="lg">
              Membership requirements
            </Text>
          </GridItem>

          <GridItem colSpan={2}>
            <FormControl id="membership">
              <FormLabel>Membership</FormLabel>
              <HStack {...group}>
                {options.map((value) => {
                  const radio = getRadioProps({ value })
                  return (
                    <RadioCard key={value} {...radio}>
                      <HStack spacing={2} justify="center">
                        <Icon as={membershipsData[value].icon} />
                        <Text as="span">{membershipsData[value].name}</Text>
                      </HStack>
                    </RadioCard>
                  )
                })}
              </HStack>
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl id="amount">
              <FormLabel>Amount</FormLabel>
              <InputGroup>
                <Input />
                <InputRightAddon>TKN</InputRightAddon>
              </InputGroup>
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl id="timelock">
              <FormLabel>Timelock</FormLabel>
              <InputGroup>
                <Input />
                <InputRightAddon>month</InputRightAddon>
              </InputGroup>
            </FormControl>
          </GridItem>
        </Grid>

        <VStack width="full" spacing={6} alignItems="start">
          <Text as="h2" fontWeight="bold" fontSize="lg">
            Platform linking
          </Text>

          <FormControl id="tg_groups">
            <FormLabel>Telegram group(s)</FormLabel>
            <InputGroup>
              {platformLinking.tg.length > 0 && (
                <InputLeftAddon px={2} bgColor="transparent">
                  <HStack spacing={2}>
                    {platformLinking.tg.map((item) => (
                      <Tag key={item}>
                        <TagLabel>{item}</TagLabel>
                        <TagCloseButton onClick={() => removeTag(item, "tg")} />
                      </Tag>
                    ))}
                  </HStack>
                </InputLeftAddon>
              )}
              <Input width="full" onKeyUp={(e) => tagsChange(e, "tg")} />
            </InputGroup>
          </FormControl>

          <FormControl id="dc_roles">
            <FormLabel>Discord channel(s)</FormLabel>
            <InputGroup>
              {platformLinking.dc.length > 0 && (
                <InputLeftAddon px={2} bgColor="transparent">
                  <HStack spacing={2}>
                    {platformLinking.dc.map((item) => (
                      <Tag key={item}>
                        <TagLabel>{item}</TagLabel>
                        <TagCloseButton onClick={() => removeTag(item, "dc")} />
                      </Tag>
                    ))}
                  </HStack>
                </InputLeftAddon>
              )}
              <Input width="full" onKeyUp={(e) => tagsChange(e, "dc")} />
            </InputGroup>
          </FormControl>
        </VStack>
      </VStack>
    </Card>
  )
}

export default AddLevel
