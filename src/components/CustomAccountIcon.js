import AccountCircleIcon from '@material-ui/icons/AccountCircle';

function CustomAccountIcon({ user, imageUrl }) {
  const isGoogleUser = user?.sub?.includes("google-oauth2");

  return (
    <div style={{ width: 32, height: 32 }}>
      {isGoogleUser && imageUrl ? (
        <img src={imageUrl} alt="Profile" style={{ width: '100%', height: '100%', borderRadius: '50%' }} className='opacity-70' />
      ) : (
        <AccountCircleIcon style={{ width: '100%', height: '100%' }} className='text-gray-400 pr-3' />
      )}
    </div>
  );
}

export default CustomAccountIcon;
