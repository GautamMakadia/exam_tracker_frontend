"use server"

export async function uploadExcelFile(
    prevState:  { msg:string , seating_list: any, erorr?: string|undefined},
    formData: FormData
) {
   
    try {
        const res = await fetch("http://localhost:8000/records", {
            method: "post",
            body: formData
        })

        const data = await res.json()

        let seating: any[] = [] 

        Object.keys(data['seating_list']).forEach((k, index)=> {
            seating.push(...Object.values(data['seating_list'][k]))
        })

        return {msg: "succesfull", seating_list: seating }
    } catch(e) {
        
        return {msg: "some phydical error", seating_list: null, error: "error"}
    }

    
}