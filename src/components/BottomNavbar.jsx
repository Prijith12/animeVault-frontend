import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import CustomAccountIcon from './CustomAccountIcon';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import GetAppIcon from '@material-ui/icons/GetApp';
import { Link } from 'react-router-dom';
import { useEffect,useState } from 'react';

function BottomNavbar() {
    const [isMobile, setIsMobile] = useState(false);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768); // Adjust the breakpoint as needed
        };

        handleResize(); // Initial check
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleScroll = () => {
        const currentScrollPos = window.pageYOffset;
        const isVisible = prevScrollPos > currentScrollPos || currentScrollPos < 120;
        setVisible(isVisible);
        setPrevScrollPos(currentScrollPos);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollPos]);

    return (
        <div className={`fixed bottom-0 w-full bg-black bg-opacity-95 h-14 p-4 flex justify-between items-center md:hidden transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}>
            <div className='pl-3'>
                <Link to='/'>
                    <HomeIcon className='text-gray-400 hover:scale-125' fontSize='small'></HomeIcon>
                    <p className='text-xs text-gray-400'>Home</p>
                </Link>

            </div>
            <div>
                <Link to='/'>
                    <FavoriteBorderIcon className='text-gray-400 hover:scale-125' fontSize='small' />
                    <p className='text-gray-400 text-xs'>WishList</p></Link>

            </div>
            <div>
                <Link to='/'>
                    <GetAppIcon className='text-gray-400 hover:scale-125' fontSize='small' />
                    <p className='text-gray-400 text-xs'>Downloads</p>
                </Link>

            </div>
            <div>
                <CustomAccountIcon className='hover:scale-125' />
            </div>
        </div>
    )
}

export default BottomNavbar
