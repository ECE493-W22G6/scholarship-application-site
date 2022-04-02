import React, { useState, useEffect } from "react";

export default function Login() {
  const [loginText, setLoginText] = useState();

  useEffect(() => {
    fetch("/api/hello", {
      // 'methods': 'GET',
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setLoginText(data.hello);
      });
  });
  return (
    <main style={{ padding: "1rem 0" }}>
      <h2>login</h2>
      <p>login text: {loginText}</p>
    </main>
  );
}
