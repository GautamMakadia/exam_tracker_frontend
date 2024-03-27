
export const getActiveCollection = async () => {

    try {
        let res = await fetch(`/api/collection/active`, {
            cache: "no-cache"
        })
        
        if (!res.ok) {
            throw "somthing went wrong"
        }

        const data = await res.json()
        
        return data

    } catch (err) {
        if (err instanceof Error) {
            return {
                name: null,
                error: {
                    name: err.message,
                    desc: "backend service is not responding"
                }
            }
        }
    }
} 
