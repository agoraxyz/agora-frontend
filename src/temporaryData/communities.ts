import type { Community } from "./types"

const communities: Community[] = [
  {
    id: 1,
    name: "Agora Space",
    owner: {
      id: 1,
      addresses: [
        {
          address: "0x6a228b19ccebf4f0ce76c916ad3cd386f556f95e",
          userId: 1,
        },
      ],
      telegramId: "2628282098",
      discordId: "246757911144693762",
    },
    urlName: "agora",
    description:
      "Two-way social media integration to the blockchain. Join the classes of the OG Agora space community",
    imageUrl: "https://agoraspace.s3.us-east-2.amazonaws.com/agora.png",
    themeColor: "#4F46E5",
    chainData: [
      {
        name: "POLYGON",
        contractAddress: "0x6bd3c2931eab7b15fba5c8a956171309949e4d4c",
        token: {
          name: "AGOTEST",
          symbol: "AGOTEST",
          decimals: 18,
          address: "0xff9baac24c68d810af1f98012d3d25b0ea83902e",
        },
        stakeToken: {
          name: "AGT",
          symbol: "AGT",
          decimals: 18,
          address: "0x0e4e6daab4532f6d71ffa3a8a3a5e014f60c524b",
        },
      },
    ],
    levels: [
      {
        id: 1,
        name: "Commoners",
        description: "",
        imageUrl: "https://agoraspace.s3.us-east-2.amazonaws.com/agora1.png",
        membersCount: 0,
        requirements: [],
        discordRole: "0",
        telegramGroupId: "-1001173782530",
      },
      {
        id: 2,
        name: "Citizens",
        description: "Description",
        imageUrl: "https://agoraspace.s3.us-east-2.amazonaws.com/agora2.png",
        membersCount: 0,
        requirements: [
          {
            address: "0xff9baac24c68d810af1f98012d3d25b0ea83902e",
            type: "TOKEN",
            value: 10,
          },
        ],
        discordRole: "868170608536596530",
        telegramGroupId: "-1001577104080",
      },
      {
        id: 3,
        name: "Aristocracy",
        description: "Basic group for the basic HODLers",
        imageUrl: "https://agoraspace.s3.us-east-2.amazonaws.com/agora3.png",
        membersCount: 0,
        requirements: [
          {
            address: "0xff9baac24c68d810af1f98012d3d25b0ea83902e",
            type: "TOKEN",
            value: 100,
          },
        ],
        discordRole: "868170667172958239",
        telegramGroupId: "-1001550982354",
      },
      {
        id: 4,
        name: "Syndicate",
        description: "Group for founders who tokenized their communities",
        imageUrl: "https://agoraspace.s3.us-east-2.amazonaws.com/agora4.png",
        membersCount: 0,
        requirements: [
          {
            address: "0x0e4e6daab4532f6d71ffa3a8a3a5e014f60c524b",
            type: "TOKEN",
            value: 500,
            stakeTimelockMs: 600000,
          },
        ],
        discordRole: "868170723393413161",
        telegramGroupId: "-1001552642571",
      },
    ],
    parallelLevels: false,
    communityPlatforms: [
      {
        name: "DISCORD",
        platformId: "842030939332804679",
        active: true,
        inviteChannel: "842030939960770592",
      },
      { name: "TELEGRAM", platformId: null, active: true },
    ],
  },
  // {
  //   id: 2,
  //   name: "Mutagen",
  //   owner: {
  //     id: 0,
  //     address: "",
  //     telegramId: "",
  //     discordId: "",
  //   },
  //   urlName: "mutagen",
  //   description: "First NFT community on Agora",
  //   imageUrl: "https://agoraspace.s3.us-east-2.amazonaws.com/mutagen_community.png",
  //   themeColor: "#000000",
  //   chainData: [
  //     {
  //       name: "GOERLI",
  //       contractAddress: null,
  //       token: {
  //         name: "Mutagen",
  //         symbol: "Mutagen",
  //         decimals: 0,
  //         address: "0x1e0410daf22ff7182ed7bf30ebd880efdb99d2ca",
  //       },
  //     },
  //   ],
  //   levels: [
  //     {
  //       id: 1,
  //       name: "Prints",
  //       description: "",
  //       imageUrl: "https://agoraspace.s3.us-east-2.amazonaws.com/prints.png",
  //       membersCount: 0,
  //       requirementType: "NFT_HOLD",
  //       requirement: 1,
  //       requirementData: null,
  //       stakeTimelockMs: null,
  //       discordRole: "873240378902454312",
  //       telegramGroupId: "-1001516232987",
  //     },
  //     {
  //       id: 2,
  //       name: "Mutagens",
  //       description: "",
  //       imageUrl: "https://agoraspace.s3.us-east-2.amazonaws.com/mutagens.png",
  //       membersCount: 0,
  //       requirementType: "NFT_HOLD",
  //       requirement: 2,
  //       requirementData: null,
  //       stakeTimelockMs: null,
  //       discordRole: "873240467549081670",
  //       telegramGroupId: "-1001583795045",
  //     },
  //     {
  //       id: 3,
  //       name: "Geneses",
  //       description: "",
  //       imageUrl: "https://agoraspace.s3.us-east-2.amazonaws.com/geneses.png",
  //       membersCount: 0,
  //       requirementType: "NFT_HOLD",
  //       requirement: 0,
  //       requirementData: null,
  //       stakeTimelockMs: null,
  //       discordRole: "873240584138154036",
  //       telegramGroupId: "-1001255306155",
  //     },
  //   ],
  //   parallelLevels: true,
  //   communityPlatforms: [
  //     { name: "DISCORD", platformId: "873240078141489153", active: true },
  //     { name: "TELEGRAM", platformId: null, active: true },
  //   ],
  // },
]

export type { Community }
export { communities }
