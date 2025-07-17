import React from "react";
import { CodeBlock } from "@/components/codeblock";

export default function CodeBlockPreview() {
  return (
    <CodeBlock lang="tsx" theme="github-dark-default">{`
import { useEffect, useState } from "react";

function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
    `}</CodeBlock>
  );
}
