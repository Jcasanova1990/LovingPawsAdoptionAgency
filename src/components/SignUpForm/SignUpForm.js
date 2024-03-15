import { useState } from 'react';
import styles from './SignUpForm.module.scss';

export default function SignUpForm(props) {
    const [credentials, setCredentials] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        await props.signUp(credentials);
        // Redirect to home after signup
        window.location.href = '/';
    };

    return (
        <>
            <h2 className={styles.heading}>SignUp, To Adopt or Place An Animal Up For Adoption</h2>
            <form className={styles.form} onSubmit={handleSignUp}>
                <input type='text' name="name" onChange={handleChange} value={credentials.name} />
                <input type='email' name="email" onChange={handleChange} value={credentials.email} />
                <input type='password' name="password" onChange={handleChange} value={credentials.password} />
                <input type="submit" value="Submit" />
            </form>
        </>
    );
}
