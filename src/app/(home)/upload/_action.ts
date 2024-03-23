"use server"

export async function uploadExcelFile(
    prevState:  { msg:string , seating_list: any, erorr?: string|undefined},
    formData: FormData
) {
   
    try {
        const res = await fetch(`http://localhost:8000/records`, {
            method: "post",
            body: formData
        })
        const data = await res.json()

        if (res.status == 406) {
            return { msg: data.detail , seating_list: null, error: "unprocessable" }
        }

        let seating: any[] = [] 

        Object.keys(data['seating_list']).forEach((k, index)=> {
            seating.push(...Object.values(data['seating_list'][k]))
        })

        return { msg: "succesfull", seating_list: seating }
    } catch(e) {
        return { msg: "backend service is down", seating_list: null, error: (e as Error).message }
    }

    
}