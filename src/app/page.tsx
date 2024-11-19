import CreateUser from "@/components/CreateUser";
import UsersList from "@/components/UsersList";

export default function Home() {
  return (
    <div>
      {" "}
      <h1>Welcome to User Management</h1>
      <CreateUser />
      <UsersList></UsersList>
    </div>
  );
}
