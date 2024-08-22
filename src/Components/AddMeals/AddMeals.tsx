import { useState, useRef } from 'react';
import style from '../AddRoom/Addroom.module.css';
import { sendData } from '../Firebase/FirebaseMethod';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddMeals() {
    const [category, setCategory] = useState<string>('');
    const [items, setItems] = useState<any>([]);
    const newItemTitle = useRef<any>('');
    const newItemDescription = useRef<any>('');
    const url = useRef<any>()
    

    const handleAddItem = () => {
        const title = newItemTitle.current.value;
        const dis = newItemDescription.current.value;
        const pic = url.current.value;

        if (title && dis && pic) {
            setItems([...items, { title:title , description: dis,pic : pic}]);
          newItemTitle.current.value =''
            newItemDescription.current.value =''
            url.current.value=''
        } else {
            toast.error('Please fill out both title and description.');
        }
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (category === '' || items.length === 0) {
            toast.error('Please select a category and add at least one item.');
            return;
        }


        sendData('foods', { items }, category)
            .then(() => {
                toast.success('Food items added successfully');
                setCategory('');
                setItems([]);
            })
            .catch((error) => {
                console.error(error);
                toast.error('Failed to add food items');
            });
    };

    return (
        <div className={`${style.main} p-4 text-white`}>
            <div className="container">
                <ToastContainer />
                <div className="row">
                    <div className="text-white text-center">
                        <h1>Add Food Items</h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className={`${style.inpt} p-3 col-12`}>
                            <div className='d-flex justify-content-between mt-4'>
                                <div className='col-5'>
                                    <h6>Select Category</h6>
                                    <select
                                        required
                                        style={{ width: '100%' }}
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                    >
                                        <option value="" disabled>Select</option>
                                        <option value="Breakfast">Breakfast</option>
                                        <option value="Lunch">Lunch</option>
                                        <option value="Dinner">Dinner</option>
                                        <option value="Snacks">Snacks</option>
                                        <option value="Beverages">Beverages</option>
                                        <option value="Refreshments">Refreshments</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div className='col-5'>
                                    <h6>Picture Url</h6>
                                    <input ref={url}  type="text" style={{ width: '100%' }} />
                                </div>

                            </div>

                            <div className='mt-3'>
                                <h6>Add New Item</h6>
                                <input
                                    type="text"
                                    placeholder="Item Title"
                                    ref={newItemTitle}
                                    
                                    style={{ width: '100%' }}
                                />
                                <textarea
                                    placeholder="Item Description"
                                    ref={newItemDescription}
                                    style={{ width: '100%' }}
                                    rows={3}
                                    className="mt-2"
                                ></textarea>
                                <button
                                    type="button"
                                    className="mt-2 px-3 py-2 border-0"
                                    onClick={handleAddItem}
                                >
                                    Add Item
                                </button>
                            </div>

                            <div className='mt-4'>
                                <h6>Items to Add</h6>
                                <ul>
                                    {items.map((item: any, index: any) => (
                                        <li key={index}>
                                            <strong>{item.title}:</strong> {item.description} <br />
                                            <strong>Url:</strong> {item.pic.slice(0,30)}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className='d-flex'>
                                <div className={`col-md-4 mt-4 ${style.btn} d-md-flex mx-auto`}>
                                    <button type="submit" className='px-5 py-2 border-0'>Submit</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
