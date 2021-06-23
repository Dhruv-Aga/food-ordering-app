import './../App.css';
import AxiosInstanceCreator from "../utils/http";
import {useState} from "react";

const login = (email, password) => {
    const data = {
        user: {
            email: email,
            password: password,
        }
    }
    return AxiosInstanceCreator().post("/users/login", data)
}

const signup = (name, mobile, email, password) => {
    const data = {
        user: {
            name: name,
            mobile: mobile,
            email: email,
            password: password,
        }
    }
    return AxiosInstanceCreator().post("/users/", data)
}

function Login() {
    const [data, changeData] = useState({
        name: "",
        password: "",
        email: "",
        number: null,
        isNew: false,
    })

    const handleChange = (event) => {
        changeData({
            ...data,
            [event.target.name]: event.target.value
        })
    }

    const callAPI = async () => {
        let res;
        if (data.isNew) {
            res = await signup(data.name, data.number, data.email, data.password)
        } else {
            res = await login(data.email, data.password)
        }
        if (res.status === 200) {
            for (let key in res.data.user) localStorage.setItem(key, res.data.user[key])
        }
        localStorage.setItem("isLogin", "1")
    }

    return (
        <div className={"container"}>
            {data.isNew && <>
                <div className={"form-field"}>
                    <label htmlFor="name">Name</label>
                    <input id="name" name="name" type="text" onChange={handleChange}/>
                </div>
                <div className={"form-field"}>
                    <label htmlFor="number">Mobile No.</label>
                    <input id="number" name="number" type="number" onChange={handleChange}/>
                </div>
            </>
            }
            <div className={"form-field"}>
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" onChange={handleChange}/>
            </div>
            <div className={"form-field"}>
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" onChange={handleChange}/>
            </div>
            <div className={"form-field"}>
                <>
                    <span onClick={() => changeData({...data, isNew: !data.isNew})}>
                        {!data.isNew && "Sign Up"}
                        {data.isNew && "Login"}
                    </span>
                    <input id="submit" type="submit" onClick={callAPI} value={!data.isNew ? "Login" : "Sign Up"}/>
                </>
            </div>
        </div>

    );
}

export default Login;
