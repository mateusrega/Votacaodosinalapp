'use client'

import { useState } from 'react'
import { ArrowLeft, Plus, Edit, Trash2, Clock, Volume2 } from 'lucide-react'
import Link from 'next/link'
import AuthGate from '@/components/AuthGate'

interface Schedule {
  id: string
  time: string
  song: string
  days: string[]
  active: boolean
}

export default function AdminPage() {
  const [schedules, setSchedules] = useState<Schedule[]>([
    {
      id: '1',
      time: '07:30',
      song: 'Hino Nacional',
      days: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'],
      active: true
    },
    {
      id: '2',
      time: '09:30',
      song: 'Sinal de Recreio',
      days: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'],
      active: true
    },
    {
      id: '3',
      time: '12:00',
      song: 'Sinal de Almoço',
      days: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'],
      active: false
    }
  ])

  const [showAddForm, setShowAddForm] = useState(false)

  const toggleSchedule = (id: string) => {
    setSchedules(schedules.map(schedule => 
      schedule.id === id 
        ? { ...schedule, active: !schedule.active }
        : schedule
    ))
  }

  const deleteSchedule = (id: string) => {
    setSchedules(schedules.filter(schedule => schedule.id !== id))
  }

  return (
    <AuthGate>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Link 
            href="/"
            className="mr-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-800">Administração</h1>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Total de Horários</p>
                <p className="text-3xl font-bold text-blue-600">{schedules.length}</p>
              </div>
              <Clock className="w-12 h-12 text-blue-600 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Horários Ativos</p>
                <p className="text-3xl font-bold text-green-600">
                  {schedules.filter(s => s.active).length}
                </p>
              </div>
              <Volume2 className="w-12 h-12 text-green-600 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Horários Inativos</p>
                <p className="text-3xl font-bold text-red-600">
                  {schedules.filter(s => !s.active).length}
                </p>
              </div>
              <Clock className="w-12 h-12 text-red-600 opacity-20" />
            </div>
          </div>
        </div>

        {/* Schedules Management */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Horários Programados</h2>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
            >
              <Plus className="w-5 h-5 mr-2" />
              Adicionar Horário
            </button>
          </div>

          <div className="space-y-4">
            {schedules.map(schedule => (
              <div 
                key={schedule.id}
                className={`border rounded-lg p-4 ${
                  schedule.active ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4">
                      <span className="text-2xl font-bold text-gray-800">
                        {schedule.time}
                      </span>
                      <span className="text-lg text-gray-700">
                        {schedule.song}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        schedule.active 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {schedule.active ? 'Ativo' : 'Inativo'}
                      </span>
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                      Dias: {schedule.days.join(', ')}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => toggleSchedule(schedule.id)}
                      className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                        schedule.active
                          ? 'bg-red-100 text-red-700 hover:bg-red-200'
                          : 'bg-green-100 text-green-700 hover:bg-green-200'
                      }`}
                    >
                      {schedule.active ? 'Desativar' : 'Ativar'}
                    </button>
                    <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => deleteSchedule(schedule.id)}
                      className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Form Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <h3 className="text-xl font-bold mb-4">Adicionar Novo Horário</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Horário
                  </label>
                  <input
                    type="time"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Música
                  </label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Hino Nacional</option>
                    <option>Sinal de Entrada</option>
                    <option>Sinal de Recreio</option>
                    <option>Sinal de Almoço</option>
                  </select>
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Adicionar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AuthGate>
  )
}