/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React, { useState, useRef, ChangeEvent, useCallback } from 'react';
import Editor from '@monaco-editor/react';
import { Store, useStore } from 'react-stores';

const MAX_LENGTH = 3000000;

const LANGUAGES: Record<string, ILanguage> = {
  abap: { name: 'abap', title: 'ABAP' },
  aes: { name: 'aes', title: 'AES' },
  apex: { name: 'apex', title: 'Apex' },
  azcli: { name: 'azcli', title: 'Azure CLI' },
  bat: { name: 'bat', title: 'Batch' },
  c: { name: 'c', title: 'C' },
  clojure: { name: 'clojure', title: 'Clojure' },
  coffeescript: { name: 'coffeescript', title: 'CoffeeScript' },
  cpp: { name: 'cpp', title: 'C++' },
  csharp: { name: 'csharp', title: 'C#' },
  csp: { name: 'csp', title: 'CSP' },
  css: { name: 'css', title: 'CSS' },
  dockerfile: { name: 'dockerfile', title: 'Dockerfile' },
  fsharp: { name: 'fsharp', title: 'F#' },
  go: { name: 'go', title: 'Go' },
  graphql: { name: 'graphql', title: 'GraphQL' },
  handlebars: { name: 'handlebars', title: 'Handlebars' },
  html: { name: 'html', title: 'HTML' },
  ini: { name: 'ini', title: 'INI' },
  java: { name: 'java', title: 'Java' },
  javascript: { name: 'javascript', title: 'JavaScript' },
  json: { name: 'json', title: 'JSON' },
  kotlin: { name: 'kotlin', title: 'Kotlin' },
  less: { name: 'less', title: 'LESS' },
  lua: { name: 'lua', title: 'Lua' },
  markdown: { name: 'markdown', title: 'Markdown' },
  mips: { name: 'mips', title: 'MIPS' },
  msdax: { name: 'msdax', title: 'Microsoft Dynamics Ax' },
  mysql: { name: 'mysql', title: 'MySQL' },
  'objective-c': { name: 'objective-c', title: 'Objective-C' },
  pascal: { name: 'pascal', title: 'Pascal' },
  pascaligo: { name: 'pascaligo', title: 'LIGO' },
  perl: { name: 'perl', title: 'Perl' },
  pgsql: { name: 'pgsql', title: 'pgSQL' },
  php: { name: 'php', title: 'PHP' },
  plaintext: { name: 'plaintext', title: 'Plain text' },
  postiats: { name: 'postiats', title: 'ats2-postiats' },
  powerquery: { name: 'powerquery', title: 'Power Query' },
  powershell: { name: 'powershell', title: 'PowerShell' },
  pug: { name: 'pug', title: 'Pug' },
  python: { name: 'python', title: 'Python' },
  r: { name: 'r', title: 'R' },
  razor: { name: 'razor', title: 'Razor' },
  redis: { name: 'redis', title: 'Redis' },
  redshift: { name: 'redshift', title: 'Redhift' },
  ruby: { name: 'ruby', title: 'Ruby' },
  rust: { name: 'rust', title: 'Rust' },
  sb: { name: 'sb', title: 'SB' },
  scheme: { name: 'scheme', title: 'Scheme' },
  scss: { name: 'scss', title: 'SCSS' },
  shell: { name: 'shell', title: 'Shell script' },
  sol: { name: 'sol', title: 'SOL' },
  sql: { name: 'sql', title: 'SQL' },
  st: { name: 'st', title: 'Structured text' },
  swift: { name: 'swift', title: 'Swift' },
  tcl: { name: 'tcl', title: 'Tcl' },
  twig: { name: 'twig', title: 'Twig' },
  typescript: { name: 'typescript', title: 'TypeScript' },
  vb: { name: 'vb', title: 'Visual Basic' },
  xml: { name: 'xml', title: 'XML' },
  yaml: { name: 'yaml', title: 'YAML' },
};

interface ILanguage {
  name: string;
  title: string;
}

interface IStoreState {
  code: string;
  language: ILanguage;
  autosave: boolean;
}

const store = new Store<IStoreState>(
  {
    code: '',
    language: LANGUAGES.typescript,
    autosave: false,
  },
  {
    persistence: true,
    immutable: false,
  },
);

export const MonacoEditorView: React.FC = () => {
  const storeState = useStore(store);
  const [isEditorReady, setIsEditorReady] = useState(false);
  const editorRef = useRef();

  const handleSaveValueFromEditorRef = () => {
    if (editorRef.current) {
      try {
        const code: string = (editorRef.current as any).getValue();

        if (code.length > MAX_LENGTH) {
          alert('MAX_LENGTH exceeded');
          return;
        }

        if (code === storeState.code) {
          return;
        }

        console.log(1, code, 2, storeState.code);

        store.setState({
          code,
        });
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleValueAutosave = useCallback(() => {
    if (storeState.autosave) {
      handleSaveValueFromEditorRef();
    }
  }, [storeState.autosave, handleSaveValueFromEditorRef]);

  const handleToggleAutosave = () => {
    store.setState({
      autosave: !storeState.autosave,
    });
  };

  const handleSelectLanguage = (event: ChangeEvent<HTMLSelectElement>) => {
    const language = LANGUAGES[event.target.value];

    if (language && language.name !== storeState.language.name) {
      store.setState({
        language,
      });
    }
  };

  const handleEditorDidMount = useRef((_: any, editor: any) => {
    setIsEditorReady(true);
    editorRef.current = editor;

    if (editorRef.current) {
      (editorRef.current as any).onDidChangeModelContent(handleValueAutosave);
    }
  });

  return (
    <div>
      <h2>MonacoEditorView</h2>

      <button onClick={handleSaveValueFromEditorRef} disabled={!isEditorReady}>
        Save
      </button>

      <button onClick={handleToggleAutosave} disabled={!isEditorReady}>
        Autosave
      </button>

      {storeState.autosave ? 'autosave on' : 'autosave off'}

      <select disabled={!isEditorReady} value={storeState.language.name} onChange={handleSelectLanguage}>
        {Object.keys(LANGUAGES).map(key => {
          return (
            <option value={LANGUAGES[key].name} key={key}>
              {LANGUAGES[key].title}
            </option>
          );
        })}
      </select>

      <pre>{storeState.code}</pre>

      <Editor
        height='500px'
        language={storeState.language.name}
        value={storeState.code}
        editorDidMount={handleEditorDidMount.current}
      />
    </div>
  );
};
