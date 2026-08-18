import { Download } from 'lucide-react'

export default function ExportButton({ data, filename, columns }) {
  const handleExport = () => {
    if (!data || data.length === 0) return

    const headers = columns ? columns.map(c => c.header) : Object.keys(data[0])
    const keys = columns ? columns.map(c => c.key) : Object.keys(data[0])

    const csvRows = [
      headers.join(','),
      ...data.map(row => keys.map(k => {
        let val = row[k]
        if (val === null || val === undefined) val = ''
        val = String(val).replace(/"/g, '""')
        return `"${val}"`
      }).join(','))
    ]

    const csvContent = csvRows.join('\n')
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${filename}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <button
      onClick={handleExport}
      className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-brand-600 dark:text-brand-300 bg-brand-50 dark:bg-brand-900/30 hover:bg-brand-100 dark:hover:bg-brand-800/40 rounded-lg transition-colors"
    >
      <Download size={14} />
      <span>Exportar CSV</span>
    </button>
  )
}
