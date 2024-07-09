import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function HomeCard({title, Icon, contentTitle, content}) {
  return (
    <Card className="lg:w-[300px] bg-white/95 outline-white/95">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground"/>
      </CardHeader>
      <CardContent>
        <p className="text-2xl text-center font-bold">{contentTitle}</p>
        <p className="text-sm text-center text-muted-foreground">{content}</p>
      </CardContent>
    </Card>
  )
}