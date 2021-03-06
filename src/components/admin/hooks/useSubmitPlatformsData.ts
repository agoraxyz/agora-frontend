import type { FormData } from "components/admin/hooks/useSubmitMachine"
import { useRouter } from "next/router"
import { ContextType, SignEvent } from "../utils/submitMachine"
import useCommunityData from "./useCommunityData"
import useSubmitMachine from "./useSubmitMachine"

const useSubmitPlatformsData = (
  telegramChanged: boolean,
  discordChanged: boolean,
  callback: () => any // TODO: better typing
) => {
  const { communityData } = useCommunityData()
  const router = useRouter()

  const fetchService = (_context: ContextType, { data }: SignEvent<any>) => {
    const promises = []

    if (telegramChanged)
      promises.push(
        fetch(
          `${process.env.NEXT_PUBLIC_API}/community/${communityData?.id}/platform`,
          {
            method: communityData?.communityPlatforms?.some(
              (platform) => platform.name === "TELEGRAM"
            )
              ? "PATCH"
              : "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              addressSignedMessage: data.addressSignedMessage,
              platform: "TELEGRAM",
              active: data.isTGEnabled,
            }),
          }
        )
      )

    if (discordChanged)
      promises.push(
        fetch(
          `${process.env.NEXT_PUBLIC_API}/community/${communityData?.id}/platform`,
          {
            method: communityData?.communityPlatforms?.some(
              (platform) => platform.name === "DISCORD"
            )
              ? "PATCH"
              : "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              addressSignedMessage: data.addressSignedMessage,
              platform: "DISCORD",
              active: data.isDCEnabled,
              platformId: data.discordServerId,
              inviteChannel: data.inviteChannel,
            }),
          }
        )
      )

    return Promise.all(promises)
  }

  const redirectAction = async () => {
    if (typeof callback === "function") {
      callback()
    } else {
      router.push(`/${communityData?.urlName}/community`)
    }
  }

  return useSubmitMachine<FormData>(
    "Platform data updated!",
    fetchService,
    redirectAction
  )
}

export default useSubmitPlatformsData
