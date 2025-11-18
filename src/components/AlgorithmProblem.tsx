import React, { useState } from 'react';
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackConsole,
  SandpackPreview
} from '@codesandbox/sandpack-react';

interface TestCase {
  input: any[];
  expected: any;
  description?: string;
}

interface AlgorithmProblemProps {
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  examples?: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  starterCode: string;
  solution?: string;
  testCases: TestCase[];
  functionName: string;
}

export default function AlgorithmProblem({
  title,
  difficulty,
  description,
  examples = [],
  starterCode,
  solution,
  testCases,
  functionName,
}: AlgorithmProblemProps) {
  const [showSolution, setShowSolution] = useState(false);

  const difficultyColor = {
    Easy: '#00b8a3',
    Medium: '#ffc01e',
    Hard: '#ef4743',
  };

  // Create test runner code
  const testRunnerCode = `
${showSolution ? solution : starterCode}

// Test Runner
const testCases = ${JSON.stringify(testCases)};

console.log('\\n🧪 Running Test Cases...\\n');

let passed = 0;
let failed = 0;

testCases.forEach((test, index) => {
  try {
    const result = ${functionName}(...test.input);
    const expected = test.expected;

    const isEqual = JSON.stringify(result) === JSON.stringify(expected);

    if (isEqual) {
      console.log(\`✅ Test \${index + 1}: PASSED\`);
      if (test.description) console.log(\`   \${test.description}\`);
      console.log(\`   Input: \${JSON.stringify(test.input)}\`);
      console.log(\`   Output: \${JSON.stringify(result)}\`);
      passed++;
    } else {
      console.log(\`❌ Test \${index + 1}: FAILED\`);
      if (test.description) console.log(\`   \${test.description}\`);
      console.log(\`   Input: \${JSON.stringify(test.input)}\`);
      console.log(\`   Expected: \${JSON.stringify(expected)}\`);
      console.log(\`   Got: \${JSON.stringify(result)}\`);
      failed++;
    }
    console.log('');
  } catch (error) {
    console.log(\`❌ Test \${index + 1}: ERROR\`);
    console.log(\`   \${error.message}\`);
    failed++;
    console.log('');
  }
});

console.log(\`\\n📊 Results: \${passed} passed, \${failed} failed out of \${testCases.length} tests\`);

if (passed === testCases.length) {
  console.log('\\n🎉 All tests passed! Great job!');
}
`;

  return (
    <div style={{ marginTop: '2rem' }}>
      {/* Problem Header */}
      <div style={{
        padding: '1.5rem',
        backgroundColor: 'var(--ifm-background-surface-color)',
        borderRadius: '8px',
        marginBottom: '1rem',
        border: '1px solid var(--ifm-color-emphasis-300)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <h2 style={{ margin: 0 }}>{title}</h2>
          <span style={{
            padding: '0.25rem 0.75rem',
            borderRadius: '4px',
            fontSize: '0.875rem',
            fontWeight: 'bold',
            color: 'white',
            backgroundColor: difficultyColor[difficulty]
          }}>
            {difficulty}
          </span>
        </div>

        {/* Description */}
        <div dangerouslySetInnerHTML={{ __html: description }} />

        {/* Examples */}
        {examples.length > 0 && (
          <div style={{ marginTop: '1.5rem' }}>
            <h3>Examples:</h3>
            {examples.map((example, idx) => (
              <div key={idx} style={{
                marginBottom: '1rem',
                padding: '1rem',
                backgroundColor: 'var(--ifm-code-background)',
                borderRadius: '4px',
                fontFamily: 'monospace'
              }}>
                <div><strong>Input:</strong> {example.input}</div>
                <div><strong>Output:</strong> {example.output}</div>
                {example.explanation && <div><strong>Explanation:</strong> {example.explanation}</div>}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Code Editor with Test Runner */}
      <div style={{ marginBottom: '1rem' }}>
        <SandpackProvider
          template="vanilla"
          theme="dark"
          files={{
            '/index.js': {
              code: testRunnerCode,
            },
          }}
          options={{
            autorun: false,
          }}
        >
          <div style={{
            border: '1px solid var(--ifm-color-emphasis-300)',
            borderRadius: '8px',
            overflow: 'hidden',
            backgroundColor: '#1e1e1e'
          }}>
            {/* Header with Run Button */}
            <div style={{
              padding: '0.75rem 1rem',
              backgroundColor: '#2d2d2d',
              borderBottom: '1px solid var(--ifm-color-emphasis-300)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '0.9rem' }}>
                Code Editor
              </span>
              <button
                onClick={() => window.location.reload()}
                style={{
                  padding: '0.5rem 1.5rem',
                  backgroundColor: '#00b8a3',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                ▶ Run Code
              </button>
            </div>

            {/* Code Editor */}
            <SandpackCodeEditor
              showLineNumbers={true}
              showInlineErrors={true}
              style={{ height: '400px', fontSize: '14px' }}
            />

            {/* Console Output */}
            <div style={{
              borderTop: '1px solid var(--ifm-color-emphasis-300)',
              backgroundColor: '#1e1e1e'
            }}>
              <div style={{
                padding: '0.75rem 1rem',
                backgroundColor: '#2d2d2d',
                borderBottom: '1px solid var(--ifm-color-emphasis-300)'
              }}>
                <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '0.9rem' }}>
                  📊 Test Results
                </span>
              </div>
              <SandpackConsole
                showHeader={false}
                style={{
                  height: '300px',
                  overflow: 'auto'
                }}
              />
            </div>
          </div>
        </SandpackProvider>
      </div>

      {/* Solution Toggle */}
      {solution && (
        <div style={{ marginTop: '1rem' }}>
          <button
            onClick={() => setShowSolution(!showSolution)}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: showSolution ? '#ef4743' : '#00b8a3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            {showSolution ? '👁️ Hide Solution' : '💡 Show Solution'}
          </button>
        </div>
      )}

      {/* Instructions */}
      <div style={{
        marginTop: '1.5rem',
        padding: '1rem',
        backgroundColor: 'var(--ifm-alert-background-color)',
        borderRadius: '4px',
        borderLeft: '4px solid var(--ifm-color-primary)'
      }}>
        <strong>💡 How to use:</strong>
        <ol style={{ marginBottom: 0, marginTop: '0.5rem' }}>
          <li>Write your solution in the <strong>Code Editor</strong></li>
          <li>Click the <strong>"▶ Run Code"</strong> button to test</li>
          <li>See test results in the <strong>"📊 Test Results"</strong> section below</li>
          <li>✅ = Passed, ❌ = Failed - check the output details</li>
          <li>Click <strong>"Show Solution"</strong> to learn the optimal approach</li>
        </ol>
      </div>
    </div>
  );
}
