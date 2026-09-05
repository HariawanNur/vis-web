export function downloadFile(
  filename: string,
  content: string,
  mimeType = "text/plain;charset=utf-8",
) {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)

  const link = document.createElement("a")
  link.setAttribute("href", url)
  link.setAttribute("download", filename)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export function downloadText(filename: string, content: string) {
  downloadFile(filename, content, "text/plain;charset=utf-8")
}

export function exportToCSV(
  data: Record<string, any>[],
  filename: string,
  messages?: { noData?: string },
) {
  if (!data || data.length === 0) {
    alert(messages?.noData ?? "Tidak ada data untuk diexport.")
    return
  }

  const headers = Object.keys(data[0])
  const csvRows: string[] = []

  csvRows.push(headers.join(","))

  for (const row of data) {
    const values = headers.map((header) => {
      const val = row[header] ?? ""
      const escaped = ("" + val).replace(/"/g, '""')
      return `"${escaped}"`
    })
    csvRows.push(values.join(","))
  }

  const csvString = csvRows.join("\n")
  const datedFilename = `${filename}_${new Date().toISOString().slice(0, 10)}.csv`

  downloadFile(datedFilename, "\ufeff" + csvString, "text/csv;charset=utf-8")
}

export function printElement(
  elementId: string,
  messages?: { popupBlocked?: string; pdfTitle?: string },
) {
  const content = document.getElementById(elementId)
  if (!content) return

  const printWindow = window.open("", "_blank")
  if (!printWindow) {
    alert(messages?.popupBlocked ?? "Pop-up diblokir browser. Harap izinkan pop-up untuk mencetak PDF.")
    return
  }

  const html = `<!DOCTYPE html>
    <html>
      <head>
        <title>${messages?.pdfTitle ?? "Cetak Dokumen ERP Konstruksi"}</title>
        <style>
          @page { size: A4; margin: 15mm; }
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #1e293b; padding: 2rem; background: #fff; }
          @media print {
            .no-print { display: none !important; }
          }
        </style>
      </head>
      <body onload="window.print(); window.close();">
        ${content.innerHTML}
      </body>
    </html>`

  printWindow.document.documentElement.innerHTML = ""
  const docEl = printWindow.document.documentElement
  docEl.innerHTML = html
  printWindow.document.close()
}
