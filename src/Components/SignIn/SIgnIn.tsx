import  { useRef } from 'react';

import style from './SignIn.module.css'
import { Link, useNavigate } from 'react-router-dom';
import { IoPeopleSharp } from "react-icons/io5";
import { IoIosPerson } from "react-icons/io";
import { TiLockClosed } from "react-icons/ti";
import {  signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase/firebaseConfig';
import { toast, ToastContainer } from 'react-toastify';
import { sendData } from '../Firebase/FirebaseMethod';





const SignIn = () => {
    const mail = useRef<any>('');
    const password = useRef<any>('');
    const navigate = useNavigate();

    const signIn = (e: any) => {
        e.preventDefault();
        const paswrd = password.current.value;
        const mal = mail.current.value;
        if (mal && paswrd != '') {
            signInWithEmailAndPassword(auth, mal, paswrd)
                .then((res) => {

                    navigate('/')
                }).catch(() => {
                    toast.error('Put Correct Login details')
                })
        } else {
            toast.error('All Filed Are Required')
        }
    }


    return (
        <div className={`${style.signin}`}>
            <ToastContainer />
            <div className="container">
                <div className="row">
                    <div className={`${style.main} position-relative col-md-8 col-lg-6 col-11 bg-dark-subtle border-0 rounded-5 mx-auto mt-5 shadow-lg py-4`}
                        data-aos="zoom-in-down" data-aos-duration="3000"  >
                        <form style={{ zIndex: '1' }}>
                            <div className={` ${style.icn} p-3  text-center mx-auto d-flex align-items-center justify-content-center`}>
                                <h1>SignIn</h1>
                                <IoPeopleSharp className='fs-1 ms-4' />
                            </div>
                            <div>
                                <div className={`${style.inpt}`}>
                                    <IoIosPerson className='fs-1' />
                                    <input required ref={mail} type="email" placeholder='Enter your email' />
                                </div>
                                <div className={`${style.inpt}`}>
                                    <TiLockClosed className='fs-1' />
                                    <input required ref={password} type="password" placeholder='Enter Password' />
                                </div>
                            </div>
                            <div className='d-flex justify-content-around mt-4 ' >
                                <a href="" style={{ color: '#173370' }}>forget password</a>
                                <Link to={'/SignUp'} style={{ color: '#173370' }}>SignUp</Link>
                            </div>
                            <div className={`${style.btn} mx-auto col-3`}>
                                <button className='mt-5 ' onClick={signIn}>Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
