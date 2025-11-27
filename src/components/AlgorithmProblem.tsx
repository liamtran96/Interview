import React, { useState, useRef } from 'react';
import Editor from '@monaco-editor/react';
import SidebarToggle from './SidebarToggle';
import { useSidebar } from '../contexts/SidebarContext';

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

interface TestResult {
  index: number;
  passed: boolean;
  input: any[];
  expected: any;
  actual?: any;
  error?: string;
  description?: string;
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
  const [code, setCode] = useState(starterCode);
  const [showSolution, setShowSolution] = useState(false);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const editorRef = useRef<any>(null);
  const { hideLeftSidebar, hideRightSidebar } = useSidebar();

  // Determine if editor should take full width
  const shouldExpandEditor = hideLeftSidebar || hideRightSidebar;

  const difficultyColor = {
    Easy: '#00b8a3',
    Medium: '#ffc01e',
    Hard: '#ef4743',
  };

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
  };

  const runTests = () => {
    setIsRunning(true);
    const results: TestResult[] = [];

    try {
      // Create a function from the user's code
      const userCode = editorRef.current?.getValue() || code;

      // Execute the user's code in a safe context
      const codeToExecute = `
        ${userCode}

        // Return the function for testing
        if (typeof ${functionName} === 'function') {
          return ${functionName};
        } else {
          throw new Error('Function ${functionName} is not defined');
        }
      `;

      const userFunction = new Function(codeToExecute)();

      // Run each test case
      testCases.forEach((test, index) => {
        try {
          const result = userFunction(...test.input);
          const passed = JSON.stringify(result) === JSON.stringify(test.expected);

          results.push({
            index: index + 1,
            passed,
            input: test.input,
            expected: test.expected,
            actual: result,
            description: test.description,
          });
        } catch (error: any) {
          results.push({
            index: index + 1,
            passed: false,
            input: test.input,
            expected: test.expected,
            error: error.message,
            description: test.description,
          });
        }
      });
    } catch (error: any) {
      // If code doesn't compile or function doesn't exist
      results.push({
        index: 0,
        passed: false,
        input: [],
        expected: null,
        error: `Code Error: ${error.message}`,
      });
    }

    setTestResults(results);
    setIsRunning(false);
  };

  const handleShowSolution = () => {
    if (!showSolution && solution) {
      setCode(solution);
      if (editorRef.current) {
        editorRef.current.setValue(solution);
      }
    } else {
      setCode(starterCode);
      if (editorRef.current) {
        editorRef.current.setValue(starterCode);
      }
    }
    setShowSolution(!showSolution);
    setTestResults([]); // Clear results when toggling solution
  };

  const passedCount = testResults.filter(r => r.passed).length;
  const totalCount = testResults.length;

  return (
    <div style={{
      marginTop: '2rem',
      width: '100%',
      maxWidth: '100%'
    }}>
      {/* Sidebar Toggle Buttons */}
      <SidebarToggle />

      {/* Title Bar */}
      <div style={{
        padding: '1rem 1.5rem',
        backgroundColor: 'var(--ifm-background-surface-color)',
        borderRadius: '8px 8px 0 0',
        border: '1px solid var(--ifm-color-emphasis-300)',
        borderBottom: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
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

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          {solution && (
            <button
              onClick={handleShowSolution}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: showSolution ? '#ef4743' : '#ffc01e',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '0.875rem'
              }}
            >
              {showSolution ? '👁️ Hide Solution' : '💡 Solution'}
            </button>
          )}
          <button
            onClick={runTests}
            disabled={isRunning}
            style={{
              padding: '0.5rem 1.5rem',
              backgroundColor: isRunning ? '#6c757d' : '#00b8a3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: isRunning ? 'not-allowed' : 'pointer',
              fontWeight: 'bold',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            {isRunning ? '⏳ Running...' : '▶ Run'}
          </button>
        </div>
      </div>

      {/* Two Column Layout: Problem Description | Code Editor */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: shouldExpandEditor ? '1fr' : '1fr 1fr',
        gap: 0,
        border: '1px solid var(--ifm-color-emphasis-300)',
        borderRadius: '0 0 8px 8px',
        overflow: 'hidden',
        minHeight: '600px',
        width: '100%',
        transition: 'grid-template-columns 0.3s ease'
      }}>
        {/* Left Column: Problem Description */}
        {!shouldExpandEditor && (
        <div style={{
          padding: '1.5rem',
          backgroundColor: 'var(--ifm-background-surface-color)',
          overflowY: 'auto',
          maxHeight: '600px',
          borderRight: '1px solid var(--ifm-color-emphasis-300)'
        }}>
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
                  fontFamily: 'monospace',
                  fontSize: '0.875rem'
                }}>
                  <div><strong>Input:</strong> {example.input}</div>
                  <div><strong>Output:</strong> {example.output}</div>
                  {example.explanation && <div style={{ marginTop: '0.5rem' }}><strong>Explanation:</strong> {example.explanation}</div>}
                </div>
              ))}
            </div>
          )}
        </div>
        )}

        {/* Right Column: Code Editor */}
        <div style={{
          backgroundColor: '#1e1e1e',
          display: 'flex',
          flexDirection: 'column',
          width: '100%'
        }}>
          <Editor
            height="600px"
            defaultLanguage="javascript"
            defaultValue={starterCode}
            value={code}
            onChange={(value) => setCode(value || '')}
            onMount={handleEditorDidMount}
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: 'on',
              roundedSelection: false,
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 2,
              wordWrap: 'on',
              padding: { top: 16 }
            }}
          />
        </div>
      </div>

      {/* Test Results */}
      {testResults.length > 0 && (
        <div style={{
          border: '1px solid var(--ifm-color-emphasis-300)',
          borderRadius: '8px',
          overflow: 'hidden',
          marginTop: '1rem',
          marginBottom: '1rem'
        }}>
          {/* Results Header */}
          <div style={{
            padding: '0.75rem 1rem',
            backgroundColor: 'var(--ifm-background-surface-color)',
            borderBottom: '1px solid var(--ifm-color-emphasis-300)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{ fontWeight: 'bold', fontSize: '0.95rem' }}>
              📊 Test Results
            </span>
            <span style={{
              padding: '0.25rem 0.75rem',
              borderRadius: '4px',
              fontSize: '0.875rem',
              fontWeight: 'bold',
              backgroundColor: passedCount === totalCount ? '#00b8a3' : '#ef4743',
              color: 'white'
            }}>
              {passedCount} / {totalCount} Passed
            </span>
          </div>

          {/* Results List */}
          <div style={{
            padding: '1rem',
            backgroundColor: 'var(--ifm-background-surface-color)',
            maxHeight: '400px',
            overflowY: 'auto'
          }}>
            {testResults.map((result) => (
              <div
                key={result.index}
                style={{
                  marginBottom: '1rem',
                  padding: '1rem',
                  backgroundColor: 'var(--ifm-code-background)',
                  borderRadius: '6px',
                  borderLeft: `4px solid ${result.passed ? '#00b8a3' : '#ef4743'}`
                }}
              >
                <div style={{
                  fontWeight: 'bold',
                  marginBottom: '0.5rem',
                  color: result.passed ? '#00b8a3' : '#ef4743'
                }}>
                  {result.passed ? '✅' : '❌'} Test {result.index}: {result.passed ? 'PASSED' : 'FAILED'}
                </div>

                {result.description && (
                  <div style={{ marginBottom: '0.5rem', fontStyle: 'italic', opacity: 0.8 }}>
                    {result.description}
                  </div>
                )}

                <div style={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
                  {result.index > 0 && (
                    <>
                      <div style={{ marginBottom: '0.25rem' }}>
                        <strong>Input:</strong> {JSON.stringify(result.input)}
                      </div>
                      <div style={{ marginBottom: '0.25rem' }}>
                        <strong>Expected:</strong> {JSON.stringify(result.expected)}
                      </div>
                      {!result.passed && (
                        <div style={{ color: '#ef4743' }}>
                          <strong>{result.error ? 'Error:' : 'Got:'}</strong>{' '}
                          {result.error || JSON.stringify(result.actual)}
                        </div>
                      )}
                      {result.passed && (
                        <div style={{ color: '#00b8a3' }}>
                          <strong>Output:</strong> {JSON.stringify(result.actual)}
                        </div>
                      )}
                    </>
                  )}
                  {result.index === 0 && result.error && (
                    <div style={{ color: '#ef4743' }}>
                      <strong>Error:</strong> {result.error}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Success Message */}
            {passedCount === totalCount && totalCount > 0 && (
              <div style={{
                padding: '1rem',
                backgroundColor: '#00b8a3',
                color: 'white',
                borderRadius: '6px',
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: '1.1rem'
              }}>
                🎉 All tests passed! Great job!
              </div>
            )}
          </div>
        </div>
      )}

      {/* Instructions */}
      <div style={{
        marginTop: '1rem',
        padding: '1rem',
        backgroundColor: 'var(--ifm-alert-background-color)',
        borderRadius: '4px',
        borderLeft: '4px solid var(--ifm-color-primary)'
      }}>
        <strong>💡 How to use:</strong>
        <ol style={{ marginBottom: 0, marginTop: '0.5rem' }}>
          <li>Read the problem on the <strong>left</strong></li>
          <li>Write your solution in the <strong>Code Editor</strong> on the right (Monaco - same as VS Code!)</li>
          <li>Click <strong>"▶ Run"</strong> in the top-right to test your solution</li>
          <li>See detailed results below - ✅ = Passed, ❌ = Failed</li>
          <li>If tests fail, check the Expected vs Got values</li>
          <li>Click <strong>"💡 Solution"</strong> to see the optimal approach</li>
        </ol>
      </div>
    </div>
  );
}
