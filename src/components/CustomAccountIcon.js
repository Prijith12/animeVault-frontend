import AccountCircleIcon from '@material-ui/icons/AccountCircle';

function CustomAccountIcon({ imageUrl, ...props }) {
  return (
    <div style={{ width: 32, height: 32 }}>
      {imageUrl ? (
        <img src={imageUrl} alt="Profile" style={{ width: '100%', height: '100%', borderRadius: '50%' }} {...props} />
      ) : (
        <AccountCircleIcon style={{ width: '100%', height: '100%' }} {...props} className='text-gray-400 pr-3'/>
      )}
    </div>
  );
}

export default CustomAccountIcon;
