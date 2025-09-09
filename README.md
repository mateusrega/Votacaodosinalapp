# School Bell App 🔔

Sistema inteligente de sinal escolar desenvolvido com Next.js e Firebase.

## Características

- ⏰ **Horários Programáveis**: Configure horários específicos para diferentes sinais
- 🎵 **Múltiplas Músicas**: Suporte a diferentes áudios para cada ocasião
- 📱 **Interface Responsiva**: Funciona perfeitamente em dispositivos móveis e desktop
- 🔐 **Área Administrativa**: Painel protegido por senha para configurações
- 📊 **Dashboard em Tempo Real**: Visualize horário atual e próximo sinal
- 📱 **QR Code**: Gere códigos QR para acesso rápido ao sistema
- 🔥 **Firebase Integration**: Banco de dados em tempo real e armazenamento de arquivos

## Tecnologias Utilizadas

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária
- **Firebase** - Backend as a Service
  - Firestore - Banco de dados NoSQL
  - Storage - Armazenamento de arquivos de áudio
  - Authentication - Sistema de autenticação
- **Lucide React** - Ícones modernos
- **QRCode** - Geração de códigos QR

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/school-bell-app.git
cd school-bell-app
```

2. Instale as dependências:
```bash
npm install
```

3. Configure o Firebase:
   - Crie um projeto no [Firebase Console](https://console.firebase.google.com/)
   - Ative Firestore Database, Storage e Authentication
   - Copie as configurações do projeto

4. Configure as variáveis de ambiente:
```bash
cp .env.local.example .env.local
```
Edite o arquivo `.env.local` com suas configurações do Firebase.

5. Execute o projeto:
```bash
npm run dev
```

## Estrutura do Projeto

```
school-bell-app/
├── app/                    # App Router do Next.js
│   ├── admin/             # Área administrativa
│   ├── qr/                # Geração de QR Code
│   ├── globals.css        # Estilos globais
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página inicial
├── components/            # Componentes reutilizáveis
│   ├── AuthGate.tsx       # Proteção de rotas
│   └── SongCard.tsx       # Card de música
├── lib/                   # Utilitários e configurações
│   ├── firebase.client.ts # Configuração do Firebase
│   └── time.ts            # Funções de tempo
└── public/                # Arquivos estáticos
    └── logo.svg           # Logo da aplicação
```

## Funcionalidades

### 🏠 Dashboard Principal
- Visualização do horário atual em tempo real
- Próximo sinal programado
- Lista de músicas ativas
- Acesso rápido às funcionalidades

### ⚙️ Área Administrativa
- Gerenciamento de horários programados
- Ativação/desativação de sinais
- Estatísticas do sistema
- Interface protegida por senha

### 📱 Gerador de QR Code
- Gera QR Code para acesso rápido
- Download da imagem do QR Code
- Compartilhamento via Web Share API
- Instruções de uso

## Configuração do Firebase

Consulte o arquivo `firebase-setup-notes.txt` para instruções detalhadas de configuração do Firebase.

### Estrutura do Banco de Dados

**Coleção: schedules**
```javascript
{
  time: "07:30",           // Horário no formato HH:MM
  songId: "song_id",       // ID da música
  days: ["Segunda", "Terça"], // Dias da semana
  active: true,            // Status ativo/inativo
  createdAt: timestamp     // Data de criação
}
```

**Coleção: songs**
```javascript
{
  title: "Hino Nacional",  // Nome da música
  duration: "2:30",        // Duração
  audioUrl: "url_do_audio", // URL do arquivo de áudio
  active: true,            // Status ativo/inativo
  createdAt: timestamp     // Data de criação
}
```

## Segurança

- Regras de segurança do Firestore configuradas
- Autenticação necessária para operações de escrita
- Área administrativa protegida por senha
- Variáveis de ambiente para dados sensíveis

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## Suporte

Para suporte, abra uma issue no GitHub ou entre em contato através do email: suporte@schoolbell.com

---

Desenvolvido com ❤️ para facilitar a gestão de sinais escolares.