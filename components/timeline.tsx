"use client"

export default function Timeline() {
  const events = [
    {
      date: "July 25, 2025",
      title: "That Random Moment",
      description: "We saw each other and felt that spark. That was the beginning of forever.",
      emoji: "✨",
    },
    {
      date: "August 2025",
      title: "Small Coincidences",
      description: "Every little moment brought us closer. We knew it was destiny.",
      emoji: "🌟",
    },
    {
      date: "September 2025",
      title: "Growing Closer",
      description: "More memories, more laughter, more reasons to believe in us.",
      emoji: "💑",
    },
    {
      date: "October 2025",
      title: "Deeper Connection",
      description: "You became my person. My best friend. My everything.",
      emoji: "💕",
    },
    {
      date: "November 2025",
      title: "Counting Days",
      description: "Waiting for this special day to celebrate you and our love.",
      emoji: "⏳",
    },
    {
      date: "December 7, 2025",
      title: "Your Birthday",
      description: "The first of many birthdays I'll celebrate with you by my side.",
      emoji: "🎉",
    },
  ]

  return (
    <section className="py-20 px-4 bg-white/30">
      <div className="max-w-4xl mx-auto">
        <h2
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-foreground"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Our Journey
        </h2>

        <div className="relative">
          {/* Center line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary to-secondary"></div>

          <div className="space-y-8 md:space-y-12">
            {events.map((event, index) => (
              <div
                key={index}
                className={`flex gap-6 md:gap-0 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                {/* Content */}
                <div className="flex-1 md:px-8">
                  <div className="bg-card rounded-xl p-6 border border-primary/10 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">{event.emoji}</span>
                      <time className="text-sm font-semibold text-primary">{event.date}</time>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{event.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{event.description}</p>
                  </div>
                </div>

                {/* Timeline dot */}
                <div className="hidden md:flex justify-center flex-col items-center relative z-10">
                  <div className="w-4 h-4 bg-primary rounded-full ring-4 ring-background"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Thank You Message */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8 md:p-12 border-2 border-yellow-200 shadow-lg">
            <div className="flex justify-center gap-4 mb-4">
              <span className="text-4xl">🕉️</span>
              <span className="text-4xl">🙏</span>
            </div>
            <p className="text-lg md:text-xl text-foreground leading-relaxed font-medium mb-2">
              Thank you to <span className="text-primary font-bold">Krishna</span> and <span className="text-primary font-bold">Radha Rani</span>
            </p>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              for bringing us together and making us close. Your divine blessings have guided our journey. 🙏✨
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
