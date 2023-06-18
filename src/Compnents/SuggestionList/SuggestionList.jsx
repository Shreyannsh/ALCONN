import './SuggestionList.css';

import { useContext,useState, useEffect} from "react";

import { authContext } from "../../Context/authContext/authContext";

export default  function SuggestionList(){

    const {authState} = useContext(authContext);
  
    const [filteredUsers,setFilteredUsers] = useState(authState?.usersList?.filter(({_id}) => _id !== authState.singleUserDetail._id));

    const displayFilterList = () =>{
        // const followList = authState?.usersList?.filter(({_id}) => _id !== authState.singleUserDetail._id)
        setFilteredUsers(authState?.usersList?.filter(({_id}) => _id !== authState.singleUserDetail._id))
    }

    const searchUser = (e) =>{
       
        const value = e.target.value;
        console.log(value);
        if(value){
            console.log('got it');
            setFilteredUsers(authState.usersList.filter((user) => user.username.toLowerCase().includes(value.toLowerCase()) ||  user.firstName.toLowerCase().includes(value.toLowerCase()) ||  user.lastName.toLowerCase().includes(value.toLowerCase()) ))

        console.log(filteredUsers )
        } else{

            console.log('oh shit');
            setFilteredUsers(authState.usersList.filter(({_id}) => _id !== authState.singleUserDetail._id))
             console.log(filteredUsers )
        }
    }

    useEffect(()=>{
        displayFilterList()
    },[])

    console.log(filteredUsers )
    return(
        <div className='followList'>

            <input className='searchBox' placeholder='Search friend' onChange={(e)=>searchUser(e)} type='text' />

            <h3 className='suggestionTitle'>Suggestions for you</h3>

            {filteredUsers?.map(({firstName,lastName,username}) => 

                <div className="suggestedUser">
                    <img className='image-pic' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgtt3zOq6B9NnqaNv6ApPqWUmxmTf5hxtF_g&usqp=CAU'  />
                    <p className='fullName'>{firstName} {lastName}</p>
                    <p className='userName'>@{username}</p>
                    <span className='follow-btn'>Follow</span>
                </div>
            
            )}


        </div>
    )
}