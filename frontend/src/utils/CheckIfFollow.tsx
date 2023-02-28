export const CheckIfFollow = (arr: any[], myId: number):boolean => {
    const filterUsers = arr.filter((a => a.followingFromId === myId)).some(function(element) {
        if ( element.followingFromId === myId) {
            return true
        }else{
            return false;
        }
    })
    return filterUsers
}