"use client";
import React, { useEffect, useState } from "react";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");

  // Lấy dữ liệu người dùng khi component được mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");

        // Nếu yêu cầu thành công
        if (response.ok) {
          const data = await response.json();
          setUsers(data); // Lưu dữ liệu người dùng vào state
        } else {
          setMessage("Failed to fetch users"); // Thông báo lỗi nếu không thành công
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setMessage("Error fetching users");
      }
    };

    fetchUsers(); // Gọi hàm fetch khi component được mount
    
  }, []); // Mảng rỗng để chỉ gọi một lần khi component được render lần đầu tiên
  return (
    <div className="flex justify-center items-center bg-gray-50 mt-20">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Users List</h2>

        {message && <p className="text-red-500 text-center">{message}</p>}

        {users.length > 0 ? (
          <ul>
            {users.map((user: { id: number; name: string; email: string }) => (
              <li key={user.id} className="mb-4">
                <p className="text-lg font-semibold">{user.name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center">No users found</p>
        )}
      </div>
    </div>
  );
};

export default UsersList;
