import { useMachine } from "@xstate/react"
import { usePersonalSign } from "components/_app/PersonalSignStore"
import useToast from "hooks/useToast"
import { Requirement } from "temporaryData/types"
import createSubmitMachine, {
  APIError,
  ContextType,
  FetchEvent,
  InitialEvent,
  SignError,
  SignEvent,
} from "../utils/submitMachine"
import useShowErrorToast from "./useShowErrorToast"

const MESSAGE = "Please sign this message to verify your address"

export type Level = {
  id: number
  dbId: number
  name: string
  image?: File
  description: string
  requirements: Requirement[]
  telegramGroupId: string
  tokenSymbol?: string
}

export type FormData = {
  tokenSymbol: string
  isTGEnabled: boolean
  stakeToken: string
  isDCEnabled: boolean
  discordServerId: string
  inviteChannel: string
  levels: Level[]
  image?: File
}

const useSubmitMachine = <FormDataType>(
  successText: string,
  fetch: (
    _context: ContextType,
    {
      data,
    }:
      | SignEvent<FormDataType>
      | SignEvent<
          FormDataType & {
            levels: Level[]
          }
        >
  ) => Promise<Response | Response[]>,
  redirect: (context: ContextType, data: FetchEvent) => Promise<void>,
  preprocess: (data: FormDataType) => FormDataType | FormData = (data) => data
) => {
  const toast = useToast()
  const showErrorToast = useShowErrorToast()
  const [sign, hasMessage, getSign] = usePersonalSign()
  const [state, send] = useMachine(createSubmitMachine<FormDataType>(), {
    services: {
      fetch,
      sign: async (_, { data }: InitialEvent<FormDataType>) => {
        if (hasMessage(MESSAGE))
          return { ...data, addressSignedMessage: getSign(MESSAGE) }
        const addressSignedMessage = await sign(MESSAGE).catch(() =>
          Promise.reject(new Error())
        )
        return { ...data, addressSignedMessage }
      },
    },
    actions: {
      redirect,
      showErrorToast: (_context, { data: error }: SignError | APIError) => {
        if (error instanceof Error) showErrorToast(error.message)
        else showErrorToast(error.errors)
      },
      showSuccessToast: () => {
        toast({
          title: "Success!",
          description: successText,
          status: "success",
          duration: 4000,
        })
      },
    },
  })

  const onSubmit = (_data: FormDataType) => {
    const data = preprocess(_data)
    send("SIGN", { data })
  }

  return {
    onSubmit,
    loading: ["sign", "fetch", "parseError"].some(state.matches),
    success: state.matches("success"),
  }
}

export default useSubmitMachine
