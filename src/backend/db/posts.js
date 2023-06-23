import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";

/**
 * Posts can be added here.
 * You can add default posts of your wish with different attributes
 * */

export const posts = [
  {
    _id: uuid(),
    content:
      "Keep it simple and straight. just the way i like it. it should be minimal. it has to be useful.",
    likes: {
      likeCount: 39,
      likedBy: [],
      dislikedBy: [],
    },
    username: "shreyansh",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content: "Keep beleiving in your yourself",
    likes: {
      likeCount: 80,
      likedBy: [],
      dislikedBy: [],
    },
    username: "shreyansh",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content: "Knowledge is power. I want to be the most powerful person.",
    likes: {
      likeCount: 112,
      likedBy: [],
      dislikedBy: [],
    },
    username: "adarshbalika",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content: "Be best at what you do.",
    likes: {
      likeCount: 92,
      likedBy: [],
      dislikedBy: [],
    },
    username: "adarshbalika",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content: "At Eiffiel Tower, Paris. Feeling Cool.",
    likes: {
      likeCount: 1112,
      likedBy: [],
      dislikedBy: [],
    },
    username: "ranbir_kapoor",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content: "Live a life you will remember.",
    likes: {
      likeCount: 2292,
      likedBy: [],
      dislikedBy: [],
    },
    username: "ranbir_kapoor",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content: "Singing is meditation and I keep meditating.",
    likes: {
      likeCount: 3972,
      likedBy: [],
      dislikedBy: [],
    },
    username: "guru007",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content: "dive deep before flying high",
    likes: {
      likeCount: 6532,
      likedBy: [],
      dislikedBy: [],
    },
    username: "guru007",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
      "Mujhe lagta hai ki baate dil ki hoti lafzoo ki dhokhebazi ~Arijit Singh",
    likes: {
      likeCount: 5243,
      likedBy: [],
      dislikedBy: [],
    },
    username: "Arijit",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content: "You should be loved by people producers will love you more.",
    likes: {
      likeCount: 6563,
      likedBy: [],
      dislikedBy: [],
    },
    username: "Arijit",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content: "Keep it simple and straight.",
    likes: {
      likeCount: 9432,
      likedBy: [],
      dislikedBy: [],
    },
    username: "I_am_Katrina",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content: "You dont have to be the angel just follow her principles.",
    likes: {
      likeCount: 2872,
      likedBy: [],
      dislikedBy: [],
    },
    username: "I_am_Katrina",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content: "I love you papa.",
    likes: {
      likeCount: 5431,
      likedBy: [],
      dislikedBy: [],
    },
    username: "its_Alia_Bhatt",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content: "Thank you for the best Actress lead #FilmFare",
    likes: {
      likeCount: 5411,
      likedBy: [],
      dislikedBy: [],
    },
    username: "its_Alia_Bhatt",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content: "Be original and find your inner voice. The rest will follow.",
    likes: {
      likeCount: 1342,
      likedBy: [],
      dislikedBy: [],
    },
    username: "A_R_Rehman",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content: "The search is more important than the Destination.",
    likes: {
      likeCount: 3421,
      likedBy: [],
      dislikedBy: [],
    },
    username: "A_R_Rehman",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
