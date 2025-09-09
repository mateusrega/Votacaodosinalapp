interface Song {
  id: string
  title: string
  duration: string
  isActive: boolean
}

interface SongCardProps {
  song: Song
}

export default function SongCard({ song }: SongCardProps) {
  return (
    <div className={`border rounded-lg p-4 transition-all ${
      song.isActive 
        ? 'border-green-200 bg-green-50' 
        : 'border-gray-200 bg-gray-50'
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800">{song.title}</h3>
          <p className="text-sm text-gray-600">Duração: {song.duration}</p>
        </div>
        <div className="flex items-center space-x-3">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            song.isActive 
              ? 'bg-green-100 text-green-800' 
              : 'bg-gray-100 text-gray-600'
          }`}>
            {song.isActive ? 'Ativa' : 'Inativa'}
          </span>
          <div className={`w-3 h-3 rounded-full ${
            song.isActive ? 'bg-green-500' : 'bg-gray-400'
          }`} />
        </div>
      </div>
    </div>
  )
}