import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"

import { FeedHeader } from "@/components/feed-header"

type RootLayoutProps = {
    children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <div className="max-w-3xl w-full mx-auto">
                <FeedHeader />
                <div>
                    {children}
                </div>
            </div>
          </ThemeProvider>
        </body>
      </html>
  )
}
