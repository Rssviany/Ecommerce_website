import React from 'react'

function Footer() {
    const scrollToTop=()=>{
        window.scrollTo({top:0,behavior:"smooth"});
    }
    return (
        <footer className="mt-10">
            <button
                onClick={scrollToTop}
                className="w-full bg-[#37475A] text-white py-3 text-sm hover:bg-[#485769]"
            >
                Back to top
            </button>

            <div className="bg-[#232F3E] text-white">
                <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="font-bold mb-3">Get to Know Us</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:underline">About Us</a></li>
                            <li><a href="#" className="hover:underline">Careers</a></li>
                            <li><a href="#" className="hover:underline">Press Releases</a></li>
                            <li><a href="#" className="hover:underline">Amazon Science</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold mb-3">Connect with Us</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:underline">Facebook</a></li>
                            <li><a href="#" className="hover:underline">Twitter</a></li>
                            <li><a href="#" className="hover:underline">Instagram</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold mb-3">Make Money with Us</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:underline">Sell on Amazon</a></li>
                            <li><a href="#" className="hover:underline">Affiliate Program</a></li>
                            <li><a href="#" className="hover:underline">Advertise Your Products</a></li>
                            <li><a href="#" className="hover:underline">Fulfilment by Amazon</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold mb-3">Let Us Help You</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:underline">Amazon Services</a></li>
                            <li><a href="#" className="hover:underline">Your Account</a></li>
                            <li><a href="#" className="hover:underline">Returns Centre</a></li>
                            <li><a href="#" className="hover:underline">Help</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="bg-[#131A22] text-center py-4 text-xs text-white">
                © 2025 YourStore, Inc. or its affiliates
            </div>
        </footer>
    )
}

export default Footer;