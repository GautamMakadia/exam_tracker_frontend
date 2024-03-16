
export const getActiveCollection = async () => {

    try {
        let res = await fetch('http://localhost:8000/active-collectio', {
            cache: "no-cache"
        })
        
        if (!res.ok) {
            throw "somthing went wrong"
        }

        const data =  await res.json()
        
        return data

    } catch (err) {
        console.log(err)
        console.log(err)
        return {
            error: err
        }
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