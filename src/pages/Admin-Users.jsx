import {useEffect, useState} from 'react';
import { useAuth } from '../store/auth';
import './Admin-Users.css';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);

    const {authorizationToken} = useAuth();

    const getAllUsersData = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/admin/users", {
                method: "GET",
                headers: {
                    Authorization: authorizationToken, 
                },
            });
            const data = await response.json(); //json to object
            console.log(` users: ${data}`);
            setUsers(data);
        } catch (error) {
            console.log(error);
        }
    }

    //Delete the user on clicking delete btn
    let deleteUser = async (id) => {
        const response = await fetch(`http://localhost:3000/api/admin/users/delete/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: authorizationToken, 
            },
        });
        if(response.ok){
            getAllUsersData(); //Refresh the user list after deletion
        } else {
            console.error("Failed to delete user");
        }
    }


    useEffect(() => {
        getAllUsersData();
    }, []);


    return (
        <div>
            <section className='admin-users-section'>
                <div className="container">
                    <h1 style={{color: "white"}}>Admin Users Data</h1>
                </div>
                <div className='container admin-users'>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, idx) => {
                                return <tr key={idx}>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>Edit</td>
                                    <td><button onClick={() => {deleteUser(user._id)}}> Delete </button></td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                    
                </div>
            </section>
            
        </div>
    );
}

export default AdminUsers;
