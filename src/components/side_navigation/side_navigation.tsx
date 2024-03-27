"use client"

import Link from "next/link"
import styles from "./style.module.scss"
import { usePathname, useRouter } from "next/navigation"
import logo from "@/assets/image/logo.png"

type MenuItem =  {
    id: string
    title: string
    path: string
    isActive: boolean
}

interface SideNavigationProps {
    className: string
}

const menu_items: MenuItem[] = [
    { id:'upload', title: "Upload Records", path:'/upload', isActive: false }, 
    { id:'seating',title: 'Seating Records', path: '/seating', isActive: false }
]

export default function SideNavigation({className}: SideNavigationProps) { 
    
    const pathname = usePathname()
    
    return (
        <nav className={`${className} ${styles.navigation_pan}`}>
            <div className={`${styles.nav_head}`}>
                <img src={logo.src} alt="atmiya-university" className={styles.logo}/>
                <h1 className={`${styles.nav_title}`}>Atmiya University</h1>
                <hr/>
            </div>
            
            <ul className={styles.list_container}>
                {
                    menu_items.map((item) => {
                        return (
                            <li id={`${item.id}`} key={`${item.id}`} className={`${styles.nav_action}` + ` ${item.path === pathname ? styles.nav_active : ""}`}  >
                                <Link className="block text-center" prefetch={true} href={item.path} >{item.title}</Link>
                            </li>
                        )
                    })
                }
            </ul>
            
            <div className={styles.bottom_menu}>
                <hr />
                <Logout text="Logout" className={`${styles.nav_logout}`}/>
            </div>
        </nav>
    )
}

interface LogoutButtonProps {
    text: string
    className: string
}

function Logout({text="", className="" }: LogoutButtonProps) {
    const router = useRouter()

    const logout = async () => {
        
        const logout_res = await fetch("/user", {
            method: "delete",
        })

        if (logout_res.ok) {
            router.push('/login')
        }
    }

    return (
        <button type="button" onClick={logout} className={`${className}`}>Logout</button>
    )
}