import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FaUser, FaRegListAlt, FaHome } from 'react-icons/fa';
import { FaMessage } from 'react-icons/fa6';

const AdminLayout = () => {
    return (
        <>
            <header>
                <div className="container">
                    <nav>
                        <ul>
                            <li><NavLink to="/admin/users"><FaUser /> users</NavLink></li>
                            <li><NavLink to="/admin/contacts"><FaMessage /> contacts</NavLink></li>
                            <li><NavLink to="/admin/services"><FaRegListAlt /> services</NavLink></li>
                            <li><NavLink to="/admin/"><FaHome /> Home</NavLink></li>
                        </ul>
                    </nav>
                </div>
            </header>
            <Outlet />
        </>
    );
}

export default AdminLayout;
