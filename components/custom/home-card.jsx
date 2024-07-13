import { ChevronRight } from "@mui/icons-material"
import { Card, CardActionArea, CardContent, CardHeader, Typography } from "@mui/material"

export function HomeCard({ title, Icon, route, contentTitle, content }) {
  return (
    <Card sx={{ borderRadius: 4, minWidth: {xs: "85%", md: "25%"}, "& .MuiCardHeader-action": { marginTop: 0 } }}>
      <CardActionArea href={route}>
        <CardHeader sx={{ bgcolor: "hsl(var(--primary))" }} avatar={<Icon />} action={<ChevronRight />} title={title} titleTypographyProps={{ fontWeight: "500" }} />
      </CardActionArea>
      <CardContent>
        <Typography variant="h6" sx={{ textAlign: "center" }}>{contentTitle}</Typography>
        <Typography variant="body2" sx={{ textAlign: "center" }}>{content}</Typography>
      </CardContent>
    </Card>
  )
}