'use client'

import { useState, useEffect } from 'react'
import { Bell, Clock, Music, Settings, QrCode } from 'lucide-react'
import Link from 'next/link'
import { getCurrentTime } from '@/lib/time'
import SongCard from '@/components/SongCard'

export default function Home() {
  const [currentTime, setCurrentTime] = useState('')
  const [nextBell, setNextBell] = useState('')

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(getCurrentTime())
      // Calculate next bell time (simplified logic)
      const now = new Date()
      const nextHour = new Date(now)
      nextHour.setHours(now.getHours() + 1, 0, 0, 0)
      setNextBell(nextHour.toLocaleTimeString('pt-BR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }))
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const songs = [
    { id: '1', title: 'Hino Nacional', duration: '2:30', isActive: true },
    { id: '2', title: 'Sinal de Entrada', duration: '0:30', isActive: false },
    { id: '3', title: 'Sinal de Recreio', duration: '0:15', isActive: true },
  ]

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <Bell className="w-12 h-12 text-blue-600 mr-3" />
          <h1 className="text-4xl font-bold text-gray-800">School Bell</h1>
        </div>
        <p className="text-gray-600 text-lg">Sistema de Sinal Escolar Inteligente</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Current Time Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <Clock className="w-8 h-8 text-blue-600 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Horário Atual</h3>
          <p className="text-3xl font-bold text-blue-600">{currentTime}</p>
        </div>

        {/* Next Bell Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <Bell className="w-8 h-8 text-green-600 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Próximo Sinal</h3>
          <p className="text-3xl font-bold text-green-600">{nextBell}</p>
        </div>

        {/* Active Songs Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <Music className="w-8 h-8 text-purple-600 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Músicas Ativas</h3>
          <p className="text-3xl font-bold text-purple-600">
            {songs.filter(song => song.isActive).length}
          </p>
        </div>
      </div>

      {/* Songs Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <Music className="w-6 h-6 mr-2" />
          Músicas Configuradas
        </h2>
        <div className="grid gap-4">
          {songs.map(song => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 justify-center">
        <Link 
          href="/admin"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center transition-colors"
        >
          <Settings className="w-5 h-5 mr-2" />
          Administração
        </Link>
        <Link 
          href="/qr"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center transition-colors"
        >
          <QrCode className="w-5 h-5 mr-2" />
          Gerar QR Code
        </Link>
      </div>
    </main>
  )
}