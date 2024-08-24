
import style from './Signup.module.css'
import { Link } from 'react-router-dom';
import { IoPeopleSharp } from "react-icons/io5";
import { IoIosPerson } from "react-icons/io";
import { TiLockClosed } from "react-icons/ti";
import { auth } from '../Firebase/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import { useRef } from 'react';
import { MdEmail } from "react-icons/md";
import { sendData } from '../Firebase/FirebaseMethod';




const Signup = () => {
    const name = useRef<any>('');
    const mail = useRef<any>('');
    const password = useRef<any>('');

    const create = (e: any) => {
        const obj = {
            name:name.current.value,
            mail:mail.current.value,
            password:password.current.value,
            id:''
        }
        e.preventDefault();
        if (mail.current.value && password.current.value && name.current.value !== '') {
            createUserWithEmailAndPassword(auth, mail.current.value, password.current.value).then((rs) => {
                const id =rs.user.uid;
                obj.id = id;
                toast.success('Account is Created');
                sendData('userdata',obj,id).then(()=>{

                    mail.current.value = "";
                    password.current.value = "",
                        name.current.value = ''
                }).catch((er)=>{
                    console.log(er);
                    
                })
            }).catch((er) => {
                console.log(er);

            })
        } else {
            toast.error("Please fill All field")
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
                                <h1>SignUp</h1>
                                <IoPeopleSharp className='fs-1 ms-4' />
                            </div>
                            <div>
                                <div className={`${style.inpt}`}>
                                    <IoIosPerson className='fs-1' />
                                    <input ref={name} type="text" placeholder='Enter your Name' />
                                </div>
                                <div className={`${style.inpt}`}>
                                    <MdEmail className='fs-1' />
                                    <input ref={mail} type="email" placeholder='Enter your email' />
                                </div>
                                <div className={`${style.inpt}`}>
                                    <TiLockClosed className='fs-1' />
                                    <input ref={password} type="password" placeholder='Enter Password' />
                                </div>
                            </div>
                            <div className='d-flex justify-content-around mt-4 ' >

                                <Link to={'/login'} style={{ color: '#173370' }}>SignIn</Link>
                            </div>
                            <div className={`${style.btn} mx-auto col-3`}>
                                <button className='mt-5 ' onClick={create}>SignUp</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;




