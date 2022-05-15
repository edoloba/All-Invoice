export default function SimpleFooter() {
    return (
        <>
            <footer className="pt-8 pb-6 fixed center bottom-0">
                <div className="container max-w-7xl mx-auto px-4">
                    <div className="flex flex-wrap justify-center gap-4 md:justify-between">
                        <ul className="list-unstyled flex gap-8">
                            
                            <li>
                                <a
                                    href="/aboutus"
                                    className="text-white font-medium block pb-2 text-sm"
                                >
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/"
                                    rel="noreferrer"
                                    className="text-white font-medium block pb-2 text-sm"
                                >
                                    Contact Us
                                </a>
                            </li>
                        </ul>

                        
                    </div>
                </div>
            </footer>
        </>
    );
}
