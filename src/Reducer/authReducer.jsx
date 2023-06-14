export const authReducer =(state,action) =>{
        switch(action.type){

            case'userName':
                return {...state,userName: action.payload};

            case 'loginPassword':
                return{...state,loginPassword:action.payload};

            case 'guestLogin':
                return{...state,userName:'shreyansh',
            loginPassword:'00001111'}    

            case 'postList':
                return{...state, postList: action.payload }

            case 'allPostList':{
                return{...state, allPostList: action.payload}
            }    
            
            case 'usersList':
                return{...state,usersList: action.payload}
            

            case 'singleUserDetail':
                return{...state,singleUserDetail: action.payload}
            
            default:
                return state;    

        }   
}