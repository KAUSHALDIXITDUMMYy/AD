"use client"

export default function Message() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center space-y-8 mb-16">
          <div className="flex justify-center gap-3">
            <span className="text-4xl animate-pulse-heart">💕</span>
            <span className="text-4xl animate-pulse-heart" style={{ animationDelay: "0.3s" }}>
              ✨
            </span>
            <span className="text-4xl animate-pulse-heart" style={{ animationDelay: "0.6s" }}>
              💕
            </span>
          </div>

          <h2
            className="text-4xl md:text-5xl font-bold text-foreground"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            A Message for You
          </h2>
        </div>

        <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 md:p-12 border border-primary/20 shadow-xl mb-12">
          <p className="text-lg md:text-xl text-foreground leading-relaxed mb-6 font-light">
            My love, today is YOUR day, and I want you to know how grateful I am that we found each other. From that
            magical first moment when our eyes met, I knew something special was happening. Every small coincidence,
            every conversation, every laugh—they were all leading us to this moment.
          </p>

          <p className="text-lg md:text-xl text-foreground leading-relaxed mb-6 font-light">
            You make every day feel like an adventure. Your smile lights up my world, and your presence makes everything
            better. I'm honored to be celebrating your first birthday with you, and I'm even more excited about all the
            birthdays and memories we'll create together.
          </p>

          <p className="text-lg md:text-xl text-foreground leading-relaxed font-light">
            Thank you for being you. Thank you for choosing us. Happy Birthday to the most amazing, beautiful, and
            incredible person I know. I love you more than words could ever say.
          </p>
        </div>

        <div className="text-center">
          <p className="text-2xl text-primary font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
            Forever Yours 💕
          </p>
          <p className="text-muted-foreground mt-4 text-lg">December 7, 2025</p>
        </div>
      </div>
    </section>
  )
}
