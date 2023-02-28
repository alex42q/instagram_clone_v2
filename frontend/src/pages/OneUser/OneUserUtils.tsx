import { FollowOrUnfollowUser } from "../../services/Services"

export const OneUserUtilsFun = () =>{
    
    const followOrUnfollowF = (slug?:any) =>{
        FollowOrUnfollowUser(slug)
        .then(res=>{
            window.location.reload()
            return res.data
        })
        .catch(err=>{
            console.log(err)
        })
    }

    return {followOrUnfollowF}
}