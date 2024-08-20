import React from 'react'
import HeaderTwo from './Header/HeaderTwo'
import SideBar from './SidebarTwo/SideBar'


export default function UserProfile() {
    return (
        <div className="col-12">
            <HeaderTwo />
            <div className='d-flex mt-5 justify-content-between'>

                <div className="col-2 border">
                    <SideBar />
                </div>
                <div className="col-8 border">

                </div>
            </div>
        </div>
    )
}
