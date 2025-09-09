'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, Download, Share2, QrCode as QrCodeIcon } from 'lucide-react'
import Link from 'next/link'
import QRCode from 'qrcode'

export default function QRPage() {
  const [qrCodeUrl, setQrCodeUrl] = useState('')
  const [appUrl, setAppUrl] = useState('')

  useEffect(() => {
    // Get current URL
    const currentUrl = window.location.origin
    setAppUrl(currentUrl)
    
    // Generate QR Code
    QRCode.toDataURL(currentUrl, {
      width: 300,
      margin: 2,
      color: {
        dark: '#1f2937',
        light: '#ffffff'
      }
    })
    .then(url => {
      setQrCodeUrl(url)
    })
    .catch(err => {
      console.error('Error generating QR code:', err)
    })
  }, [])

  const downloadQR = () => {
    if (qrCodeUrl) {
      const link = document.createElement('a')
      link.download = 'school-bell-qr.png'
      link.href = qrCodeUrl
      link.click()
    }
  }

  const shareQR = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'School Bell App',
          text: 'Acesse o sistema de sinal escolar',
          url: appUrl
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(appUrl)
      alert('Link copiado para a área de transferência!')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <Link 
          href="/"
          className="mr-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-3xl font-bold text-gray-800">QR Code</h1>
      </div>

      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="mb-6">
            <QrCodeIcon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Acesso Rápido
            </h2>
            <p className="text-gray-600">
              Escaneie o QR Code para acessar o sistema
            </p>
          </div>

          {qrCodeUrl && (
            <div className="mb-6">
              <div className="bg-gray-50 p-4 rounded-lg inline-block">
                <img 
                  src={qrCodeUrl} 
                  alt="QR Code" 
                  className="w-64 h-64 mx-auto"
                />
              </div>
            </div>
          )}

          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-2">URL do Sistema:</p>
            <div className="bg-gray-50 p-3 rounded-lg">
              <code className="text-sm text-gray-800 break-all">
                {appUrl}
              </code>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={downloadQR}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-semibold flex items-center justify-center transition-colors"
            >
              <Download className="w-5 h-5 mr-2" />
              Baixar QR
            </button>
            <button
              onClick={shareQR}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-semibold flex items-center justify-center transition-colors"
            >
              <Share2 className="w-5 h-5 mr-2" />
              Compartilhar
            </button>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-800 mb-2">Como usar:</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Imprima o QR Code e cole em locais visíveis</li>
            <li>• Professores podem escanear para acesso rápido</li>
            <li>• Funciona em qualquer dispositivo com câmera</li>
            <li>• Não requer instalação de aplicativo</li>
          </ul>
        </div>
      </div>
    </div>
  )
}