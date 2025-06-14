
import React from 'react';

interface CodeSnippetBackgroundProps {
  skillName: string;
}

const getCodeSnippets = (skillName: string): string[] => {
  const skill = skillName.toLowerCase();
  
  if (skill.includes('react')) {
    return [
      "const [count, setCount] = useState(0);",
      "useEffect(() => { cleanup(); }, []);",
      "const App = () => <div>Hello</div>;",
      "import React from 'react';",
      "export default Component;",
      "const handleClick = () => {};",
      "return <button onClick={handleClick}>"
    ];
  }
  
  if (skill.includes('tailwind')) {
    return [
      "class='flex justify-center'",
      "bg-blue-500 hover:bg-blue-600",
      "text-white font-bold py-2 px-4",
      "rounded-lg shadow-lg",
      "grid grid-cols-3 gap-4",
      "w-full max-w-md mx-auto",
      "transition-all duration-300"
    ];
  }
  
  if (skill.includes('javascript')) {
    return [
      "const result = array.map(item => item.id);",
      "function calculate(a, b) { return a + b; }",
      "const promise = async () => await fetch();",
      "const obj = { name: 'John', age: 30 };",
      "if (condition) { return true; }",
      "const filtered = data.filter(x => x > 5);",
      "export { component, handler };"
    ];
  }
  
  if (skill.includes('typescript')) {
    return [
      "interface User { id: number; name: string; }",
      "type Status = 'loading' | 'success' | 'error';",
      "const user: User = { id: 1, name: 'John' };",
      "function greet(name: string): string {}",
      "const items: Array<string> = [];",
      "export type { User, Status };",
      "const result = data as ApiResponse;"
    ];
  }
  
  if (skill.includes('python')) {
    return [
      "def calculate(x, y):",
      "    return x + y",
      "import pandas as pd",
      "data = pd.read_csv('file.csv')",
      "for item in items:",
      "    print(item)",
      "class User:",
      "    def __init__(self, name):"
    ];
  }
  
  if (skill.includes('sql')) {
    return [
      "SELECT id, name FROM users;",
      "WHERE created_at > '2024-01-01'",
      "JOIN orders ON users.id = orders.user_id",
      "GROUP BY category",
      "ORDER BY created_at DESC",
      "INSERT INTO products (name, price)",
      "UPDATE users SET status = 'active'"
    ];
  }
  
  if (skill.includes('node')) {
    return [
      "const express = require('express');",
      "const app = express();",
      "app.get('/api/users', (req, res) => {",
      "const server = http.createServer();",
      "server.listen(3000);",
      "const fs = require('fs');",
      "module.exports = router;"
    ];
  }
  
  if (skill.includes('git')) {
    return [
      "git add .",
      "git commit -m 'Initial commit'",
      "git push origin main",
      "git checkout -b feature/new",
      "git merge feature-branch",
      "git pull origin main",
      "git status"
    ];
  }
  
  if (skill.includes('docker')) {
    return [
      "FROM node:18-alpine",
      "COPY package*.json ./",
      "RUN npm install",
      "EXPOSE 3000",
      "CMD ['npm', 'start']",
      "docker build -t myapp .",
      "docker run -p 3000:3000 myapp"
    ];
  }
  
  if (skill.includes('css')) {
    return [
      ".container { display: flex; }",
      "background: linear-gradient(45deg, #ff6b6b, #4ecdc4);",
      "box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);",
      "transform: translateY(-2px);",
      "transition: all 0.3s ease;",
      "@media (max-width: 768px) {",
      "grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));"
    ];
  }
  
  // Default tech snippets for other programming languages
  return [
    "const component = () => <div>Hello</div>;",
    "function calculate(a, b) { return a + b; }",
    "const server = http.createServer();",
    "import { useState } from 'react';",
    "export default MyComponent;",
    "const data = await fetch('/api');",
    "if (condition) { return true; }"
  ];
};

export const CodeSnippetBackground: React.FC<CodeSnippetBackgroundProps> = ({ skillName }) => {
  const codeSnippets = getCodeSnippets(skillName);
  
  return (
    <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
      <div className="absolute inset-0 opacity-10 blur-[2px]">
        {Array.from({ length: 7 }).map((_, i) => (
          <p
            key={i}
            className="font-mono text-sm text-white absolute"
            style={{
              top: `${10 + i * 14}%`,
              left: `${i % 2 === 0 ? '5%' : 'auto'}`,
              right: `${i % 2 !== 0 ? '5%' : 'auto'}`,
              transform: `rotate(${i % 2 === 0 ? -5 : 5}deg) scale(1.1)`,
              whiteSpace: 'nowrap'
            }}
          >
            {codeSnippets[i % codeSnippets.length]}
          </p>
        ))}
      </div>
    </div>
  );
};
