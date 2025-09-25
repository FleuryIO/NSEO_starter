// src/ArchiveExplorer.jsx
import React, { useState } from 'react'

export default function ArchiveExplorer() {
  const [fileContent, setFileContent] = useState('')
  const [fileName, setFileName] = useState('')

  const handleFile = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setFileName(file.name)

    const lower = file.name.toLowerCase()
    if (lower.endsWith('.md') || lower.endsWith('.sh') || lower.endsWith('.txt')) {
      const text = await file.text()
      setFileContent(text)
    } else if (lower.endsWith('.pdf')) {
      setFileContent('📄 PDF détecté : rendu avancé (pdf.js) à brancher plus tard.')
    } else {
      setFileContent('⚠️ Format non supporté pour le moment.')
    }
  }

  return (
    <div className="p-6 rounded-2xl shadow bg-white dark:bg-gray-800">
      <h2 className="text-2xl font-semibold mb-4">📂 Archive Explorer</h2>
      <input
        type="file"
        accept=".md,.pdf,.sh,.txt"
        onChange={handleFile}
        className="mb-4"
      />

      {fileName && (
        <div className="mt-4 text-left">
          <h3 className="font-bold mb-2">📌 {fileName}</h3>
          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-auto text-sm max-h-96 whitespace-pre-wrap">
            {fileContent}
          </pre>
        </div>
      )}
    </div>
  )
}