import { useContext } from "react"
import { authContext } from "../../Context/authContext/authContext";
import PostComponent from "../../Compnents/PostComponent/PostComponent";

export default function Bookmarks(){

    const {authState} = useContext(authContext);


    return(
        <div>
            <h1>This is Bookmarks Page</h1>
            {authState.bookmarks.map((post) => <li>
                <PostComponent postDetails={post} />
            </li>)}
        </div>
    )
}