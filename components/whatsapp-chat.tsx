"use client"

import { useState, useRef, useEffect } from "react"
import { Search, X, Calendar as CalendarIcon, ChevronDown, ChevronUp } from "lucide-react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

interface Message {
  date: string
  dateObj: Date
  sender: string
  text: string
}

const parseMessages = (text: string): Message[] => {
  const lines = text.split("\n")
  const messages: Message[] = []

  for (const line of lines) {
    // Parse format: DD/MM/YYYY, HH:MM - Sender: Message
    const match = line.match(/(\d{2}\/\d{2}\/\d{4}), (\d{2}:\d{2})\s*-\s*(.+?):\s*(.+)/)
    if (match) {
      const [, date, time, sender, text] = match
      // Parse date: DD/MM/YYYY
      const [day, month, year] = date.split("/")
      // Parse time: HH:MM
      const [hours, minutes] = time.split(":")
      const dateObj = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hours), parseInt(minutes))
      
      messages.push({
        date: `${date} ${time}`,
        dateObj,
        sender: sender.trim(),
        text: text.trim(),
      })
    }
  }

  return messages
}

interface WhatsAppChatProps {
  onClose?: () => void
}

export default function WhatsAppChat({ onClose }: WhatsAppChatProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)
  const [messages, setMessages] = useState<Message[]>([])
  const [filteredMessages, setFilteredMessages] = useState<Message[]>([])
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [isLoading, setIsLoading] = useState(true)
  const [showDirections, setShowDirections] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  const searchSuggestions = ["radha krishna", "radha", "krishna", "love", "congratulations", "upawas", "hatyaa", "masala"]

  // Date range suggestions based on important/romantic conversations and FIRST TIME moments
  const dateRangeSuggestions = [
    {
      label: "🌟 First Message Ever (2 Jun)",
      startDate: new Date(2025, 5, 2), // June 2, 2025
      endDate: new Date(2025, 5, 2),
      description: "First message in chat - 02/06/2025, 12:57"
    },
    {
      label: "💬 First Real Conversation (7 Jun)",
      startDate: new Date(2025, 5, 7), // June 7, 2025
      endDate: new Date(2025, 5, 7),
      description: "First actual conversation - 07/06/2025, 22:39"
    },
    {
      label: "🤝 First Meeting Plan (4 Jul)",
      startDate: new Date(2025, 6, 4), // July 4, 2025
      endDate: new Date(2025, 6, 4),
      description: "First time planning to meet - 04/07/2025, 14:42 'milte 11 ko'"
    },
    {
      label: "🎉 First Congratulations (6-7 Jul)",
      startDate: new Date(2025, 6, 6), // July 6, 2025
      endDate: new Date(2025, 6, 7),
      description: "First congratulations - 06/07/2025, 23:49 & upawas conversation"
    },
    {
      label: "💕 First 'I Love You' (17 Jul, 18:01)",
      startDate: new Date(2025, 6, 17), // July 17, 2025
      endDate: new Date(2025, 6, 17),
      description: "First 'I love you' message - 17/07/2025, 18:01 'Mydearawantilailoveyourverybestaingingkartehe'"
    },
    {
      label: "📝 First Romantic Poetry (17 Jul, 02:23)",
      startDate: new Date(2025, 6, 17), // July 17, 2025
      endDate: new Date(2025, 6, 17),
      description: "First romantic poetry shared - 17/07/2025, 02:23 'Deep romantic poem about love and connection'"
    },
    {
      label: "💖 First 'I Love You So Much' (19 Jul, 02:35)",
      startDate: new Date(2025, 6, 19), // July 19, 2025
      endDate: new Date(2025, 6, 19),
      description: "First 'I love you so much' - 19/07/2025, 02:35 'Mydearawantilailoveyousomuchthakyouforyourreply'"
    },
    {
      label: "😢 First Trauma Sharing (20 Jul, 02:26-02:48)",
      startDate: new Date(2025, 6, 20), // July 20, 2025
      endDate: new Date(2025, 6, 20),
      description: "First time sharing childhood trauma - 20/07/2025, 02:26-02:48 (Career pressure, childhood struggles, first time crying in front of friends)"
    },
    {
      label: "💔 Deep Trauma & Dil Ki Baat (22 Jul, 01:00-02:00)",
      startDate: new Date(2025, 6, 22), // July 22, 2025
      endDate: new Date(2025, 6, 22),
      description: "Deepest trauma sharing - 22/07/2025, 01:00-02:00 AM (Sharing personal nature, relationship struggles, how caring backfired, understanding each other)"
    },
    {
      label: "🔥 Main Masala (21-25 Jul)",
      startDate: new Date(2025, 6, 21), // July 21, 2025
      endDate: new Date(2025, 6, 25),
      description: "The most important conversations period - playful banter, deep talks, and romantic moments"
    },
    {
      label: "💖 Emotional Deep Talks (19-20 Jul)",
      startDate: new Date(2025, 6, 19), // July 19, 2025
      endDate: new Date(2025, 6, 20),
      description: "Heartfelt conversations, hugs, and emotional support"
    }
  ]

  const handleDateRangeClick = (start: Date, end: Date) => {
    setStartDate(start)
    setEndDate(end)
    setSearchTerm("") // Clear search when selecting date range
  }

  // Load chat data from API
  useEffect(() => {
    const loadChatData = async () => {
      try {
        const response = await fetch('/api/chat')
        const data = await response.json()
        if (data.content) {
          const parsed = parseMessages(data.content)
          setMessages(parsed)
          setFilteredMessages(parsed)
        }
      } catch (error) {
        console.error('Error loading chat data:', error)
      } finally {
        setIsLoading(false)
      }
    }
    loadChatData()
  }, [])

  // Legacy chat data (fallback - can be removed after API works)
  const chatData = `02/06/2025, 12:57 - Messages and calls are end-to-end encrypted. Only people in this chat can read, listen to, or share them. Learn more.
07/06/2025, 22:39 - kaushal Dixit: Avantika ti list send kar na jyat locations ahe
07/06/2025, 22:40 - Singer Mulli: IMG-20250607-WA0016.jpg (file attached)
09/06/2025, 13:43 - Singer Mulli: https://www.booking.com/Share-1RCzHWk
09/06/2025, 13:44 - kaushal Dixit: Which one exactly
09/06/2025, 13:44 - Singer Mulli: IMG-20250609-WA0003.jpg (file attached)
09/06/2025, 13:46 - kaushal Dixit: https://www.booking.com/hotel/in/vip-guest-house-nashik.en-gb.html?label=nasik-ahNGvGcVlQaPTuv9mynx5wSM553333424614%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg%3Afi%3Atikwd-1740666277427%3Alp9300354%3Ali%3Adem%3Adm%3Appccp%3DUmFuZG9tSVYkc2RlIyh9YcpDr58xwogABZVEKmVXkOQ-Share-1RCzHWk%401749456779&sid=13dc7077eddd7a806d242942def7b335&aid=376604&ucfs=1&checkin=2025-07-12&checkout=2025-07-14&group_adults=8&no_rooms=2&group_children=0&srpvid=190c3a07793f00f7&srepoch=1749456962&matching_block_id=1217229101_393883020_4_1_0&atlas_src=hp_iw_title
09/06/2025, 13:47 - kaushal Dixit: Just once he bagh ekds
04/07/2025, 14:35 - kaushal Dixit: Awantika mereko link bhej na
04/07/2025, 14:35 - kaushal Dixit: Apne hotel ki
04/07/2025, 14:35 - kaushal Dixit: Ya flat jo bhi he
04/07/2025, 14:36 - Singer Mulli: Nhi bhejungi
04/07/2025, 14:37 - kaushal Dixit: Dekh le fir
04/07/2025, 14:37 - Singer Mulli: https://www.airbnb.co.in/rooms/1235349190899039976?viralityEntryPoint=1&s=76
04/07/2025, 14:37 - kaushal Dixit: Paani se khatra badhega tera
04/07/2025, 14:37 - Singer Mulli: Bhejjj diyaaa Khusshhhh??
04/07/2025, 14:38 - kaushal Dixit: Haa
04/07/2025, 14:38 - kaushal Dixit: 😂😂
04/07/2025, 14:38 - kaushal Dixit: Mujhe late aya
04/07/2025, 14:39 - Singer Mulli: Bhagwan ka keher
04/07/2025, 14:39 - kaushal Dixit: Tereko ek chij batau ?
04/07/2025, 14:39 - Singer Mulli: Kya
04/07/2025, 14:39 - kaushal Dixit: Ya fir warning ki mat jao
04/07/2025, 14:40 - kaushal Dixit: Tereko teherna sachme nahi ata kya bata to
04/07/2025, 14:40 - Singer Mulli: Mat bolooo … mujhe hatyaa karna acchise aata hai Kar dungi
04/07/2025, 14:40 - Singer Mulli: Nhi aata Kyu
04/07/2025, 14:40 - kaushal Dixit: Fir rehne de
04/07/2025, 14:41 - Singer Mulli: Are kyuu kyaa
04/07/2025, 14:41 - kaushal Dixit: Ha matlab atmahatya ki abhi jarurat nahi lekin
04/07/2025, 14:41 - kaushal Dixit: Are kuch nahi
04/07/2025, 14:41 - Singer Mulli: Nhi kuch to tha
04/07/2025, 14:41 - Singer Mulli: Bol rahe ho ya nhi
04/07/2025, 14:42 - kaushal Dixit: Are ha chalo fir milte 11 ko
04/07/2025, 14:42 - Singer Mulli: Kskeooeirhebdcgsns svhsnsbsv
04/07/2025, 14:43 - kaushal Dixit: Sounds like harry Potter spell
04/07/2025, 14:43 - kaushal Dixit: Wait my chairs flying
04/07/2025, 14:43 - Singer Mulli: Ha vahi hai
04/07/2025, 14:43 - kaushal Dixit: Gotta catch it
04/07/2025, 14:43 - kaushal Dixit: Bbyeee
04/07/2025, 14:43 - Singer Mulli: Bye
06/07/2025, 23:49 - kaushal Dixit: Be congratulations btw 🥳
06/07/2025, 23:49 - Singer Mulli: Kyuu
06/07/2025, 23:51 - kaushal Dixit: Pata chal jayega
06/07/2025, 23:52 - Singer Mulli: Bad manners Kaushal Aise kisiko vichlit nhi karte baalak
06/07/2025, 23:53 - kaushal Dixit: Congratulations se vichalit thodi hote he
06/07/2025, 23:53 - Singer Mulli: Mai hoti hu
06/07/2025, 23:53 - Singer Mulli: Kyu congratulations???
06/07/2025, 23:54 - kaushal Dixit: Nice
06/07/2025, 23:54 - kaushal Dixit: Ho fir thodi aur
06/07/2025, 23:55 - Singer Mulli: Kitna time??
06/07/2025, 23:55 - Singer Mulli: Timmer lagake rakhungi
06/07/2025, 23:55 - kaushal Dixit: 5 min
06/07/2025, 23:55 - kaushal Dixit: Upawas khatam hone de mera
06/07/2025, 23:55 - Singer Mulli: Fine
06/07/2025, 23:55 - kaushal Dixit: Fir khana khake batata
06/07/2025, 23:55 - kaushal Dixit: 😂
06/07/2025, 23:56 - Singer Mulli: Waah
06/07/2025, 23:56 - Singer Mulli: Thik hai thik hai
06/07/2025, 23:56 - kaushal Dixit: Yeah
07/07/2025, 00:02 - Singer Mulli: Ho gaye 5 min
07/07/2025, 00:02 - Singer Mulli: Lo batao
07/07/2025, 00:03 - kaushal Dixit: Haa khake batata
07/07/2025, 00:03 - kaushal Dixit: Ata sutat ahe upawas
07/07/2025, 00:03 - Singer Mulli: Chalo ye bhi thik hai
07/07/2025, 00:11 - kaushal Dixit: Yeahh
07/07/2025, 00:12 - kaushal Dixit: So sutla finally
07/07/2025, 00:13 - Singer Mulli: Finally
07/07/2025, 00:14 - Singer Mulli: Bolo ab kya hai
07/07/2025, 00:14 - Singer Mulli: Aisa kya ukhad liya maine
07/07/2025, 00:15 - kaushal Dixit: Tera nahi tha kya upawas
07/07/2025, 00:15 - Singer Mulli: Thaa n
07/07/2025, 00:15 - Singer Mulli: Usal vala
06/07/2025, 00:36 - kaushal Dixit: Hari Darshan ki pyasi sunna
06/07/2025, 00:36 - kaushal Dixit: YouTube se jo satsang ki clip he
06/07/2025, 00:36 - kaushal Dixit: Already he
06/07/2025, 00:36 - Singer Mulli: Ji avashya Prabhuu🙏
06/07/2025, 00:36 - kaushal Dixit: Tathastu
06/07/2025, 00:37 - Singer Mulli: Accha Aisa hai
06/07/2025, 00:37 - Singer Mulli: Galat line me chale gye aap Kala jaadu chod do
06/07/2025, 00:37 - Singer Mulli: Safed jaadu karo
06/07/2025, 00:38 - kaushal Dixit: Yeah but have you seen nila jaadu ?
06/07/2025, 00:39 - Singer Mulli: Ha dekha hai na Dhoop kha raha tha aaj subah
06/07/2025, 00:39 - kaushal Dixit: Yrr joke hi kharab ho gaya mera
06/07/2025, 00:40 - Singer Mulli: Aleleleele
06/07/2025, 00:40 - Singer Mulli: Mujhse pange nhi
07/07/2025, 01:27 - Singer Mulli: I know Kisi din mere pravachan me bulaungi tumhe
07/07/2025, 01:27 - kaushal Dixit: Aur jo maine suna uske 500 😁
07/07/2025, 01:27 - kaushal Dixit: Haa bs uske pahile concert me bulana
07/07/2025, 01:27 - Singer Mulli: To thik hai 500-500 fittus`


  useEffect(() => {
    let filtered = messages

    // Filter by search term (message text or sender)
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (msg) => msg.text.toLowerCase().includes(term) || msg.sender.toLowerCase().includes(term),
      )
    }

    // Filter by date range
    if (startDate) {
      const start = new Date(startDate)
      start.setHours(0, 0, 0, 0)
      filtered = filtered.filter((msg) => {
        const msgDate = new Date(msg.dateObj)
        msgDate.setHours(0, 0, 0, 0)
        return msgDate >= start
      })
    }

    if (endDate) {
      const end = new Date(endDate)
      end.setHours(23, 59, 59, 999)
      filtered = filtered.filter((msg) => {
        const msgDate = new Date(msg.dateObj)
        return msgDate <= end
      })
    }

    setFilteredMessages(filtered)
    setSelectedIndex(filtered.length > 0 ? 0 : -1)
  }, [searchTerm, startDate, endDate, messages])

  useEffect(() => {
    if (selectedIndex >= 0 && selectedIndex < filteredMessages.length) {
      const selectedMessage = filteredMessages[selectedIndex]
      const messageElements = chatContainerRef.current?.querySelectorAll("[data-message-id]")

      messageElements?.forEach((el) => {
        el.classList.remove("bg-yellow-200")
      })

      const targetElement = chatContainerRef.current?.querySelector(`[data-message-id="${selectedIndex}"]`)
      if (targetElement) {
        targetElement.classList.add("bg-yellow-200")
        targetElement.scrollIntoView({ behavior: "smooth", block: "center" })
      }
    }
  }, [selectedIndex, filteredMessages])


  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && onClose) {
      onClose()
    }
  }

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl w-full max-w-2xl h-[90vh] flex flex-col shadow-2xl" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4 rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full" />
            <div>
              <h3 className="font-bold">Our Deleted Chats</h3>
              <p className="text-xs text-green-100">Always here ✨</p>
            </div>
          </div>
          <button 
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              if (onClose) {
                onClose()
              }
            }}
            className="text-white hover:bg-white/20 p-2 rounded-full transition cursor-pointer"
            aria-label="Close chat"
          >
            <X size={24} />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b space-y-3">
          {/* Search Suggestions */}
          <div className="flex flex-wrap gap-2">
            {searchSuggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => setSearchTerm(suggestion)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                  searchTerm.toLowerCase() === suggestion.toLowerCase()
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {suggestion}
              </button>
            ))}
          </div>
          
          {/* Directions - Collapsible Date Range Suggestions */}
          <div className="border border-gray-200 rounded-lg overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setShowDirections(!showDirections)
              }}
              className="w-full flex items-center justify-between px-4 py-2.5 bg-gradient-to-r from-pink-50 to-purple-50 hover:from-pink-100 hover:to-purple-100 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-700">🗺️ Directions</span>
                <span className="text-xs text-gray-500">({dateRangeSuggestions.length} important moments)</span>
              </div>
              {showDirections ? (
                <ChevronUp size={18} className="text-gray-600" />
              ) : (
                <ChevronDown size={18} className="text-gray-600" />
              )}
            </button>
            
            {showDirections && (
              <div className="p-4 bg-white border-t border-gray-200 max-h-96 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="text-xs font-semibold text-gray-600 mb-3">✨ First Time Moments & Important Dates:</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {dateRangeSuggestions.map((range, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDateRangeClick(range.startDate, range.endDate)
                        setShowDirections(false) // Close after selection
                      }}
                      className={`px-3 py-2.5 rounded-lg text-xs transition-all text-left cursor-pointer ${
                        startDate?.getTime() === range.startDate.getTime() && 
                        endDate?.getTime() === range.endDate.getTime()
                          ? "bg-pink-500 text-white shadow-md ring-2 ring-pink-300"
                          : "bg-pink-50 text-pink-700 hover:bg-pink-100 border border-pink-200 hover:border-pink-300"
                      }`}
                    >
                      <div className="font-semibold mb-1">{range.label}</div>
                      <div className={`text-[10px] leading-tight ${startDate?.getTime() === range.startDate.getTime() && endDate?.getTime() === range.endDate.getTime() ? 'text-pink-50' : 'text-pink-600'}`}>
                        {range.description}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <div className="flex-1 relative flex items-center bg-gray-100 rounded-full px-4">
              <Search size={20} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none px-3 py-2 text-sm"
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm("")} className="text-gray-400 hover:text-gray-600">
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
          
          {/* Date Range Filters */}
          <div className="flex gap-2 items-center flex-wrap">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="flex-1 min-w-[140px] justify-start text-left font-normal bg-gray-100 hover:bg-gray-200 text-sm"
                >
                  <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
                  <span className="truncate">{startDate ? format(startDate, "dd/MM/yyyy") : "Start date"}</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="flex-1 min-w-[140px] justify-start text-left font-normal bg-gray-100 hover:bg-gray-200 text-sm"
                >
                  <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
                  <span className="truncate">{endDate ? format(endDate, "dd/MM/yyyy") : "End date"}</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            
            {(startDate || endDate) && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setStartDate(undefined)
                  setEndDate(undefined)
                }}
                className="text-gray-400 hover:text-gray-600 shrink-0"
              >
                <X size={16} />
              </Button>
            )}
          </div>
        </div>

        {/* Chat Messages */}
        <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-2">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-gray-400">Loading messages...</div>
            </div>
          ) : filteredMessages.length > 0 ? (
            filteredMessages.map((msg, idx) => {
              const isKaushal = msg.sender.includes("kaushal")
              return (
                <div
                  key={idx}
                  data-message-id={idx}
                  className={`flex ${isKaushal ? "justify-end" : "justify-start"} transition-colors duration-300`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      isKaushal
                        ? "bg-green-100 text-gray-900 rounded-br-none"
                        : "bg-white text-gray-900 border border-gray-200 rounded-bl-none"
                    }`}
                  >
                    <p className="text-xs font-semibold text-gray-600 mb-1">{msg.sender}</p>
                    <p className="text-sm break-words">{msg.text}</p>
                    <p className="text-xs text-gray-500 mt-1">{msg.date}</p>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">No messages found</div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Search Navigation */}
        {searchTerm && filteredMessages.length > 0 && (
          <div className="p-3 bg-white border-t flex items-center justify-between">
            <span className="text-sm text-gray-600">
              Result {selectedIndex + 1} of {filteredMessages.length}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedIndex((prev) => (prev === 0 ? filteredMessages.length - 1 : prev - 1))}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-sm rounded transition"
              >
                ← Previous
              </button>
              <button
                onClick={() => setSelectedIndex((prev) => (prev === filteredMessages.length - 1 ? 0 : prev + 1))}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-sm rounded transition"
              >
                Next →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
