import React from "react";
import { Highlight, themes } from "prism-react-renderer";
import "../../styles/components/CodeDisplay.css";

const CodeDisplay = ({ code, language }) => {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="code-display">
      <div className="code-header">
        <span className="code-language">{language}</span>
        <button
          onClick={copyToClipboard}
          className="copy-btn"
          title="Copy to clipboard"
        >
          {copied ? "✅ Copied!" : "📋 Copy"}
        </button>
      </div>
      <Highlight
        theme={themes.dracula}
        code={code}
        language={language}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={`code-content ${className}`} style={style}>
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
};

export default CodeDisplay;
