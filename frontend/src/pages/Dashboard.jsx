import { useState, useEffect } from "react"
import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import axios from "axios"

export const Dashboard = () => {
    const [balance, setBalance] = useState(0)
    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.get("http://localhost:8000/api/v1/account/balance", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                setBalance(res.data.balance)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    return <div>
        <Appbar />
        <div className="m-8">
            <Balance value={balance} />
            <Users />
        </div>
    </div>
}