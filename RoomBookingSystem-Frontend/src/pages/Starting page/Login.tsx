import '/C:/Users/at994/Downloads/RoomBookingSystem-main/RoomBookingSystem-main/RoomBookingSystem/RoomBookingSystem-Frontend/src/pages/Starting page/login.css'

import { Link } from "react-router-dom"
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Login() {

    useEffect(() => {
        document.title = "Login | RoomBookingSystem"
    }, [])


    const navigate = useNavigate();

    const [showFirstDiv, setShowFirstDiv] = useState(true);
    const [showSecondDiv, setShowSecondDiv] = useState(false);

    const handleToggleFirstDiv = () => {
        setShowFirstDiv(!showFirstDiv);
        setShowSecondDiv(false);
    };
    const handleToggleSecondDiv = () => {
        setShowFirstDiv(false);
        setShowSecondDiv(!showSecondDiv);
    };


    const [adminEmail, setAdminEmail] = useState('');
    const [errorAdminMessage, setErrorAdminMessage] = useState('');

    const handleVerifyEmail = async () => {
        setErrorAdminMessage('');

        try {
            const response = await axios.post('http://localhost:8080/api/admin-otp-request', { adminEmail });
            console.log('Response:', response.data);
            const { message, status } = response.data;

            if (status) {
                console.log('Email verification successful!');
            }
            else {
                console.log(message)

                if (message === 'Otp sent to admin'){
                    setOtpSent(true);
                }
                if (message === 'Admin does not exist') {
                    setErrorAdminMessage("* Email verification failed");
                }
            }
        }
        catch (error) {
            console.error('Error verifying email:', error.message);
            setErrorAdminMessage('Email verification failed');
        }
    };

    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [errorOtpMessage, setErrorOtpMessage] = useState('');

    const handleVerifyOtp = async () => {
        setErrorOtpMessage('');

        try {
            const response = await axios.post('http://localhost:8080/api/validate-admin-otp', {
                adminEmail,
                otp });

            console.log('Response:', response.data);
            const { message, status } = response.data;

            if (message === 'Otp verified'){
                navigate('/adminDashboard');
                localStorage.setItem('adminOTP', otp);
            }
            if (message === 'Otp does not match!') {
                setErrorOtpMessage("* OTP verification failed");
            }
        }
        catch (error) {
            console.error('Error verifying OTP:', error.message);
            setErrorOtpMessage('OTP verification failed');
        }
    };

    return (
        <>
            <div className="login-page">
                <div className="left-sec-login">
                                         <div className="website-title-login">
                                             <Link to="/mainhomepage"><p className="gyansarathi-login">WE KNOW WHAT YOU LOVE</p></Link>
                                             <p className="margadarshan-login">DREAM HOTEL</p>
                                        </div>
                    <img className="login-img" src="src\assets\Registration\margadarshan.png"></img>
                </div>

                {showFirstDiv && (
                    <div className='right-sec-login'>
                        <div className="admin-login-form">
                            <button onClick={handleToggleSecondDiv} className="admin-login">Admin Login</button>
                            <br/><br/>
                             <Link to={"/t"}>
                             <button className="admin-login">User Page</button>
                             </Link>
                        </div>
                        <div className='page-heading-login'>
                        </div>

                    </div>
                )}

                {showSecondDiv && (
                    <div className="admin-login-container">
                        <button onClick={handleToggleFirstDiv} className="back-to-user-login"> Back to user login</button>

                        <div className='page-heading-login'>
                            <p className='login-title'>LOGIN</p>
                            <p className='login-welcome'>Welcome back!</p>
                            <p className='login-to-account'>Please login to your account for admin access</p>
                        </div>

                        {otpSent ? (
                            <div className="admin-enter-email-otp">
                                <div className="otp-container">
                                    <input className='otp-txtfld-login' placeholder='Enter your OTP' value={otp} onChange={(e) => setOtp(e.target.value)} />
                                    {errorOtpMessage && <p className="error-message-admin">{errorOtpMessage}</p>}
                                </div>
                                <div className="admin-login-container-button">
                                    <button onClick={handleVerifyOtp} className="verify-otp">Verify OTP</button>
                                </div>
                            </div>
                        ) : (
                            <div className="admin-verify-email-otp">
                                <div className='admin-login-email'>
                                    <input className='admin-email-txtfld-login'
                                           placeholder='Enter your email address'
                                           value={adminEmail}
                                           onChange={e => setAdminEmail(e.target.value)}
                                    />
                                    {errorAdminMessage && <p className="error-message-admin">{errorAdminMessage}</p>}
                                </div>
                                <div className="admin-login-container-button">
                                    <button onClick={handleVerifyEmail} className="verify-email"> Verify admin email</button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    )
}

export default Login