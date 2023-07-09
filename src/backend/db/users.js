import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: uuid(),
    firstName: "Adarsh",
    lastName: "Balika",
    username: "adarshbalika",
    password: "adarshBalika123",
    profilePic: "../../assets/adbali.JPG",
    bookmarks: [],
    title: "Aspiring Web Developer",
    bio: "Keep spreading joy.",
    website: "shreyashtiwarii.netlify.app",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Shreyansh",
    lastName: "Tiwari",
    username: "Shreyansh007",
    password: "000011112222",
    profilePic: "../../assets/neogpic.jpg",
    bookmarks: [],
    title: "Software Developer",
    bio: "Play to win, Code to deploy!",
    website: "shreyashtiwarii.netlify.app",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Ranbir",
    lastName: "Kapoor",
    username: "ranbir_kapoor",
    password: "00001111",
    profilePic:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcLn0HX2gU3mr2MN2LFzTqtY_Vff5SySY6nQ&usqp=CAU",
    title: "Artist",
    bio: "Always acting!!! haaa",
    website: "shreyashtiwarii.netlify.app",
    bookmarks: [],
    title: "Actor",
    bio: "Have Fun with life.",
    website: "",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Guru ",
    lastName: "Randhawa",
    username: "guru007",
    password: "00001111",
    profilePic:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfPILde-C2O_k-gbnPUPc5VDH82r4blkUczw&usqp=CAU",
    title: "Musician",
    bio: "Keep writing the good lines",
    website: "shreyashtiwarii.netlify.app",
    bookmarks: [],
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Arijit",
    lastName: "Singh",
    username: "Arijit",
    password: "00001111",
    profilePic:
      "https://in.bmscdn.com/iedb/artist/images/website/poster/large/arijit-singh-1048083-24-03-2017-18-02-00.jpg",
    title: "Singer",
    bio: "There is no heart music can't breach",
    website: "shreyashtiwarii.netlify.app",
    bookmarks: [],
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Katrina",
    lastName: "Kafe",
    username: "I_am_Katrina",
    password: "00001111",
    profilePic:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwCPtt8gKlgnyvIrn-Ki1JVVJOvQza2OO8TbplAVBjAJnmWGCDE68x9Kct6hPeaB4aNVk&usqp=CAU",
    title: "Actress",
    bio: "Be bold Be Savage👒",
    website: "shreyashtiwarii.netlify.app",
    bookmarks: [],
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Alia",
    lastName: "Bhatt",
    username: "its_Alia_Bhatt",
    password: "00001111",
    profilePic: "../../assets/alia.JPG",
    title: "SomeOne",
    bio: "Create what is the vision",
    website: "shreyashtiwarii.netlify.app",
    bookmarks: [],
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "A R  ",
    lastName: "Rehman",
    username: "A_R_Rehman",
    password: "00001111",
    profilePic:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWuu0RzSIpl1cVx9hXVL_Vtz4oUZ7FHYgS1A&usqp=CAU",
    title: "Artist",
    bio: "To fly I take fight. To rise above I meditate.",
    website: "shreyashtiwarii.netlify.app",
    bookmarks: [],
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
