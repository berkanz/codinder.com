
import React from 'react';

const codeSnippets = [
  "const component = () => <div>Hello</div>;",
  "useEffect(() => { cleanup(); }, []);",
  "SELECT id, name FROM products;",
  "git push origin main",
  "npm install react",
  "function calculate(a, b) { return a + b; }",
  "const server = http.createServer();",
  ".container { display: flex; }",
  "const user = await db.user.findFirst();",
];

export const CodeSnippetBackground = () => (
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
          {codeSnippets[(i * 3) % codeSnippets.length]}
        </p>
      ))}
    </div>
  </div>
);
