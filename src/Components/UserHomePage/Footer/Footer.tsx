import logo from '../../../assets/rani logo.png'
export default function Footer() {
    return (
        <div className='container-fluid text-white' style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
            <div className="container">
                <footer className="py-3 my-4">
                    <ul className="nav justify-content-center border-bottom pb-3 ">
                        <li className="nav-item"><a href="#" className="nav-link px-2 text-white">Home</a></li>
                        <li className="nav-item"><a href="#" className="nav-link px-2 text-white">Features</a></li>
                        <li className="nav-item"><a href="#" className="nav-link px-2 text-white">Pricing</a></li>
                        <li className="nav-item"><a href="#" className="nav-link px-2 text-white">FAQs</a></li>
                        <li className="nav-item"><a href="#" className="nav-link px-2 text-white">About</a></li>
                    </ul>
                    <p className="text-center text-white">© 2024 Company, Inc</p>
                </footer>
            </div>
        </div>
    )
}