
export const getActiveCollection = async () => {

    try {
        const res = await fetch('http://localhost:8000/active-collection')
        return await res.json()
        
    } catch (err) {
        alert("sonthing went wrong please try again later. or check the system")
    }
} 


export const getCollections = async (): Promise<{isEmpty: boolean, collection: string[]}> => {

    try {
        const res = await fetch('http://localhost:8000/collections')

        let data = await res.json()


        return {
            isEmpty: false,
            collection: data['ref']
        }


    } catch (err) {
        

    }

    return {
        isEmpty: true,
        collection: []
    }

} 



export const getDate = () => {
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];;
    var date = new Date();
}