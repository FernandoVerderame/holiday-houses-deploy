import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import { FaRegUserCircle as UserIcon } from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = () => {

    const { login } = useAuth();

    const initialData = {
        email: 'fer@gmail.com',
        password: '12345678'
    }

    const [formData, setFormData] = useState(initialData);

    const [loginError, setLoginError] = useState(null);

    const changeData = (key, value) => {
        setFormData(curr => ({
            ...curr,
            [key]: value
        }));
    }

    const handleLogin = async e => {
        e.preventDefault();
        try {
            await login(formData);
            setFormData(initialData);
        } catch (err) {
            setLoginError(err);
        }
    }

    return (<>
        <section id="login" className="d-flex justify-content-center align-items-center">
            <div className="card w-25">
                <div className="card-header">
                    <div className="card-title text-center">
                        <h1 className="h2 m-0 d-flex align-items-center justify-content-center gap-2"><UserIcon /><span>Login Dashboard</span></h1>
                    </div>
                </div>
                <div className="card-body">
                    <form onSubmit={handleLogin}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label h5">Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={e => changeData('email', e.target.value)}
                                className="form-control"
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label h5">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={e => changeData('password', e.target.value)}
                                className="form-control"
                            />
                        </div>

                        {loginError !== null && <div className="text-danger">{loginError.message}</div>}
                        {loginError?.errors && loginError.errors.map((err, index) => (
                            <div key={`err${index}`}>{err.msg}</div>
                        ))}

                        <div className="d-flex justify-content-center">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    </>)
}

export default Login;