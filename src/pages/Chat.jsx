import React from 'react';
import { Link } from 'react-router-dom';

const Chat = () => {
    return (
        <div>
            <Link to='/register'>Register</Link>
            <Link to='/login'>Login</Link>
            <Link to='/profile'>profile</Link>
        </div>
    );
};

export default Chat;