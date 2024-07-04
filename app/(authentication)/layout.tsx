import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"

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
                <div className="flex justify-center md:items-center min-h-screen">
                    {children}
                </div>
            </div>
          </ThemeProvider>
        </body>
      </html>
  )
}
