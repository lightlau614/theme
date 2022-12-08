import React from 'react';
import { slide as Menu } from 'react-burger-menu'
import { Dropdown } from 'react-bootstrap';

const Admin = () => {
    return (
        <div>
            <header className='container'>
                <div className="row">
                    <div className='col-md-auto'>
                        <img src='https://dummyimage.com/25x25/0d31bf/fff'/>
                    </div>
                    <div className='col-md-auto'>
                        <p>Admin Page</p>
                    </div>
                    <div className='col-sm'></div>
                    <div className='col-md-auto'>
                        <p>Wellcome World!</p>
                    </div>
                    <div className='col-md-auto'>
                        <p>LogOut</p>
                    </div>
                </div>
            </header>
            <body>
                <div className='Admin-Munu'>
                    <Menu isOpen={ true } noOverlay>
                        <Dropdown>
                            <Dropdown.Toggle>
                                User Management
                            </Dropdown.Toggle>
                            <Dropdown.Menu variant="dark">
                                <Dropdown.Item>User List</Dropdown.Item>
                                <Dropdown.Item>Action 2</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown>
                            <Dropdown.Toggle>
                                Product Management
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item>Product List</Dropdown.Item>
                                <Dropdown.Item>Action 2</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <a></a>
                    </Menu>
                </div>
                <div>

                </div>
            </body>
        </div>
    );
};

export default Admin;