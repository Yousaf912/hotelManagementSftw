import React, { useContext, useEffect, useState } from 'react';
import { getData } from '../Firebase/FirebaseMethod';
import { IoIosPerson } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { Store } from '../ContexStore/Store';

export default function StaffList() {
    const [types, setTypes] = useState<any>([]);
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [staff, setStaff] = useState<any>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const navigate = useNavigate();
    const data = useContext(Store)

    useEffect(() => {
        getData('staff').then((data: any) => {
            const types = Object.keys(data);
            setTypes(types);

            if (types.length > 0) {
                setSelectedType(types[0]);
            }
        }).catch((error) => {
            console.error(error);
        });
    }, [data.delt]);

    useEffect(() => {
        
        if (selectedType) {
            getData(`staff/${selectedType}`).then((data: any) => {
                setStaff(Object.values(data) || []);
            }).catch((error) => {
                console.error(error);
            });
        }
    }, [selectedType]);

    const handleChangeType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedType(e.target.value);
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value.toLowerCase());
    };

    
    const filteredStaff = staff.filter((member: any) =>
        member.name.toLowerCase().includes(searchQuery) ||
        member.id.toLowerCase().includes(searchQuery)
    );
    const singleStaff=(id:any,type:any)=>{
        navigate(`/home/staff/SingleSstaff/${type}/${id}`)
    }

    return (
        <div className='p-2 text-white' style={{ backgroundColor: '#4790f0' }}>
            <div className='text-center'>
                <h1>List Of Staff</h1>
            </div>
            <div className='d-flex justify-content-around mt-3 mb-3'>
                <div>
                    <h6>Select Staff Type</h6>
                    <select
                        value={selectedType || ''}
                        onChange={handleChangeType}
                        className='border-0 py-1 px-2 rounded-3'
                    >
                        <option value='' disabled>Select</option>
                        {types.map((type: any, index: any) => (
                            <option key={index} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <h6>Search</h6>
                    <input
                        placeholder='Search staff by name or ID'
                        className='py-2 px-3 border-0 rounded-5'
                        type='text'
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                </div>
            </div>
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Department</th>
                            <th scope="col">About</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStaff.length > 0 ? (
                            filteredStaff.map((val: any, index: number) => (
                                <tr key={index}>
                                    <th scope="row">{val.id}</th>
                                    <td>{val.name}</td>
                                    <td>{val.type}</td>
                                    <td onClick={() => singleStaff(val.id,val.type)}><IoIosPerson className='fs-4' style={{ color: '#bd9834', cursor: 'pointer' }} /> </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4}>No staff found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}


