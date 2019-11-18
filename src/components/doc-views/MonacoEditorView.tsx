/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React, { useState, useRef, ChangeEvent, useCallback } from 'react';
import Editor from '@monaco-editor/react';
import { Store, useStore } from 'react-stores';

const MAX_LENGTH = 3000000;

const LANGUAGES: Record<string, ILanguage> = {
  abap: { name: 'abap', title: 'abap' },
  aes: { name: 'aes', title: 'aes' },
  apex: { name: 'apex', title: 'apex' },
  azcli: { name: 'azcli', title: 'azcli' },
  bat: { name: 'bat', title: 'bat' },
  c: { name: 'c', title: 'c' },
  clojure: { name: 'clojure', title: 'clojure' },
  coffeescript: { name: 'coffeescript', title: 'coffeescript' },
  cpp: { name: 'cpp', title: 'cpp' },
  csharp: { name: 'csharp', title: 'csharp' },
  csp: { name: 'csp', title: 'csp' },
  css: { name: 'css', title: 'css' },
  dockerfile: { name: 'dockerfile', title: 'dockerfile' },
  fsharp: { name: 'fsharp', title: 'fsharp' },
  go: { name: 'go', title: 'go' },
  graphql: { name: 'graphql', title: 'graphql' },
  handlebars: { name: 'handlebars', title: 'handlebars' },
  html: { name: 'html', title: 'html' },
  ini: { name: 'ini', title: 'ini' },
  java: { name: 'java', title: 'java' },
  javascript: { name: 'javascript', title: 'javascript' },
  json: { name: 'json', title: 'json' },
  kotlin: { name: 'kotlin', title: 'kotlin' },
  less: { name: 'less', title: 'less' },
  lua: { name: 'lua', title: 'lua' },
  markdown: { name: 'markdown', title: 'markdown' },
  mips: { name: 'mips', title: 'mips' },
  msdax: { name: 'msdax', title: 'msdax' },
  mysql: { name: 'mysql', title: 'mysql' },
  'objective-c': { name: 'objective-c', title: 'objective-c' },
  pascal: { name: 'pascal', title: 'pascal' },
  pascaligo: { name: 'pascaligo', title: 'pascaligo' },
  perl: { name: 'perl', title: 'perl' },
  pgsql: { name: 'pgsql', title: 'pgsql' },
  php: { name: 'php', title: 'php' },
  plaintext: { name: 'plaintext', title: 'plaintext' },
  postiats: { name: 'postiats', title: 'postiats' },
  powerquery: { name: 'powerquery', title: 'powerquery' },
  powershell: { name: 'powershell', title: 'powershell' },
  pug: { name: 'pug', title: 'pug' },
  python: { name: 'python', title: 'python' },
  r: { name: 'r', title: 'r' },
  razor: { name: 'razor', title: 'razor' },
  redis: { name: 'redis', title: 'redis' },
  redshift: { name: 'redshift', title: 'redshift' },
  ruby: { name: 'ruby', title: 'ruby' },
  rust: { name: 'rust', title: 'rust' },
  sb: { name: 'sb', title: 'sb' },
  scheme: { name: 'scheme', title: 'scheme' },
  scss: { name: 'scss', title: 'scss' },
  shell: { name: 'shell', title: 'shell' },
  sol: { name: 'sol', title: 'sol' },
  sql: { name: 'sql', title: 'sql' },
  st: { name: 'st', title: 'st' },
  swift: { name: 'swift', title: 'swift' },
  tcl: { name: 'tcl', title: 'tcl' },
  twig: { name: 'twig', title: 'twig' },
  typescript: { name: 'typescript', title: 'typescript' },
  vb: { name: 'vb', title: 'vb' },
  xml: { name: 'xml', title: 'xml' },
  yaml: { name: 'yaml', title: 'yaml' },
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
          return <option key={key}>{LANGUAGES[key].title}</option>;
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
